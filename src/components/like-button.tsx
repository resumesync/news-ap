import { useState } from "react";
import { Heart } from "lucide-react";
import { formatCompactCount } from "@/lib/format";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  initialCount: number;
  initialLiked: boolean;
  onToggle: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  showCount?: boolean;
  label?: string;
}

export function LikeButton({
  initialCount,
  initialLiked,
  onToggle,
  size = "sm",
  className,
  showCount = true,
  label = "లైక్",
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  // Sync if props change externally
  if (initialLiked !== isLiked && Math.abs(initialCount - count) > 1) {
    setIsLiked(initialLiked);
    setCount(initialCount);
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setCount((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));
    onToggle();
  };

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
    <button
      type="button"
      onClick={handleClick}
      aria-label={isLiked ? "లైక్ తొలగించండి" : "లైక్ చేయండి"}
      className={cn(
        "group inline-flex items-center justify-center rounded-sm border transition-all duration-200 font-sans cursor-pointer select-none",
        isLiked
          ? "border-brand bg-brand/10 text-brand font-medium shadow-xs"
          : "border-border bg-paper text-muted-foreground hover:border-brand/40 hover:text-brand hover:bg-secondary/40",
        sizeClasses,
        className,
      )}
    >
      <Heart
        className={cn(
          iconSizes,
          "transition-transform duration-200 group-hover:scale-110",
          isLiked ? "fill-brand text-brand" : "text-current",
        )}
      />
      {label && <span className="font-sans font-medium">{label}</span>}
      {showCount && <span className="tabular-nums font-mono">{formatCompactCount(count)}</span>}
    </button>
  );
}
