import { getYouTubeEmbedUrl } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface NewsVideoProps {
  videoUrl?: string | null;
  title?: string;
  className?: string;
}

export function NewsVideo({ videoUrl, title = "News Video Coverage", className }: NewsVideoProps) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  if (!embedUrl) return null;

  return (
    <div className={cn("my-8 overflow-hidden rounded-sm border border-rule bg-black shadow-sm", className)}>
      <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900 px-4 py-2 text-xs text-neutral-300">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-brand animate-pulse" />
          <span className="font-semibold uppercase tracking-wider text-[11px]">Video Report</span>
        </div>
        <span className="text-[11px] text-neutral-400">EIGHT NEWS Video</span>
      </div>
      <div className="relative aspect-video w-full bg-black">
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}
