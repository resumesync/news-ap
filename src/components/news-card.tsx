import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import type { NewsItem } from "@/data/types";
import { formatDate } from "@/lib/format";
import { NewsImage } from "./news-image";
import { ViewCounter } from "./view-counter";
import { LikeButton } from "./like-button";
import { ShareMenu } from "./share-menu";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  item: NewsItem;
  variant?: "lead" | "secondary" | "standard" | "compact";
  className?: string;
  onLikeToggle?: () => void;
  isLiked?: boolean;
  onShareTrack?: (channel: string) => void;
}

export function NewsCard({
  item,
  variant = "standard",
  className,
  onLikeToggle,
  isLiked = false,
  onShareTrack,
}: NewsCardProps) {
  const hasVideo = Boolean(item.videoUrl);
  const formattedDate = formatDate(item.publishedDate, item.publishedTime);

  /* ------------------------------- LEAD VARIANT ------------------------------ */
  if (variant === "lead") {
    return (
      <article
        className={cn(
          "group relative flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 pb-8 border-b-2 border-rule",
          className,
        )}
      >
        {/* Left Column: Headline, Summary & Metadata */}
        <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col justify-between mt-4 lg:mt-0">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="kicker text-[11px] font-semibold text-muted-foreground">
                {formattedDate}
              </span>
              {hasVideo && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase text-brand tracking-wider bg-brand/10 px-2 py-0.5 rounded-xs">
                  <Play className="h-3 w-3 fill-current" /> Video
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.6rem] font-bold font-display leading-[1.14] tracking-tight text-foreground">
              <Link
                to="/news/$slug"
                params={{ slug: item.slug }}
                className="headline-link block"
              >
                {item.title}
              </Link>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground/90 font-serif leading-relaxed line-clamp-3">
              {item.shortDescription}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-rule/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <ViewCounter views={item.views} />
              {item.readTime && (
                <span className="text-xs text-muted-foreground font-sans">
                  • {item.readTime}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <LikeButton
                initialCount={item.likes}
                initialLiked={isLiked}
                onToggle={() => onLikeToggle?.()}
                size="sm"
              />
              <ShareMenu
                title={item.title}
                description={item.shortDescription}
                sharesCount={item.shares}
                onShareTrack={onShareTrack}
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Hero Image */}
        <div className="order-1 lg:order-2 lg:col-span-6 relative">
          <Link
            to="/news/$slug"
            params={{ slug: item.slug }}
            className="block overflow-hidden rounded-xs focus:outline-none"
            tabIndex={-1}
          >
            <div className="relative">
              <NewsImage
                src={item.image}
                alt={item.title}
                aspectRatio="video"
                priority
                className="w-full"
              />
              {hasVideo && (
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-sm flex items-center gap-1.5 text-xs font-medium shadow-md">
                  <Play className="h-3.5 w-3.5 fill-current text-brand" />
                  <span>Watch</span>
                </div>
              )}
            </div>
          </Link>
          {item.imageCaption && (
            <p className="mt-2 text-xs italic text-muted-foreground hidden sm:block">
              {item.imageCaption}
            </p>
          )}
        </div>
      </article>
    );
  }

  /* ---------------------------- SECONDARY VARIANT ---------------------------- */
  if (variant === "secondary") {
    return (
      <article
        className={cn(
          "group flex flex-col justify-between h-full pb-6 border-b border-rule",
          className,
        )}
      >
        <div>
          <Link
            to="/news/$slug"
            params={{ slug: item.slug }}
            className="block overflow-hidden rounded-xs mb-3"
            tabIndex={-1}
          >
            <div className="relative">
              <NewsImage
                src={item.image}
                alt={item.title}
                aspectRatio="video"
                className="w-full"
              />
              {hasVideo && (
                <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-sm flex items-center gap-1 text-[11px] font-medium shadow-sm">
                  <Play className="h-3 w-3 fill-current text-brand" />
                  <span>Video</span>
                </div>
              )}
            </div>
          </Link>

          <div className="flex items-center gap-2 mb-2">
            <span className="kicker text-[10px] text-muted-foreground">
              {formattedDate}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-display leading-snug text-foreground">
            <Link
              to="/news/$slug"
              params={{ slug: item.slug }}
              className="headline-link block"
            >
              {item.title}
            </Link>
          </h3>

          <p className="mt-2.5 text-sm text-muted-foreground/90 font-serif leading-relaxed line-clamp-2">
            {item.shortDescription}
          </p>
        </div>

        <div className="mt-5 pt-3 border-t border-rule/60 flex items-center justify-between gap-2">
          <ViewCounter views={item.views} />

          <div className="flex items-center gap-1.5">
            <LikeButton
              initialCount={item.likes}
              initialLiked={isLiked}
              onToggle={() => onLikeToggle?.()}
              size="sm"
            />
            <ShareMenu
              title={item.title}
              description={item.shortDescription}
              sharesCount={item.shares}
              onShareTrack={onShareTrack}
              size="sm"
            />
          </div>
        </div>
      </article>
    );
  }

  /* ---------------------------- COMPACT VARIANT ----------------------------- */
  if (variant === "compact") {
    return (
      <article
        className={cn(
          "group flex items-start gap-3 py-3 border-b border-rule/60 last:border-b-0",
          className,
        )}
      >
        <Link
          to="/news/$slug"
          params={{ slug: item.slug }}
          className="shrink-0 w-20 h-16 sm:w-24 sm:h-18 overflow-hidden rounded-xs"
          tabIndex={-1}
        >
          <NewsImage
            src={item.image}
            alt={item.title}
            aspectRatio="video"
            className="h-full w-full object-cover"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-sans">
            <span>{formattedDate}</span>
            {hasVideo && <Play className="h-2.5 w-2.5 fill-brand text-brand" />}
          </div>
          <h4 className="text-sm font-semibold font-display leading-snug text-foreground line-clamp-2 mt-0.5">
            <Link
              to="/news/$slug"
              params={{ slug: item.slug }}
              className="headline-link"
            >
              {item.title}
            </Link>
          </h4>
        </div>
      </article>
    );
  }

  /* ---------------------------- STANDARD VARIANT ---------------------------- */
  return (
    <article
      className={cn(
        "group grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 py-6 border-b border-rule items-start",
        className,
      )}
    >
      <div className="sm:col-span-4 order-1 sm:order-2">
        <Link
          to="/news/$slug"
          params={{ slug: item.slug }}
          className="block overflow-hidden rounded-xs"
          tabIndex={-1}
        >
          <div className="relative">
            <NewsImage
              src={item.image}
              alt={item.title}
              aspectRatio="video"
              className="w-full"
            />
            {hasVideo && (
              <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-sm flex items-center gap-1 text-[11px] font-medium shadow-sm">
                <Play className="h-3 w-3 fill-current text-brand" />
                <span>Video</span>
              </div>
            )}
          </div>
        </Link>
      </div>

      <div className="sm:col-span-8 order-2 sm:order-1 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <span className="kicker text-[10px] text-muted-foreground">
              {formattedDate}
            </span>
            {hasVideo && (
              <span className="text-[10px] text-brand font-semibold uppercase tracking-wider">
                Video Included
              </span>
            )}
          </div>

          <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-display leading-snug text-foreground">
            <Link
              to="/news/$slug"
              params={{ slug: item.slug }}
              className="headline-link block"
            >
              {item.title}
            </Link>
          </h3>

          <p className="mt-2 text-sm sm:text-base text-muted-foreground/90 font-serif leading-relaxed line-clamp-2 sm:line-clamp-3">
            {item.shortDescription}
          </p>
        </div>

        <div className="mt-4 pt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <ViewCounter views={item.views} />
            {item.readTime && <span>• {item.readTime}</span>}
          </div>

          <div className="flex items-center gap-2">
            <LikeButton
              initialCount={item.likes}
              initialLiked={isLiked}
              onToggle={() => onLikeToggle?.()}
              size="sm"
            />
            <ShareMenu
              title={item.title}
              description={item.shortDescription}
              sharesCount={item.shares}
              onShareTrack={onShareTrack}
              size="sm"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
