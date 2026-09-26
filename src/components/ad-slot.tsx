import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { Advertisement } from "@/lib/data";
import { recordAdEvent } from "@/lib/data";
import { onceThisSession } from "@/lib/device";
import { cn } from "@/lib/utils";

function useImpression(ad: Advertisement) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            if (onceThisSession(`ad_${ad.id}`)) {
              void recordAdEvent(ad.id, "impression").catch(() => undefined);
            }
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ad.id]);

  return ref;
}

function handleClick(ad: Advertisement) {
  void recordAdEvent(ad.id, "click").catch(() => undefined);
}

export function AdSlot({ ad, className }: { ad: Advertisement; className?: string }) {
  const ref = useImpression(ad);
  if (!ad.image_url) return null;

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <p className="kicker mb-2 text-[0.625rem]">Advertisement</p>
      <a
        href={ad.target_url ?? "#"}
        target="_blank"
        rel="noreferrer noopener sponsored"
        onClick={() => handleClick(ad)}
        className="block overflow-hidden border border-border bg-paper transition-opacity hover:opacity-95"
      >
        <img
          src={ad.image_url}
          alt={ad.title}
          loading="lazy"
          className="h-auto w-full object-cover"
        />
      </a>
    </div>
  );
}

export function StickyAd({ ad }: { ad: Advertisement }) {
  const ref = useImpression(ad);
  const [dismissed, setDismissed] = useState(false);
  if (dismissed || !ad.image_url) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-background/95 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-3 py-2 sm:px-6">
        <a
          href={ad.target_url ?? "#"}
          target="_blank"
          rel="noreferrer noopener sponsored"
          onClick={() => handleClick(ad)}
          className="min-w-0 flex-1 overflow-hidden"
        >
          <img
            src={ad.image_url}
            alt={ad.title}
            loading="lazy"
            className="h-12 w-full object-cover object-center sm:h-16"
          />
        </a>
        <button
          type="button"
          aria-label="Close advertisement"
          onClick={() => setDismissed(true)}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
