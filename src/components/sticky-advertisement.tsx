import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Advertisement } from "@/data/types";
import { recordAdImpression, recordAdClick } from "@/lib/storage";

interface StickyAdvertisementProps {
  ad: Advertisement;
}

export function StickyAdvertisement({ ad }: StickyAdvertisementProps) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!dismissed) {
      recordAdImpression(ad.id);
    }
  }, [ad.id, dismissed]);

  if (dismissed || !ad.image) return null;

  const handleClick = () => {
    recordAdClick(ad.id);
  };

  return (
    <aside
      aria-label="Sponsored notification"
      className="fixed inset-x-0 bottom-0 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300 border-t border-rule bg-background/95 backdrop-blur-md shadow-2xl py-2 px-3 sm:px-6"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold shrink-0 hidden sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          <span>Sponsored</span>
        </div>

        <a
          href={ad.targetUrl || "#"}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden group hover:opacity-95"
        >
          <img
            src={ad.image}
            alt={ad.title}
            className="h-10 w-24 sm:h-12 sm:w-36 rounded-xs object-cover shrink-0 border border-rule/60"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs sm:text-sm font-medium text-foreground group-hover:text-brand transition-colors font-sans">
              {ad.title}
            </p>
            {ad.sponsorName && (
              <p className="text-[11px] text-muted-foreground truncate hidden sm:block">
                Presented by {ad.sponsorName}
              </p>
            )}
          </div>
          <span className="hidden md:inline-flex items-center text-xs font-semibold text-brand px-2.5 py-1 rounded-sm border border-brand/30 bg-brand/5 group-hover:bg-brand group-hover:text-white transition-colors shrink-0">
            Learn More
          </span>
        </a>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss advertisement"
          className="grid h-7 w-7 sm:h-8 sm:w-8 shrink-0 place-items-center rounded-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
