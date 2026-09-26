import { createFileRoute } from "@tanstack/react-router";
import { SwipeFeed } from "@/components/swipe-feed";
import { useNewsList } from "@/hooks/use-news";
import { useAds } from "@/hooks/use-ads";
import { useSettings } from "@/hooks/use-settings";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { items: news } = useNewsList(false);
  const { ads } = useAds();
  const { settings } = useSettings();

  return (
    <div className="w-full h-[100svh] overflow-hidden bg-neutral-950">
      <SwipeFeed
        news={news}
        ads={ads}
        frequency={settings.defaultAdFrequency || 4}
        adsEnabled={settings.adsEnabled}
      />
    </div>
  );
}
