import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, Newspaper } from "lucide-react";
import type { NewsItem, Advertisement } from "@/data/types";
import { SwipeNewsStory } from "./swipe-news-story";
import { SwipeAdSlide } from "./swipe-ad-slide";

interface SwipeFeedProps {
  news: NewsItem[];
  ads: Advertisement[];
  frequency: number;
  adsEnabled: boolean;
}

type FeedEntry =
  | { kind: "news"; item: NewsItem; newsIndex: number; key: string }
  | { kind: "ad"; ad: Advertisement; key: string };

export function SwipeFeed({
  news,
  ads,
  frequency = 4,
  adsEnabled = true,
}: SwipeFeedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Active ads eligible for feed interleaving
  const activeBetweenAds = useMemo(() => {
    if (!adsEnabled) return [];
    return ads.filter(
      (a) =>
        a.status === "active" &&
        (a.position === "BETWEEN_NEWS" || a.position === "TOP" || a.position === "BOTTOM"),
    );
  }, [ads, adsEnabled]);

  // Active banner ads for every news story strip
  const activeBannerAds = useMemo(() => {
    return ads.filter(
      (a) => a.status === "active" && a.position === "NEWS_BANNER",
    );
  }, [ads]);

  // Construct the interleaved feed entries
  const feedEntries: FeedEntry[] = useMemo(() => {
    const entries: FeedEntry[] = [];
    if (!news || news.length === 0) return entries;

    let adCursor = 0;
    let newsCounter = 0;

    news.forEach((item, index) => {
      entries.push({
        kind: "news",
        item,
        newsIndex: index,
        key: `news-${item.id}`,
      });
      newsCounter += 1;

      // When newsCounter reaches the frequency (e.g. 4), inject an advertisement
      const isLast = index === news.length - 1;
      if (
        adsEnabled &&
        activeBetweenAds.length > 0 &&
        frequency > 0 &&
        newsCounter % frequency === 0 &&
        !isLast
      ) {
        const selectedAd = activeBetweenAds[adCursor % activeBetweenAds.length];
        entries.push({
          kind: "ad",
          ad: selectedAd,
          key: `ad-${selectedAd.id}-${index}`,
        });
        adCursor += 1;
      }
    });

    return entries;
  }, [news, activeBetweenAds, frequency, adsEnabled]);

  // Track the visible slide on scroll
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const scrollTop = el.scrollTop;
    const clientHeight = el.clientHeight || window.innerHeight;
    const index = Math.round(scrollTop / clientHeight);

    if (index !== currentSlideIndex) {
      setCurrentSlideIndex(index);
      if (index > 0 && showSwipeHint) {
        setShowSwipeHint(false);
      }
    }
  }, [currentSlideIndex, showSwipeHint]);

  // Keyboard navigation support: ArrowDown, ArrowUp, PageDown, PageUp, Space
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const el = containerRef.current;
      if (!el) return;
      const clientHeight = el.clientHeight || window.innerHeight;

      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        el.scrollBy({ top: clientHeight, behavior: "smooth" });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        el.scrollBy({ top: -clientHeight, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToNext = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ top: el.clientHeight, behavior: "smooth" });
  };

  const scrollToPrev = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ top: -el.clientHeight, behavior: "smooth" });
  };

  if (!news || news.length === 0) {
    return (
      <div className="h-[100svh] flex flex-col items-center justify-center p-6 text-center bg-background text-foreground">
        <Newspaper className="h-12 w-12 text-muted-foreground/60 mb-4" />
        <h2 className="font-display text-2xl font-bold mb-2">వార్తలు సిద్ధమవుతున్నాయి</h2>
        <p className="font-serif text-sm text-muted-foreground max-w-sm mb-6">
          తాజా సమాచారాన్ని సంపాదక బృందం అప్‌డేట్ చేస్తోంది. దయచేసి కాసేపటి తర్వాత పరిశీలించండి.
        </p>
        <Link
          to="/admin"
          className="text-xs uppercase tracking-wider font-semibold font-sans px-4 py-2 bg-brand text-white rounded-xs"
        >
          న్యూస్‌రూమ్ డెస్క్
        </Link>
      </div>
    );
  }

  const totalNewsStories = news.length;
  const currentEntry = feedEntries[currentSlideIndex];
  const currentNewsNumber =
    currentEntry?.kind === "news"
      ? currentEntry.newsIndex + 1
      : null;

  return (
    <div className="relative w-full h-[100svh] bg-neutral-950 flex items-center justify-center overflow-hidden">
      {/* ----------------- Desktop Ambient Backdrop ----------------- */}
      <div className="absolute inset-0 bg-radial from-neutral-900 via-neutral-950 to-black opacity-90 hidden md:block pointer-events-none" />

      {/* ----------------- Desktop Left Editorial Panel ----------------- */}
      <aside className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-4 text-neutral-400 z-30 max-w-[210px]">
        <div>
          <span className="font-display text-xl font-black uppercase text-white tracking-tight">
            EIGHT NEWS
          </span>
          <p className="text-[11px] font-sans text-neutral-400 tracking-wider mt-0.5">
            తెలుగు షార్ట్ న్యూస్
          </p>
        </div>

        <div className="pt-3 border-t border-neutral-800 text-xs font-sans space-y-1.5">
          <p className="text-neutral-300 font-medium">నావిగేషన్</p>
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            తదుపరి వార్త కోసం <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">↑</kbd> మరియు <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">↓</kbd> కీలు లేదా మౌస్ స్క్రోల్ ఉపయోగించండి.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/admin"
            className="text-[11px] font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            న్యూస్‌రూమ్ లాగిన్ →
          </Link>
        </div>
      </aside>

      {/* ----------------- Centered Mobile-First Vertical Swipe Column ----------------- */}
      <div className="relative w-full max-w-[480px] h-[100svh] bg-background shadow-2xl md:ring-1 md:ring-neutral-800">
        <main
          ref={containerRef}
          onScroll={handleScroll}
          tabIndex={0}
          aria-label="తెలుగు షార్ట్ న్యూస్ ఫీడ్"
          className="w-full h-[100svh] overflow-y-scroll snap-y snap-mandatory scroll-smooth touch-pan-y no-scrollbar focus:outline-none"
        >
          {feedEntries.map((entry, idx) => {
            if (entry.kind === "ad") {
              return (
                <SwipeAdSlide
                  key={entry.key}
                  ad={entry.ad}
                  index={idx}
                />
              );
            }

            const bannerAd =
              activeBannerAds.length > 0
                ? activeBannerAds[entry.newsIndex % activeBannerAds.length]
                : undefined;

            return (
              <SwipeNewsStory
                key={entry.key}
                item={entry.item}
                index={idx}
                isFirst={entry.newsIndex === 0}
                showSwipeHint={showSwipeHint && currentSlideIndex === 0}
                bannerAd={bannerAd}
              />
            );
          })}
        </main>
      </div>

      {/* ----------------- Desktop Right Controls & Story Tracker ----------------- */}
      <aside className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-30">
        {/* Story Count Pill */}
        <div className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-sans text-neutral-300 shadow-md">
          {currentNewsNumber ? (
            <span>వార్త {currentNewsNumber} / {totalNewsStories}</span>
          ) : (
            <span className="text-amber-400">ప్రకటన</span>
          )}
        </div>

        {/* Up / Down Navigation Buttons */}
        <div className="flex flex-col gap-1.5 bg-neutral-900/90 border border-neutral-800 p-1.5 rounded-full shadow-xl">
          <button
            type="button"
            onClick={scrollToPrev}
            disabled={currentSlideIndex === 0}
            aria-label="మునుపటి వార్త"
            className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronUp className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={scrollToNext}
            disabled={currentSlideIndex === feedEntries.length - 1}
            aria-label="తర్వాతి వార్త"
            className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
      </aside>
    </div>
  );
}
