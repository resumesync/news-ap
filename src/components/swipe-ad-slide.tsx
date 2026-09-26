import { useEffect, useRef } from "react";
import { ExternalLink, Megaphone } from "lucide-react";
import type { Advertisement } from "@/data/types";
import { recordAdImpression, recordAdClick } from "@/lib/storage";

interface SwipeAdSlideProps {
  ad: Advertisement;
  index: number;
}

export function SwipeAdSlide({ ad, index }: SwipeAdSlideProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            recordAdImpression(ad.id);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ad.id]);

  const handleClick = () => {
    recordAdClick(ad.id);
  };

  const displayTitle = ad.titleTe || ad.title;

  return (
    <section
      ref={containerRef}
      data-ad-id={ad.id}
      data-ad-index={index}
      className="relative w-full h-[100svh] min-h-[100svh] max-h-[100svh] snap-start flex flex-col justify-between bg-secondary/30 text-foreground overflow-hidden select-none border-b border-rule/50 md:border-x md:border-rule"
      aria-label="ప్రకటన"
    >
      {/* ----------------- 1. Header with Telugu Sponsored Label ----------------- */}
      <header className="shrink-0 h-11 sm:h-12 px-4 sm:px-5 flex items-center justify-between border-b border-rule bg-background/95 backdrop-blur-md z-20">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg sm:text-xl font-black tracking-tight uppercase text-foreground leading-none">
            EIGHT NEWS
          </span>
          <span className="text-[10px] tracking-wider font-semibold px-2 py-0.5 rounded-xs bg-amber-500/10 text-amber-700 border border-amber-600/30 font-sans">
            ప్రకటన
          </span>
        </div>

        <span className="text-[11px] font-sans font-medium text-muted-foreground">
          స్పాన్సర్డ్ వార్త
        </span>
      </header>

      {/* ----------------- 2. Creative Image ----------------- */}
      <div className="relative w-full h-[45svh] sm:h-[47svh] shrink-0 bg-neutral-900 overflow-hidden">
        <a
          href={ad.targetUrl || "#"}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="block w-full h-full group"
        >
          <img
            src={ad.image}
            alt={displayTitle}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
            <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xs border border-white/20 text-[11px] font-medium font-sans">
              <Megaphone className="h-3 w-3 text-amber-400" />
              <span>వాణిజ్య భాగస్వామ్యం</span>
            </span>

            <span className="inline-flex items-center gap-1 text-[11px] text-white/90 group-hover:underline font-sans">
              <span>ఓపెన్ చేయండి</span>
              <ExternalLink className="h-3 w-3" />
            </span>
          </div>
        </a>
      </div>

      {/* ----------------- 3. Sponsor Content & Call-to-Action ----------------- */}
      <div className="flex-1 min-h-0 flex flex-col justify-between px-4 sm:px-5 py-3.5 bg-background overflow-hidden">
        <div className="space-y-2 overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold font-sans">
              ప్రకటన
            </span>
            {ad.sponsorName && (
              <>
                <span className="text-rule">•</span>
                <span className="text-xs text-brand font-medium font-sans">
                  {ad.sponsorName}
                </span>
              </>
            )}
          </div>

          <h2 className="font-sans text-lg sm:text-xl font-bold leading-snug text-foreground line-clamp-2">
            {displayTitle}
          </h2>

          <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
            మా వాణిజ్య భాగస్వామి అందించే అత్యుత్తమ సేవలు, నూతన పథకాలు మరియు ఉత్పత్తుల వివరాలను తెలుసుకోండి.
          </p>
        </div>

        {/* Action Button */}
        <div className="shrink-0 pt-3 border-t border-rule/60 flex items-center justify-between gap-4 font-sans">
          <span className="text-[11px] text-muted-foreground">
            ప్రకటన వివరాలు
          </span>

          <a
            href={ad.targetUrl || "#"}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={handleClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xs bg-brand hover:bg-brand/90 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
          >
            <span>మరిన్ని వివరాలు</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
