import { useEffect, useRef } from "react";
import type { Advertisement } from "@/data/types";
import { recordAdImpression, recordAdClick } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface AdvertisementBannerProps {
  ad: Advertisement;
  className?: string;
  variant?: "inline" | "masthead" | "article" | "footer";
}

export function AdvertisementBanner({
  ad,
  className,
  variant = "inline",
}: AdvertisementBannerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            recordAdImpression(ad.id);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ad.id]);

  const handleClick = () => {
    recordAdClick(ad.id);
  };

  const variantStyles = {
    masthead: "max-w-5xl mx-auto py-3",
    inline: "w-full my-8",
    article: "my-10 max-w-2xl mx-auto",
    footer: "max-w-5xl mx-auto my-8",
  }[variant];

  return (
    <div
      ref={containerRef}
      className={cn("ad-slot-container", variantStyles, className)}
    >
      <div className="flex items-center justify-between px-1 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground/80 font-sans">
        <span className="font-semibold">Advertisement</span>
        {ad.sponsorName && (
          <span className="italic normal-case text-muted-foreground/70">
            Sponsored by {ad.sponsorName}
          </span>
        )}
      </div>

      <a
        href={ad.targetUrl || "#"}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className="group relative block overflow-hidden rounded-xs border border-rule/80 bg-paper transition-all hover:border-brand/40 hover:shadow-xs"
      >
        <div className="relative overflow-hidden">
          <img
            src={ad.image}
            alt={ad.title}
            loading="lazy"
            className="w-full object-cover max-h-[220px] transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </div>
        <div className="flex items-center justify-between border-t border-rule/50 bg-secondary/30 px-3 py-1.5 text-xs text-muted-foreground">
          <span className="truncate font-sans font-medium text-foreground/85">
            {ad.title}
          </span>
          <span className="shrink-0 text-[11px] font-sans text-brand font-medium group-hover:underline">
            Visit Sponsor →
          </span>
        </div>
      </a>
    </div>
  );
}
