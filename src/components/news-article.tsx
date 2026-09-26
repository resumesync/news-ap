import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import type { NewsItem, Advertisement } from "@/data/types";
import { formatDate } from "@/lib/format";
import { NewsImage } from "./news-image";
import { NewsVideo } from "./news-video";
import { ViewCounter } from "./view-counter";
import { LikeButton } from "./like-button";
import { ShareMenu } from "./share-menu";
import { AdvertisementBanner } from "./advertisement-banner";

interface NewsArticleProps {
  article: NewsItem;
  liked: boolean;
  likesCount: number;
  viewsCount: number;
  onToggleLike: () => void;
  onRecordShare: (channel: string) => void;
  middleAd?: Advertisement | null;
  bottomAd?: Advertisement | null;
}

export function NewsArticle({
  article,
  liked,
  likesCount,
  viewsCount,
  onToggleLike,
  onRecordShare,
  middleAd,
  bottomAd,
}: NewsArticleProps) {
  const titleText = article.titleTe || article.title;
  const summaryText = article.shortSummaryTe || article.shortDescription;
  const contentText = article.fullContentTe || article.content || summaryText;

  const formattedDate = formatDate(article.publishedDate, article.publishedTime);

  // Split content into paragraphs
  const paragraphs = contentText.split("\n\n").filter(Boolean);
  const midpoint = Math.max(2, Math.floor(paragraphs.length / 2));

  return (
    <main className="w-full">
      {/* Top back navigation link */}
      <nav aria-label="Breadcrumb" className="mb-6 pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-brand transition-colors font-sans"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> ← స్వైప్ ఫీడ్‌కు తిరిగి వెళ్లండి
        </Link>
      </nav>

      {/* Article Header */}
      <header className="mb-8 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold font-telugu leading-[1.35] tracking-tight text-foreground text-balance">
          {titleText}
        </h1>

        {summaryText && (
          <p className="mt-4 text-base sm:text-lg font-telugu text-muted-foreground leading-relaxed text-balance bg-muted/30 p-3 sm:p-4 rounded-xs border-l-4 border-brand">
            {summaryText}
          </p>
        )}

        {/* Metadata & Actions Bar */}
        <div className="mt-6 pt-4 border-y border-rule flex flex-wrap items-center justify-between gap-4 font-sans text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-1.5 font-telugu">
              <Calendar className="h-3.5 w-3.5 opacity-70" />
              <span>{formattedDate}</span>
            </div>
            <ViewCounter views={viewsCount} />
          </div>

          <div className="flex items-center gap-2">
            <LikeButton
              initialCount={likesCount}
              initialLiked={liked}
              onToggle={onToggleLike}
              size="md"
            />
            <ShareMenu
              title={titleText}
              description={summaryText}
              sharesCount={article.shares}
              onShareTrack={onRecordShare}
              size="md"
            />
          </div>
        </div>
      </header>

      {/* Large Featured Image */}
      <div className="mb-10 max-w-4xl mx-auto">
        <NewsImage
          src={article.image}
          alt={titleText}
          caption={article.imageCaption}
          aspectRatio="wide"
          priority
          className="rounded-xs"
        />
      </div>

      {/* Article Body Content */}
      <div className="max-w-2xl mx-auto">
        <div className="article-body font-telugu space-y-4 text-base sm:text-lg leading-[1.8] text-foreground/90">
          {paragraphs.slice(0, midpoint).map((para, i) => (
            <p key={`p-1-${i}`}>{para}</p>
          ))}
        </div>

        {/* Middle Advertisement */}
        {middleAd && (
          <div className="my-10">
            <AdvertisementBanner ad={middleAd} variant="article" />
          </div>
        )}

        {/* Remaining Paragraphs */}
        <div className="article-body font-telugu space-y-4 text-base sm:text-lg leading-[1.8] text-foreground/90">
          {paragraphs.slice(midpoint).map((para, i) => (
            <p key={`p-2-${i}`}>{para}</p>
          ))}
        </div>

        {/* Optional Embedded Video Section */}
        {article.videoUrl && (
          <section className="my-10" aria-label="Video Coverage">
            <h3 className="text-sm font-bold uppercase tracking-wider font-sans text-brand mb-3 flex items-center gap-2">
              <span>వీడియో సమాచారం</span>
            </h3>
            <NewsVideo videoUrl={article.videoUrl} title={titleText} />
          </section>
        )}

        {/* Article Footer Engagement Bar */}
        <div className="mt-12 pt-6 border-t-2 border-rule flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-telugu font-semibold text-foreground text-sm tracking-wide">
              ఈ వార్త మీకు ఉపయోగపడిందా?
            </span>
          </div>

          <div className="flex items-center gap-3">
            <LikeButton
              initialCount={likesCount}
              initialLiked={liked}
              onToggle={onToggleLike}
              size="md"
            />
            <ShareMenu
              title={titleText}
              description={summaryText}
              sharesCount={article.shares}
              onShareTrack={onRecordShare}
              size="md"
            />
          </div>
        </div>

        {/* Bottom Advertisement in Article Page */}
        {bottomAd && (
          <div className="mt-12">
            <AdvertisementBanner ad={bottomAd} variant="article" />
          </div>
        )}
      </div>
    </main>
  );
}
