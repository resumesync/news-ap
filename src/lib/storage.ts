import { INITIAL_NEWS } from "@/data/mock-news";
import { INITIAL_ADS } from "@/data/mock-ads";
import { INITIAL_SETTINGS } from "@/data/mock-settings";
import type { NewsItem, Advertisement, SiteSettings, AdPosition, FeedEntry } from "@/data/types";
import { slugify } from "./format";

const NEWS_KEY = "eight_news_articles";
const ADS_KEY = "eight_news_advertisements";
const SETTINGS_KEY = "eight_news_settings";
const LIKES_KEY = "eight_news_user_likes";
const ADMIN_KEY = "eight_news_admin_auth";
const IMPRESSIONS_KEY = "eight_news_ad_impressions_session";

function isClient(): boolean {
  return typeof window !== "undefined";
}

function notifyDataChange() {
  if (isClient()) {
    window.dispatchEvent(new Event("eight_news_data_changed"));
  }
}

/* --------------------------------- News API -------------------------------- */

export function getStoredNews(): NewsItem[] {
  if (!isClient()) return INITIAL_NEWS;
  try {
    const raw = localStorage.getItem(NEWS_KEY);
    if (!raw) {
      localStorage.setItem(NEWS_KEY, JSON.stringify(INITIAL_NEWS));
      return INITIAL_NEWS;
    }
    const parsed = JSON.parse(raw);
    // If stored data is from old English version without titleTe, refresh with new Telugu news
    if (!Array.isArray(parsed) || parsed.length === 0 || !parsed[0]?.titleTe) {
      localStorage.setItem(NEWS_KEY, JSON.stringify(INITIAL_NEWS));
      return INITIAL_NEWS;
    }
    return parsed;
  } catch {
    return INITIAL_NEWS;
  }
}

export function saveStoredNews(news: NewsItem[]) {
  if (!isClient()) return;
  localStorage.setItem(NEWS_KEY, JSON.stringify(news));
  notifyDataChange();
}

export function getPublishedNews(): NewsItem[] {
  return getStoredNews()
    .filter((item) => item.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt || `${b.publishedDate}T${b.publishedTime}`).getTime() -
        new Date(a.publishedAt || `${a.publishedDate}T${a.publishedTime}`).getTime(),
    );
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  const news = getStoredNews();
  const decoded = decodeURIComponent(slug);
  return news.find(
    (item) =>
      item.slug === slug ||
      item.slug === decoded ||
      (item.title && slugify(item.title) === slug) ||
      (item.titleTe && slugify(item.titleTe) === slug),
  );
}

export function getNewsById(id: string): NewsItem | undefined {
  return getStoredNews().find((item) => item.id === id);
}

export function createNews(data: Omit<NewsItem, "id" | "views" | "likes" | "shares" | "publishedAt">): NewsItem {
  const all = getStoredNews();
  const id = `news-${Date.now()}`;
  const baseTitle = data.titleTe || data.title || "వార్త";
  const slug = data.slug ? slugify(data.slug) : slugify(baseTitle) || `story-${Date.now()}`;
  const publishedAt = new Date(`${data.publishedDate}T${data.publishedTime || "00:00:00"}`).toISOString();

  const newItem: NewsItem = {
    ...data,
    id,
    slug,
    titleTe: data.titleTe || data.title || "",
    shortSummaryTe: data.shortSummaryTe || data.shortDescription || "",
    fullContentTe: data.fullContentTe || data.content || data.shortSummaryTe || "",
    publishedAt,
    views: 0,
    likes: 0,
    shares: 0,
  };

  const updated = [newItem, ...all];
  saveStoredNews(updated);
  return newItem;
}

export function updateNews(id: string, updates: Partial<NewsItem>): NewsItem | null {
  const all = getStoredNews();
  const index = all.findIndex((item) => item.id === id);
  if (index === -1) return null;

  if ((updates.titleTe || updates.title) && !updates.slug) {
    updates.slug = slugify(updates.titleTe || updates.title || "") || all[index].slug;
  }
  if (updates.publishedDate || updates.publishedTime) {
    const d = updates.publishedDate ?? all[index].publishedDate;
    const t = updates.publishedTime ?? all[index].publishedTime;
    updates.publishedAt = new Date(`${d}T${t || "00:00:00"}`).toISOString();
  }

  const updatedItem = { ...all[index], ...updates };
  all[index] = updatedItem;
  saveStoredNews(all);
  return updatedItem;
}

export function deleteNews(id: string): boolean {
  const all = getStoredNews();
  const filtered = all.filter((item) => item.id !== id);
  if (filtered.length === all.length) return false;
  saveStoredNews(filtered);
  return true;
}

export function togglePublishNews(id: string): NewsItem | null {
  const all = getStoredNews();
  const item = all.find((i) => i.id === id);
  if (!item) return null;
  const nextStatus = item.status === "published" ? "unpublished" : "published";
  return updateNews(id, { status: nextStatus });
}

/* ------------------------------- Views & Likes ------------------------------ */

export function incrementViews(id: string): number {
  if (!isClient()) return 0;
  // Use session storage so page refreshes in the same session don't hyper-inflate view count repeatedly
  const viewKey = `viewed_${id}`;
  const alreadyViewed = sessionStorage.getItem(viewKey);
  const all = getStoredNews();
  const item = all.find((i) => i.id === id);
  if (!item) return 0;

  if (!alreadyViewed) {
    sessionStorage.setItem(viewKey, "1");
    item.views += 1;
    saveStoredNews(all);
  }
  return item.views;
}

export function getUserLikes(): Record<string, boolean> {
  if (!isClient()) return {};
  try {
    const raw = localStorage.getItem(LIKES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function isLikedByUser(id: string): boolean {
  const likes = getUserLikes();
  return Boolean(likes[id]);
}

export function toggleUserLike(id: string): { liked: boolean; count: number } {
  if (!isClient()) return { liked: false, count: 0 };
  const all = getStoredNews();
  const item = all.find((i) => i.id === id);
  if (!item) return { liked: false, count: 0 };

  const likes = getUserLikes();
  const currentlyLiked = Boolean(likes[id]);
  const nextLiked = !currentlyLiked;

  if (nextLiked) {
    likes[id] = true;
    item.likes += 1;
  } else {
    delete likes[id];
    item.likes = Math.max(0, item.likes - 1);
  }

  localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
  saveStoredNews(all);
  return { liked: nextLiked, count: item.likes };
}

export function recordNewsShare(id: string, channel: string): number {
  if (!isClient()) return 0;
  const all = getStoredNews();
  const item = all.find((i) => i.id === id);
  if (!item) return 0;

  item.shares += 1;
  saveStoredNews(all);

  // Store channel analytics
  try {
    const channelKey = "eight_news_shares_by_channel";
    const raw = localStorage.getItem(channelKey);
    const counts = raw ? JSON.parse(raw) : { whatsapp: 0, facebook: 0, x: 0, copy: 0, native: 0 };
    counts[channel] = (counts[channel] || 0) + 1;
    localStorage.setItem(channelKey, JSON.stringify(counts));
  } catch {
    // Ignore
  }

  return item.shares;
}

export function getShareStats(): Record<string, number> {
  if (!isClient()) return { whatsapp: 240, x: 180, facebook: 120, copy: 310, native: 95 };
  try {
    const raw = localStorage.getItem("eight_news_shares_by_channel");
    return raw ? JSON.parse(raw) : { whatsapp: 240, x: 180, facebook: 120, copy: 310, native: 95 };
  } catch {
    return { whatsapp: 240, x: 180, facebook: 120, copy: 310, native: 95 };
  }
}

/* ------------------------------- Ads API ----------------------------------- */

export function getStoredAds(): Advertisement[] {
  if (!isClient()) return INITIAL_ADS;
  try {
    const raw = localStorage.getItem(ADS_KEY);
    if (!raw) {
      localStorage.setItem(ADS_KEY, JSON.stringify(INITIAL_ADS));
      return INITIAL_ADS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0 || !parsed[0]?.titleTe) {
      localStorage.setItem(ADS_KEY, JSON.stringify(INITIAL_ADS));
      return INITIAL_ADS;
    }
    return parsed;
  } catch {
    return INITIAL_ADS;
  }
}

export function saveStoredAds(ads: Advertisement[]) {
  if (!isClient()) return;
  localStorage.setItem(ADS_KEY, JSON.stringify(ads));
  notifyDataChange();
}

export function getActiveAds(position?: AdPosition): Advertisement[] {
  const ads = getStoredAds().filter((ad) => ad.status === "active");
  if (position) {
    return ads.filter((ad) => ad.position === position);
  }
  return ads;
}

export function getAdById(id: string): Advertisement | undefined {
  return getStoredAds().find((ad) => ad.id === id);
}

export function createAd(data: Omit<Advertisement, "id" | "impressions" | "clicks">): Advertisement {
  const all = getStoredAds();
  const id = `ad-${Date.now()}`;
  const newAd: Advertisement = {
    ...data,
    id,
    impressions: 0,
    clicks: 0,
  };
  const updated = [...all, newAd];
  saveStoredAds(updated);
  return newAd;
}

export function updateAd(id: string, updates: Partial<Advertisement>): Advertisement | null {
  const all = getStoredAds();
  const index = all.findIndex((ad) => ad.id === id);
  if (index === -1) return null;
  const updatedAd = { ...all[index], ...updates };
  all[index] = updatedAd;
  saveStoredAds(all);
  return updatedAd;
}

export function deleteAd(id: string): boolean {
  const all = getStoredAds();
  const filtered = all.filter((ad) => ad.id !== id);
  if (filtered.length === all.length) return false;
  saveStoredAds(filtered);
  return true;
}

export function toggleAdStatus(id: string): Advertisement | null {
  const all = getStoredAds();
  const ad = all.find((a) => a.id === id);
  if (!ad) return null;
  const nextStatus = ad.status === "active" ? "disabled" : "active";
  return updateAd(id, { status: nextStatus });
}

export function recordAdImpression(adId: string) {
  if (!isClient()) return;
  try {
    const sessionKey = `${IMPRESSIONS_KEY}_${adId}`;
    if (sessionStorage.getItem(sessionKey)) return;
    sessionStorage.setItem(sessionKey, "1");

    const all = getStoredAds();
    const ad = all.find((a) => a.id === adId);
    if (ad) {
      ad.impressions += 1;
      saveStoredAds(all);
    }
  } catch {
    // Ignore
  }
}

export function recordAdClick(adId: string) {
  if (!isClient()) return;
  const all = getStoredAds();
  const ad = all.find((a) => a.id === adId);
  if (ad) {
    ad.clicks += 1;
    saveStoredAds(all);
  }
}

/* ----------------------------- Site Settings ------------------------------ */

export function getStoredSettings(): SiteSettings {
  if (!isClient()) return INITIAL_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(INITIAL_SETTINGS));
      return INITIAL_SETTINGS;
    }
    return { ...INITIAL_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return INITIAL_SETTINGS;
  }
}

export function updateStoredSettings(updates: Partial<SiteSettings>): SiteSettings {
  if (!isClient()) return INITIAL_SETTINGS;
  const current = getStoredSettings();
  const updated = { ...current, ...updates };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  notifyDataChange();
  return updated;
}

/* -------------------------- Feed Interleaving Logic ------------------------ */

/**
 * EXACT USER REQUIREMENT:
 * Admin controls "Show advertisement after X news"
 * Options: 2, 3, 4, 5, 10, Custom
 *
 * Example:
 * If frequency = 4:
 * News 1, 2, 3, 4
 * ADVERTISEMENT
 * News 5, 6, 7, 8
 * ADVERTISEMENT
 * ...
 */
export function buildFeedWithAds(
  items: NewsItem[],
  ads: Advertisement[],
  frequency: number,
  adsEnabled: boolean,
): FeedEntry[] {
  const entries: FeedEntry[] = [];
  const betweenAds = ads.filter((a) => a.position === "BETWEEN_NEWS" && a.status === "active");

  if (!adsEnabled || betweenAds.length === 0 || frequency <= 0) {
    return items.map((item) => ({ kind: "news", item }));
  }

  let adCursor = 0;
  let itemsSinceLastAd = 0;

  items.forEach((item, index) => {
    entries.push({ kind: "news", item });
    itemsSinceLastAd += 1;

    const isLast = index === items.length - 1;
    if (itemsSinceLastAd >= frequency && !isLast) {
      const selectedAd = betweenAds[adCursor % betweenAds.length];
      entries.push({
        kind: "ad",
        ad: selectedAd,
        key: `interleaved-ad-${selectedAd.id}-${index}`,
      });
      adCursor += 1;
      itemsSinceLastAd = 0;
    }
  });

  return entries;
}

/* --------------------------- Mock Admin Auth ------------------------------- */

export function isAdminAuthenticated(): boolean {
  if (!isClient()) return false;
  return localStorage.getItem(ADMIN_KEY) === "true";
}

export function setAdminAuthenticated(auth: boolean) {
  if (!isClient()) return;
  if (auth) {
    localStorage.setItem(ADMIN_KEY, "true");
  } else {
    localStorage.removeItem(ADMIN_KEY);
  }
  notifyDataChange();
}

/* -------------------------- Video Helpers --------------------------------- */

export function getYouTubeEmbedUrl(url?: string | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
      if (u.pathname.startsWith("/embed/")) return url;
      if (u.pathname.startsWith("/shorts/")) {
        return `https://www.youtube.com/embed/${u.pathname.split("/")[2]}`;
      }
    }
    if (u.hostname.includes("vimeo.com")) {
      const parts = u.pathname.split("/").filter(Boolean);
      return `https://player.vimeo.com/video/${parts[0]}`;
    }
    return null;
  } catch {
    return null;
  }
}
