import { useMemo } from "react";
import type { NewsItem, Advertisement } from "@/data/types";
import { NewsCard } from "./news-card";
import { AdvertisementBanner } from "./advertisement-banner";
import { isLikedByUser, toggleUserLike, recordNewsShare } from "@/lib/storage";

interface NewsFeedProps {
  news: NewsItem[];
  ads: Advertisement[];
  frequency: number;
  adsEnabled: boolean;
  onRefresh?: () => void;
}

export function NewsFeed({
  news,
  ads,
  frequency = 4,
  adsEnabled = true,
  onRefresh,
}: NewsFeedProps) {
  // Top Banner Ad
  const topAd = useMemo(() => {
    if (!adsEnabled) return null;
    return ads.find((a) => a.position === "TOP" && a.status === "active");
  }, [ads, adsEnabled]);

  // Bottom Banner Ad
  const bottomAd = useMemo(() => {
    if (!adsEnabled) return null;
    return ads.find((a) => a.position === "BOTTOM" && a.status === "active");
  }, [ads, adsEnabled]);

  // Between news ads pool
  const betweenAds = useMemo(() => {
    if (!adsEnabled) return [];
    return ads.filter((a) => a.position === "BETWEEN_NEWS" && a.status === "active");
  }, [ads, adsEnabled]);

  const leadItem = news[0];
  const supportingItems = news.slice(1, 4);
  const remainingNews = news.slice(4);

  // Interleave remaining news with ads based on exact frequency
  const interleavedRemaining = useMemo(() => {
    if (!adsEnabled || betweenAds.length === 0 || frequency <= 0) {
      return remainingNews.map((item) => ({ kind: "news" as const, item, key: item.id }));
    }

    const entries: Array<
      | { kind: "news"; item: NewsItem; key: string }
      | { kind: "ad"; ad: Advertisement; key: string }
    > = [];

    // The counter accounts for the items already shown above (lead + 3 supporting = 4 items)
    // If frequency is 4, then right after supporting stories (total 4 news), we insert an ad!
    let totalNewsCounter = 4;
    let adCursor = 0;

    // Check if an ad should be injected right after supporting stories
    if (totalNewsCounter % frequency === 0 && remainingNews.length > 0) {
      const selectedAd = betweenAds[adCursor % betweenAds.length];
      entries.push({
        kind: "ad",
        ad: selectedAd,
        key: `feed-ad-${selectedAd.id}-initial`,
      });
      adCursor += 1;
    }

    remainingNews.forEach((item, index) => {
      entries.push({ kind: "news", item, key: item.id });
      totalNewsCounter += 1;

      const isLast = index === remainingNews.length - 1;
      if (totalNewsCounter % frequency === 0 && !isLast) {
        const selectedAd = betweenAds[adCursor % betweenAds.length];
        entries.push({
          kind: "ad",
          ad: selectedAd,
          key: `feed-ad-${selectedAd.id}-${index}`,
        });
        adCursor += 1;
      }
    });

    return entries;
  }, [remainingNews, betweenAds, frequency, adsEnabled]);

  const handleLike = (id: string) => {
    toggleUserLike(id);
    onRefresh?.();
  };

  const handleShare = (id: string, channel: string) => {
    recordNewsShare(id, channel);
  };

  if (!news || news.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-2xl text-muted-foreground">No news published yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Optional Top Advertisement */}
      {topAd && (
        <div className="mb-8">
          <AdvertisementBanner ad={topAd} variant="masthead" />
        </div>
      )}

      {/* 1. Large Lead Story */}
      {leadItem && (
        <section className="mb-10" aria-label="Lead Story">
          <NewsCard
            item={leadItem}
            variant="lead"
            isLiked={isLikedByUser(leadItem.id)}
            onLikeToggle={() => handleLike(leadItem.id)}
            onShareTrack={(channel) => handleShare(leadItem.id, channel)}
          />
        </section>
      )}

      {/* 2. Supporting Stories (Grid of 2 or 3) */}
      {supportingItems.length > 0 && (
        <section className="mb-12" aria-label="Supporting Stories">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {supportingItems.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
                variant="secondary"
                isLiked={isLikedByUser(item.id)}
                onLikeToggle={() => handleLike(item.id)}
                onShareTrack={(channel) => handleShare(item.id, channel)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 3. News Feed with frequency-based Interleaved Advertisements */}
      {interleavedRemaining.length > 0 && (
        <section className="mb-12 border-t-2 border-rule pt-6" aria-label="News Feed">
          <div className="flex items-center justify-between pb-4 border-b border-rule">
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground uppercase">
              Latest Dispatches
            </h2>
            <span className="text-xs text-muted-foreground font-sans">
              Continuous Journal
            </span>
          </div>

          <div className="divide-y divide-rule/80">
            {interleavedRemaining.map((entry) => {
              if (entry.kind === "ad") {
                return (
                  <div key={entry.key} className="py-8">
                    <AdvertisementBanner ad={entry.ad} variant="inline" />
                  </div>
                );
              }
              return (
                <NewsCard
                  key={entry.key}
                  item={entry.item}
                  variant="standard"
                  isLiked={isLikedByUser(entry.item.id)}
                  onLikeToggle={() => handleLike(entry.item.id)}
                  onShareTrack={(channel) => handleShare(entry.item.id, channel)}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Bottom Advertisement */}
      {bottomAd && (
        <div className="mt-12 mb-6">
          <AdvertisementBanner ad={bottomAd} variant="footer" />
        </div>
      )}
    </div>
  );
}
