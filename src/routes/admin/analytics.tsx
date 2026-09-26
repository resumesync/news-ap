import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/admin-layout";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { AnalyticsCharts } from "@/components/admin/analytics-charts";
import { useNewsAdmin } from "@/hooks/use-news";
import { useAdsAdmin } from "@/hooks/use-ads";

export const Route = createFileRoute("/admin/analytics")({
  component: AdminAnalytics,
});

function AdminAnalytics() {
  const { allNews } = useNewsAdmin();
  const { allAds } = useAdsAdmin();

  const totalNews = allNews.length;
  const totalViews = allNews.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const totalLikes = allNews.reduce((acc, curr) => acc + (curr.likes || 0), 0);
  const totalShares = allNews.reduce((acc, curr) => acc + (curr.shares || 0), 0);
  const totalAdImpressions = allAds.reduce((acc, curr) => acc + (curr.impressions || 0), 0);
  const totalAdClicks = allAds.reduce((acc, curr) => acc + (curr.clicks || 0), 0);

  return (
    <AdminLayout
      title="Publication Analytics"
      description="Deep-dive readership reach, reader appreciation, and advertising engagement"
    >
      <div className="space-y-8">
        <DashboardStats
          totalNews={totalNews}
          totalViews={totalViews}
          totalLikes={totalLikes}
          totalShares={totalShares}
          totalAdImpressions={totalAdImpressions}
          totalAdClicks={totalAdClicks}
        />

        <AnalyticsCharts news={allNews} ads={allAds} />
      </div>
    </AdminLayout>
  );
}
