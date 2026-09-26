import { useState } from "react";
import { Share2, Link2, Check, ExternalLink } from "lucide-react";
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
          className={cn(
            "group inline-flex items-center justify-center rounded-sm border border-border bg-paper text-muted-foreground transition-all duration-200 hover:border-brand/40 hover:text-brand hover:bg-secondary/40 font-sans cursor-pointer select-none",
            sizeClasses,
            className,
          )}
        >
          <Share2 className={cn(iconSizes, "transition-transform duration-200 group-hover:scale-110")} />
          {label && <span className="font-sans font-medium">{label}</span>}
          {showCount && sharesCount !== undefined && (
            <span className="tabular-nums font-mono">{formatCompactCount(sharesCount)}</span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-xl border border-rule bg-paper">
        <div className="px-2 py-1.5 text-[11px] font-semibold text-muted-foreground border-b border-rule mb-1 font-sans">
          వార్తను షేర్ చేయండి
        </div>

        {/* WhatsApp */}
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleShareClick("whatsapp", handleWhatsApp);
          }}
          className="cursor-pointer gap-2.5 py-2 hover:bg-secondary"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-600 text-white font-bold text-[10px]">
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
          className="cursor-pointer gap-2.5 py-2 hover:bg-secondary"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#1877F2] text-white font-bold text-[10px]">
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
          className="cursor-pointer gap-2.5 py-2 hover:bg-secondary"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-black text-white font-bold text-[10px]">
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
          className="cursor-pointer gap-2.5 py-2 hover:bg-secondary"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-muted text-foreground">
            {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Link2 className="h-3 w-3" />}
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
            className="cursor-pointer gap-2.5 py-2 hover:bg-secondary border-t border-rule mt-1"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-muted text-foreground">
              <ExternalLink className="h-3 w-3" />
            </span>
            <span className="font-medium text-sm">మరిన్ని ఆప్షన్లు</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
