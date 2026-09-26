import { Eye } from "lucide-react";
import { formatCount } from "@/lib/format";
import { cn } from "@/lib/utils";

interface ViewCounterProps {
  views: number;
  className?: string;
  showIcon?: boolean;
}

export function ViewCounter({ views, className, showIcon = true }: ViewCounterProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs text-muted-foreground tabular-nums",
        className,
      )}
      title={`${formatCount(views)} readers`}
    >
      {showIcon && <Eye className="h-3.5 w-3.5 opacity-70" />}
      <span>{formatCount(views)}</span>
    </span>
  );
}
