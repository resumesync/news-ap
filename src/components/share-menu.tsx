import { useState } from "react";
import { Share2, Link2, Check, ExternalLink, Send } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCompactCount } from "@/lib/format";
import { cn } from "@/lib/utils";

interface ShareMenuProps {
  url?: string;
  title: string;
  description?: string;
  sharesCount?: number;
  onShareTrack?: (channel: string) => void;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "rail";
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  className?: string;
  showCount?: boolean;
  label?: string;
}

export function ShareMenu({
  url: customUrl,
  title,
  description,
  sharesCount,
  onShareTrack,
  size = "sm",
  variant = "default",
  align,
  side,
  sideOffset,
  className,
  showCount = true,
  label = "షేర్",
}: ShareMenuProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (customUrl) return customUrl;
    if (typeof window !== "undefined") return window.location.href;
    return "https://eightnews.in";
  };

  const shareUrl = getShareUrl();

  const handleShareClick = (channel: string, shareAction: () => void) => {
    onShareTrack?.(channel);
    shareAction();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("లింక్ కాపీ చేయబడింది", {
        description: "మీరు ఇప్పుడు ఈ వార్తను ఎవరికైనా షేర్ చేయవచ్చు.",
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("లింక్ కాపీ చేయడం విఫలమైంది");
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`${title}\n\nపూర్తి వివరాలు EIGHT NEWS లో చూడండి:\n${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleX = () => {
    const text = encodeURIComponent(`${title}\n@EightNews ద్వారా:\n`);
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: shareUrl,
        });
      } catch {
        // user dismissed
      }
    } else {
      handleCopyLink();
    }
  };

  const canNativeShare = typeof navigator !== "undefined" && "share" in navigator;
  const isRail = variant === "rail";

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3 py-1.5 text-sm gap-2",
    lg: "px-4 py-2 text-base gap-2.5",
  }[size];

  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }[size];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
          }}
          aria-label="వార్తను షేర్ చేయండి"
          className={
            isRail
              ? cn(
                  "w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-black/60 hover:bg-black/80 text-white/95 border border-white/20 shadow-lg backdrop-blur-md transition-all duration-150 group-hover:scale-105 active:scale-90 group-hover:border-white/40 cursor-pointer focus:outline-none",
                  className,
                )
              : cn(
                  "group inline-flex items-center justify-center rounded-sm border border-border bg-paper text-muted-foreground transition-all duration-200 hover:border-brand/40 hover:text-brand hover:bg-secondary/40 font-sans cursor-pointer select-none",
                  sizeClasses,
                  className,
                )
          }
        >
          {isRail ? (
            <Send className="w-5 h-5 sm:w-5.5 sm:h-5.5 -rotate-12 translate-x-[-1px] translate-y-[0.5px] stroke-[2.2] transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6" />
          ) : (
            <Share2 className={cn(iconSizes, "transition-transform duration-200 group-hover:scale-110")} />
          )}
          {!isRail && label && <span className="font-sans font-medium">{label}</span>}
          {!isRail && showCount && sharesCount !== undefined && (
            <span className="tabular-nums font-mono">{formatCompactCount(sharesCount)}</span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align ?? (isRail ? "start" : "end")}
        side={side ?? (isRail ? "right" : "bottom")}
        sideOffset={sideOffset ?? (isRail ? 14 : 4)}
        collisionPadding={12}
        className={cn(
          "w-60 p-2 shadow-2xl rounded-2xl border z-50 font-sans backdrop-blur-2xl animate-in fade-in-50 zoom-in-95",
          isRail
            ? "bg-neutral-950/95 border-white/15 text-white"
            : "bg-paper border-rule text-foreground",
        )}
      >
        <div
          className={cn(
            "px-2.5 py-1.5 text-xs font-semibold border-b mb-1 flex items-center justify-between font-sans",
            isRail ? "text-neutral-400 border-white/10" : "text-muted-foreground border-rule",
          )}
        >
          <span>వార్తను షేర్ చేయండి</span>
          <Send className="w-3.5 h-3.5 opacity-60" />
        </div>

        {/* WhatsApp */}
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleShareClick("whatsapp", handleWhatsApp);
          }}
          className={cn(
            "cursor-pointer gap-3 py-2 px-2.5 rounded-xl transition-colors",
            isRail ? "hover:bg-white/10 text-white" : "hover:bg-secondary",
          )}
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#25D366] text-white font-bold text-xs shadow-sm shrink-0">
            W
          </span>
          <span className="font-medium text-sm">వాట్సాప్ (WhatsApp)</span>
        </DropdownMenuItem>

        {/* Facebook */}
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleShareClick("facebook", handleFacebook);
          }}
          className={cn(
            "cursor-pointer gap-3 py-2 px-2.5 rounded-xl transition-colors",
            isRail ? "hover:bg-white/10 text-white" : "hover:bg-secondary",
          )}
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1877F2] text-white font-bold text-xs shadow-sm shrink-0">
            f
          </span>
          <span className="font-medium text-sm">ఫేస్‌బుక్ (Facebook)</span>
        </DropdownMenuItem>

        {/* X / Twitter */}
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleShareClick("x", handleX);
          }}
          className={cn(
            "cursor-pointer gap-3 py-2 px-2.5 rounded-xl transition-colors",
            isRail ? "hover:bg-white/10 text-white" : "hover:bg-secondary",
          )}
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-black text-white font-bold text-xs border border-white/20 shadow-sm shrink-0">
            𝕏
          </span>
          <span className="font-medium text-sm">ఎక్స్ (Twitter)</span>
        </DropdownMenuItem>

        {/* Copy Link */}
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleShareClick("copy", handleCopyLink);
          }}
          className={cn(
            "cursor-pointer gap-3 py-2 px-2.5 rounded-xl transition-colors",
            isRail ? "hover:bg-white/10 text-white" : "hover:bg-secondary",
          )}
        >
          <span
            className={cn(
              "grid h-7 w-7 place-items-center rounded-full shadow-sm shrink-0",
              isRail ? "bg-neutral-800 text-neutral-200" : "bg-muted text-foreground",
            )}
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Link2 className="h-3.5 w-3.5" />}
          </span>
          <span className="font-medium text-sm">{copied ? "కాపీ చేయబడింది!" : "లింక్ కాపీ చేయండి"}</span>
        </DropdownMenuItem>

        {/* Native Share */}
        {canNativeShare && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleShareClick("native", handleNativeShare);
            }}
            className={cn(
              "cursor-pointer gap-3 py-2 px-2.5 rounded-xl transition-colors border-t mt-1",
              isRail ? "border-white/10 hover:bg-white/10 text-white" : "border-rule hover:bg-secondary",
            )}
          >
            <span
              className={cn(
                "grid h-7 w-7 place-items-center rounded-full shadow-sm shrink-0",
                isRail ? "bg-neutral-800 text-neutral-200" : "bg-muted text-foreground",
              )}
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </span>
            <span className="font-medium text-sm">మరిన్ని ఆప్షన్లు (More)</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
