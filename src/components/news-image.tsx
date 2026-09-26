import { useState } from "react";
import { cn } from "@/lib/utils";

interface NewsImageProps {
  src?: string | null;
  alt: string;
  caption?: string;
  className?: string;
  aspectRatio?: "video" | "wide" | "square" | "portrait" | "auto";
  priority?: boolean;
}

export function NewsImage({
  src,
  alt,
  caption,
  className,
  aspectRatio = "video",
  priority = false,
}: NewsImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fallback =
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80";
  const imageSource = hasError || !src ? fallback : src;

  const ratioClass = {
    video: "aspect-[16/10]",
    wide: "aspect-[21/9]",
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    auto: "aspect-auto",
  }[aspectRatio];

  return (
    <figure className={cn("group block overflow-hidden bg-muted/40", className)}>
      <div className={cn("relative w-full overflow-hidden", ratioClass)}>
        {/* Placeholder skeleton before load */}
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-muted/60" />
        )}
        <img
          src={imageSource}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs italic text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
