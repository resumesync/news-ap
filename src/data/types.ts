export type NewsStatus = "published" | "unpublished" | "draft";

export interface NewsItem {
  id: string;
  slug: string;
  // Telugu primary fields
  titleTe: string;
  shortSummaryTe: string;
  fullContentTe: string;
  // Backward compatibility / optional English
  title?: string;
  shortDescription?: string;
  content?: string;

  image: string;
  imageCaption?: string;
  videoUrl?: string | null;
  publishedAt: string;
  publishedDate: string;
  publishedTime: string;
  views: number;
  likes: number;
  shares: number;
  status: NewsStatus;
  author?: string;
  readTime?: string;
}

export type AdPosition =
  | "TOP"
  | "BETWEEN_NEWS"
  | "ARTICLE_MIDDLE"
  | "BOTTOM"
  | "STICKY_BOTTOM"
  | "NEWS_BANNER";

export interface Advertisement {
  id: string;
  title: string;
  titleTe?: string;
  image: string;
  targetUrl: string;
  position: AdPosition;
  frequency: number;
  startDate: string;
  endDate: string;
  status: "active" | "disabled";
  impressions: number;
  clicks: number;
  sponsorName?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  taglineTe?: string;
  logoUrl?: string;
  faviconUrl?: string;
  defaultAdFrequency: number;
  adsEnabled: boolean;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  facebookUrl: string;
  xUrl: string;
  instagramUrl: string;
  whatsappUrl: string;
  theme: "ivory" | "white" | "dark";
}

export type FeedEntry =
  | { kind: "news"; item: NewsItem }
  | { kind: "ad"; ad: Advertisement; key: string };
