import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NewsArticle } from "@/components/news-article";
import { StickyAdvertisement } from "@/components/sticky-advertisement";
import { useArticle } from "@/hooks/use-news";
import { useAds } from "@/hooks/use-ads";
import { useSettings } from "@/hooks/use-settings";

export const Route = createFileRoute("/news/$slug")({
  component: NewsArticlePage,
});

function NewsArticlePage() {
  const { slug } = Route.useParams();
  const {
    article,
    liked,
    likesCount,
    viewsCount,
    toggleLike,
    recordShare,
  } = useArticle(slug);

  const { ads } = useAds();
  const { settings } = useSettings();

  const middleAd = settings.adsEnabled
    ? ads.find((a) => a.position === "ARTICLE_MIDDLE" && a.status === "active") ||
      ads.find((a) => a.position === "BETWEEN_NEWS" && a.status === "active")
    : null;

  const bottomAd = settings.adsEnabled
    ? ads.find((a) => a.position === "BOTTOM" && a.status === "active")
    : null;

  const stickyAd = settings.adsEnabled
    ? ads.find((a) => a.position === "STICKY_BOTTOM" && a.status === "active")
    : null;

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground font-telugu">
        <SiteHeader />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="font-telugu text-3xl sm:text-4xl font-bold mb-4">వార్త లభించలేదు</h1>
          <p className="font-telugu text-base sm:text-lg text-muted-foreground mb-8">
            మీరు వెతుకుతున్న వార్తా కథనం తొలగించబడటం లేదా ప్రచురించబడకుండా ఉండవచ్చు.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xs bg-brand text-white font-telugu text-sm font-semibold hover:bg-brand/90 transition-colors shadow-xs"
          >
            ← ప్రధాన స్వైప్ ఫీడ్‌కు తిరిగి వెళ్లండి
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <NewsArticle
          article={article}
          liked={liked}
          likesCount={likesCount}
          viewsCount={viewsCount}
          onToggleLike={toggleLike}
          onRecordShare={recordShare}
          middleAd={middleAd}
          bottomAd={bottomAd}
        />
      </main>

      {stickyAd && <StickyAdvertisement ad={stickyAd} />}

      <SiteFooter />
    </div>
  );
}
