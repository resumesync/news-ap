import { supabase } from "@/integrations/supabase/client";
import { getDeviceId } from "./device";

export type NewsStatus = "draft" | "published" | "unpublished";

export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  content: string;
  image_url: string | null;
  video_url: string | null;
  published_date: string;
  published_time: string;
  status: NewsStatus;
  views: number;
  likes: number;
  shares: number;
  created_at: string;
  updated_at: string;
};

export type AdPosition = "top" | "between_news" | "news_content" | "bottom" | "sticky_bottom";

export type Advertisement = {
  id: string;
  title: string;
  image_url: string | null;
  target_url: string | null;
  position: AdPosition;
  frequency: number;
  start_date: string | null;
  end_date: string | null;
  status: "active" | "disabled";
  impressions: number;
  clicks: number;
  created_at: string;
  updated_at: string;
};

export type SiteSettings = {
  id: boolean;
  site_name: string;
  logo_url: string | null;
  favicon_url: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_address: string | null;
  facebook_url: string | null;
  x_url: string | null;
  instagram_url: string | null;
  whatsapp_url: string | null;
  ads_enabled: boolean;
  default_ad_frequency: number;
};

export const PAGE_SIZE = 6;

export const AD_POSITION_LABELS: Record<AdPosition, string> = {
  top: "Top of feed",
  between_news: "Between news",
  news_content: "Inside article",
  bottom: "Bottom of feed",
  sticky_bottom: "Sticky bottom bar",
};

/* ---------------------------------- reads --------------------------------- */

export const settingsQuery = {
  queryKey: ["site-settings"],
  queryFn: async (): Promise<SiteSettings | null> => {
    const { data, error } = await supabase.from("site_settings").select("*").maybeSingle();
    if (error) throw error;
    return (data as SiteSettings) ?? null;
  },
  staleTime: 60_000,
};

export const activeAdsQuery = {
  queryKey: ["ads", "active"],
  queryFn: async (): Promise<Advertisement[]> => {
    const { data, error } = await supabase
      .from("advertisements")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Advertisement[];
  },
  staleTime: 60_000,
};

export async function fetchFeedPage(page: number): Promise<NewsItem[]> {
  const from = page * PAGE_SIZE;
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("status", "published")
    .order("published_date", { ascending: false })
    .order("published_time", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);
  if (error) throw error;
  return (data ?? []) as NewsItem[];
}

export async function fetchArticleBySlug(slug: string): Promise<NewsItem | null> {
  const { data, error } = await supabase.from("news").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data as NewsItem) ?? null;
}

/* ------------------------------ interactions ------------------------------ */

export async function recordView(newsId: string) {
  const device_id = getDeviceId();
  const { error } = await supabase.from("news_views").insert({ news_id: newsId, device_id });
  // 23505 = already counted for this device; that is the intended behaviour.
  if (error && error.code !== "23505") throw error;
}

export async function hasLiked(newsId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("news_likes")
    .select("id")
    .eq("news_id", newsId)
    .eq("device_id", getDeviceId())
    .maybeSingle();
  if (error) throw error;
  return Boolean(data);
}

export async function toggleLike(newsId: string, liked: boolean): Promise<boolean> {
  const device_id = getDeviceId();
  if (liked) {
    const { error } = await supabase
      .from("news_likes")
      .delete()
      .eq("news_id", newsId)
      .eq("device_id", device_id);
    if (error) throw error;
    return false;
  }
  const { error } = await supabase.from("news_likes").insert({ news_id: newsId, device_id });
  if (error && error.code !== "23505") throw error;
  return true;
}

export async function recordShare(newsId: string, channel: string) {
  const { error } = await supabase
    .from("news_shares")
    .insert({ news_id: newsId, device_id: getDeviceId(), channel });
  if (error) throw error;
}

export async function recordAdEvent(adId: string, eventType: "impression" | "click") {
  const { error } = await supabase
    .from("ad_events")
    .insert({ ad_id: adId, device_id: getDeviceId(), event_type: eventType });
  if (error) throw error;
}

/* ------------------------- ad placement computation ------------------------ */

export type FeedEntry =
  | { kind: "news"; item: NewsItem }
  | { kind: "ad"; ad: Advertisement; key: string };

/**
 * Interleaves "between news" advertisements into the feed. The gap before each
 * ad comes from that ad's own frequency, falling back to the admin's default
 * "Show advertisement after N news" setting.
 */
export function buildFeed(
  items: NewsItem[],
  ads: Advertisement[],
  defaultFrequency: number,
  adsEnabled: boolean,
): FeedEntry[] {
  const entries: FeedEntry[] = [];
  const betweenAds = ads.filter((a) => a.position === "between_news");
  if (!adsEnabled || betweenAds.length === 0) {
    return items.map((item) => ({ kind: "news", item }));
  }

  let adIndex = 0;
  let sinceLastAd = 0;
  let gap = betweenAds[0].frequency || defaultFrequency || 4;

  items.forEach((item, i) => {
    entries.push({ kind: "news", item });
    sinceLastAd += 1;
    const isLast = i === items.length - 1;
    if (sinceLastAd >= gap && !isLast) {
      const ad = betweenAds[adIndex % betweenAds.length];
      entries.push({ kind: "ad", ad, key: `${ad.id}-${i}` });
      adIndex += 1;
      sinceLastAd = 0;
      const next = betweenAds[adIndex % betweenAds.length];
      gap = next.frequency || defaultFrequency || 4;
    }
  });

  return entries;
}

export function youTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return `https://www.youtube.com/embed${u.pathname}`;
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
      if (u.pathname.startsWith("/embed/")) return url;
      if (u.pathname.startsWith("/shorts/"))
        return `https://www.youtube.com/embed/${u.pathname.split("/")[2]}`;
    }
    if (u.hostname.includes("vimeo.com"))
      return `https://player.vimeo.com/video/${u.pathname.split("/").filter(Boolean)[0]}`;
    return null;
  } catch {
    return null;
  }
}
