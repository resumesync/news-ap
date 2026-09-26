import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Play, X, ChevronUp, ArrowRight } from "lucide-react";
import type { NewsItem } from "@/data/types";
import { formatStoryDate } from "@/lib/format";
import { incrementViews, isLikedByUser, toggleUserLike, recordNewsShare, getYouTubeEmbedUrl } from "@/lib/storage";
import { LikeButton } from "./like-button";
import { ShareMenu } from "./share-menu";
import { ViewCounter } from "./view-counter";

interface SwipeNewsStoryProps {
  item: NewsItem;
  index: number;
  isFirst?: boolean;
  showSwipeHint?: boolean;
  onVisible?: (id: string, index: number) => void;
}

export function SwipeNewsStory({
  item,
  index,
  isFirst = false,
  showSwipeHint = false,
  onVisible,
}: SwipeNewsStoryProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [liked, setLiked] = useState(() => isLikedByUser(item.id));
  const [likesCount, setLikesCount] = useState(item.likes);
  const [viewsCount, setViewsCount] = useState(item.views);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const formattedDate = formatStoryDate(item.publishedDate, item.publishedTime);
  const embedUrl = getYouTubeEmbedUrl(item.videoUrl);
  const hasVideo = Boolean(embedUrl);

  const displayTitle = item.titleTe || item.title || "";
  const displaySummary = item.shortSummaryTe || item.shortDescription || "";

  // IntersectionObserver to register view when the story enters the viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            onVisible?.(item.id, index);
            const updatedViews = incrementViews(item.id);
            if (updatedViews) {
              setViewsCount(updatedViews);
            }
          }
        });
      },
      { threshold: [0.55] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [item.id, index, onVisible]);

  // Sync likes and views on external updates
  useEffect(() => {
    setLiked(isLikedByUser(item.id));
    setLikesCount(item.likes);
    setViewsCount(item.views);
  }, [item.id, item.likes, item.views]);

  const handleLikeToggle = () => {
    const res = toggleUserLike(item.id);
    setLiked(res.liked);
    setLikesCount(res.count);
  };

  const handleShareTrack = (channel: string) => {
    recordNewsShare(item.id, channel);
  };

  return (
    <article
      ref={containerRef}
      data-story-id={item.id}
      data-story-index={index}
      className="relative w-full h-[100svh] min-h-[100svh] max-h-[100svh] snap-start flex flex-col justify-between bg-background text-foreground overflow-hidden select-none border-b border-rule/50 md:border-x md:border-rule"
    >
      {/* ----------------- 1. Minimal Masthead Header ----------------- */}
      <header className="shrink-0 h-11 sm:h-12 px-4 sm:px-5 flex items-center justify-between border-b border-rule bg-background/95 backdrop-blur-md z-20">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display text-lg sm:text-xl font-black tracking-tight uppercase text-foreground leading-none">
            EIGHT NEWS
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/news/$slug"
            params={{ slug: item.slug }}
            className="text-xs font-semibold text-brand hover:underline flex items-center gap-0.5"
          >
            <span>పూర్తి వార్త</span>
            <ArrowRight className="h-3 w-3" />
          </Link>

          <span className="grid h-6 w-6 sm:h-7 sm:w-7 place-items-center bg-foreground text-background font-display text-xs sm:text-sm font-bold rounded-xs shadow-xs">
            8
          </span>
        </div>
      </header>

      {/* ----------------- 2. News Image (45-50% Viewport Height) ----------------- */}
      <div className="relative w-full h-[45svh] sm:h-[47svh] shrink-0 bg-neutral-900 overflow-hidden">
        {/* If video player is active */}
        {isPlayingVideo && embedUrl ? (
          <div className="relative w-full h-full bg-black z-10 animate-in fade-in duration-200">
            <iframe
              src={`${embedUrl}?autoplay=1`}
              title={displayTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
            <button
              type="button"
              onClick={() => setIsPlayingVideo(false)}
              className="absolute top-3 right-3 bg-black/80 hover:bg-black text-white p-1.5 rounded-full backdrop-blur-md transition-colors shadow-lg cursor-pointer"
              title="వీడియో మూసివేయి"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <img
              src={item.image}
              alt={displayTitle}
              loading={index < 2 ? "eager" : "lazy"}
              className="w-full h-full object-cover object-center"
            />

            {/* Gradient overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Video Play Button (Only shown when video exists) */}
            {hasVideo && (
              <button
                type="button"
                onClick={() => setIsPlayingVideo(true)}
                aria-label="వీడియో ప్లే చేయండి"
                className="absolute inset-0 m-auto h-13 w-13 sm:h-15 sm:w-15 rounded-full bg-brand/90 hover:bg-brand text-white flex items-center justify-center shadow-2xl backdrop-blur-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer z-10 group"
              >
                <Play className="h-6 w-6 sm:h-7 sm:w-7 fill-white translate-x-0.5" />
                <span className="sr-only">వీడియో ప్లే చేయండి</span>
              </button>
            )}

            {/* Video indicator badge */}
            {hasVideo && !isPlayingVideo && (
              <div className="absolute bottom-2.5 right-3 z-10">
                <span className="inline-flex items-center gap-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-xs border border-white/20">
                  <Play className="h-2.5 w-2.5 fill-current text-brand" /> వీడియో
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* ----------------- 3. Instagram-style Left Action Rail & News Content ----------------- */}
      <div className="relative flex-1 min-h-0 flex flex-col justify-between bg-background overflow-hidden">
        {/* Vertical Left Action Rail (LIKE -> SHARE -> VIEWS) */}
        <aside
          aria-label="వార్తా చర్యలు"
          className="absolute left-3 sm:left-4 -top-32 sm:-top-36 z-25 flex flex-col items-center gap-3 sm:gap-3.5 select-none pointer-events-auto"
        >
          {/* 1. LIKE BUTTON */}
          <button
            type="button"
            onClick={handleLikeToggle}
            aria-label={liked ? "లైక్ తొలగించండి" : "లైక్ చేయండి"}
            className="flex flex-col items-center gap-0.5 group cursor-pointer focus:outline-none"
          >
            <div
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-transform duration-150 active:scale-90 ${
                liked
                  ? "bg-rose-600 text-white shadow-rose-950/40 ring-2 ring-rose-400/40"
                  : "bg-black/60 hover:bg-black/80 text-white/95 border border-white/20 group-hover:scale-105"
              }`}
            >
              <span className={`text-lg sm:text-xl transition-transform ${liked ? "scale-110" : ""}`}>
                {liked ? "♥" : "♡"}
              </span>
            </div>
            <span
              className={`text-[11px] sm:text-xs font-mono font-semibold tracking-tight tabular-nums drop-shadow-md ${
                liked ? "text-rose-500 font-bold" : "text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
              }`}
            >
              {formatCompactCount(likesCount)}
            </span>
          </button>

          {/* 2. SHARE BUTTON */}
          <div className="flex flex-col items-center">
            <ShareMenu
              title={displayTitle}
              description={displaySummary}
              sharesCount={item.shares}
              onShareTrack={handleShareTrack}
              size="md"
              showCount={false}
              label=""
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full !p-0 flex items-center justify-center bg-black/60 hover:bg-black/80 text-white/95 border border-white/20 shadow-lg backdrop-blur-md transition-transform duration-150 hover:scale-105 active:scale-90 group-hover:border-white/40 cursor-pointer"
            />
            <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-tight text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] tabular-nums mt-0.5">
              {formatCompactCount(item.shares)}
            </span>
          </div>

          {/* 3. VIEWS DISPLAY (NOT CLICKABLE) */}
          <div
            className="flex flex-col items-center gap-0.5 cursor-default"
            title={`${viewsCount.toLocaleString()} మంది వీక్షించారు`}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-black/60 text-white/95 border border-white/20 shadow-lg backdrop-blur-md">
              <span className="text-base sm:text-lg">👁</span>
            </div>
            <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-tight text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] tabular-nums">
              {formatCompactCount(viewsCount)}
            </span>
          </div>
        </aside>

        {/* Content Body: Headings and Telugu Short Summary */}
        <div className="px-4 sm:px-5 py-3 sm:py-3.5 space-y-2 sm:space-y-2.5 overflow-hidden">
          {/* Headline - Telugu Bold (8-15 words approx, max 2-3 lines) */}
          <h1 className="font-sans text-[1.18rem] sm:text-[1.32rem] md:text-[1.45rem] font-bold leading-[1.35] tracking-tight text-foreground line-clamp-3">
            <Link
              to="/news/$slug"
              params={{ slug: item.slug }}
              className="headline-link block"
            >
              {displayTitle}
            </Link>
          </h1>

          {/* Short Summary - Telugu (40-70 words approx, max 3 lines) */}
          <p className="font-sans text-xs sm:text-[0.875rem] text-muted-foreground leading-[1.65] line-clamp-3">
            {displaySummary}
          </p>

          {/* Date & Time */}
          <div className="text-[11px] font-sans text-muted-foreground/75 font-medium">
            {formattedDate}
          </div>
        </div>

        {/* ----------------- 4. Bottom Area: Dedicated "పూర్తి వార్త →" Link ----------------- */}
        <div className="shrink-0 px-4 sm:px-5 pb-3 sm:pb-3.5 pt-1">
          <Link
            to="/news/$slug"
            params={{ slug: item.slug }}
            className="w-full py-2 px-4 rounded-xs border border-rule/80 bg-secondary/60 hover:bg-brand/10 hover:border-brand/40 text-foreground hover:text-brand transition-colors text-xs sm:text-sm font-semibold text-center flex items-center justify-center gap-1.5 font-sans shadow-xs"
          >
            <span>పూర్తి వార్త చదవండి</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* ----------------- 5. Onboarding Swipe Hint (Only on 1st story) ----------------- */}
      {isFirst && showSwipeHint && (
        <div className="absolute bottom-20 sm:bottom-22 inset-x-0 mx-auto w-fit z-30 pointer-events-none animate-bounce">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-foreground/90 text-background text-xs font-semibold font-sans shadow-xl backdrop-blur-md">
            <ChevronUp className="h-4 w-4 text-brand" />
            <span>↑ పైకి స్వైప్ చేయండి</span>
          </div>
        </div>
      )}
    </article>
  );
}
