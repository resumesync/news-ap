import { useEffect, useState } from "react";
import { Check, Facebook, Heart, Link2, Share2, Twitter } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { hasLiked, recordShare, toggleLike, type NewsItem } from "@/lib/data";
import { formatCount } from "@/lib/format";
import { cn } from "@/lib/utils";

export function LikeButton({
  item,
  size = "sm",
}: {
  item: NewsItem;
  size?: "sm" | "lg";
}) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(item.likes);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setCount(item.likes);
    void hasLiked(item.id)
      .then(setLiked)
      .catch(() => undefined);
  }, [item.id, item.likes]);

  const onClick = async () => {
    if (busy) return;
    setBusy(true);
    const next = !liked;
    setLiked(next);
    setCount((c) => Math.max(0, c + (next ? 1 : -1)));
    try {
      await toggleLike(item.id, liked);
    } catch {
      setLiked(!next);
      setCount((c) => Math.max(0, c + (next ? -1 : 1)));
      toast.error("Could not register your like. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={liked}
      aria-label={liked ? "Remove like" : "Like this article"}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-sm border border-border bg-paper font-sans text-sm text-muted-foreground transition-colors hover:border-brand hover:text-brand",
        size === "lg" ? "px-4 py-2.5" : "px-2.5 py-1.5 text-xs",
        liked && "border-brand bg-brand-soft text-brand",
      )}
    >
      <Heart className={cn(size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5", liked && "fill-current")} />
      <span className="tabular-nums">{formatCount(count)}</span>
    </button>
  );
}

export function ShareMenu({
  item,
  size = "sm",
}: {
  item: NewsItem;
  size?: "sm" | "lg";
}) {
  const [copied, setCopied] = useState(false);
  const url =
    typeof window === "undefined" ? `/news/${item.slug}` : `${window.location.origin}/news/${item.slug}`;

  const track = (channel: string) => {
    void recordShare(item.id, channel).catch(() => undefined);
  };

  const open = (href: string, channel: string) => {
    track(channel);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const copy = async () => {
    track("copy");
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy the link");
    }
  };

  const native = async () => {
    track("native");
    try {
      await navigator.share({ title: item.title, text: item.short_description, url });
    } catch {
      /* dismissed */
    }
  };

  const canNativeShare = typeof navigator !== "undefined" && "share" in navigator;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Share this article"
          className={cn(
            "inline-flex shrink-0 items-center gap-2 rounded-sm border border-border bg-paper font-sans text-muted-foreground transition-colors hover:border-brand hover:text-brand",
            size === "lg" ? "px-4 py-2.5 text-sm" : "px-2.5 py-1.5 text-xs",
          )}
        >
          <Share2 className={size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5"} />
          <span>{size === "lg" ? "Share" : formatCount(item.shares)}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem
          onClick={() =>
            open(`https://wa.me/?text=${encodeURIComponent(`${item.title} ${url}`)}`, "whatsapp")
          }
        >
          <span className="mr-2 grid h-4 w-4 place-items-center text-xs font-bold">W</span>
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "facebook")
          }
        >
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            open(
              `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(item.title)}`,
              "x",
            )
          }
        >
          <Twitter className="mr-2 h-4 w-4" />X
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copy}>
          {copied ? <Check className="mr-2 h-4 w-4" /> : <Link2 className="mr-2 h-4 w-4" />}
          Copy link
        </DropdownMenuItem>
        {canNativeShare && (
          <DropdownMenuItem onClick={native}>
            <Share2 className="mr-2 h-4 w-4" />
            More options
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
