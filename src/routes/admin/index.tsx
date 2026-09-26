import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/admin-layout";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { AnalyticsCharts } from "@/components/admin/analytics-charts";
import { useNewsAdmin } from "@/hooks/use-news";
import { useAdsAdmin } from "@/hooks/use-ads";
import { PlusCircle, ExternalLink, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { allNews } = useNewsAdmin();
  const { allAds } = useAdsAdmin();

  // Aggregate metrics
  const totalNews = allNews.length;
  const totalViews = allNews.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const totalLikes = allNews.reduce((acc, curr) => acc + (curr.likes || 0), 0);
  const totalShares = allNews.reduce((acc, curr) => acc + (curr.shares || 0), 0);
  const totalAdImpressions = allAds.reduce((acc, curr) => acc + (curr.impressions || 0), 0);
  const totalAdClicks = allAds.reduce((acc, curr) => acc + (curr.clicks || 0), 0);

  const recentStories = allNews.slice(0, 5);

  return (
    <AdminLayout
      title="Editorial Dashboard"
      description="Real-time publication performance, reader reception, and sponsored reach"
      action={
        <Link
          to="/admin/news/new"
          className="inline-flex items-center gap-1.5 bg-brand hover:bg-brand/90 text-white px-3.5 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Article</span>
        </Link>
      }
    >
      <div className="space-y-8">
        {/* KPI Summary Cards */}
        <DashboardStats
          totalNews={totalNews}
          totalViews={totalViews}
          totalLikes={totalLikes}
          totalShares={totalShares}
          totalAdImpressions={totalAdImpressions}
          totalAdClicks={totalAdClicks}
        />

        {/* Analytics Charts */}
        <AnalyticsCharts news={allNews} ads={allAds} />

        {/* Recent Dispatches Desk Table */}
        <div className="bg-white border border-rule/80 rounded-xs p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-rule mb-4">
            <div>
              <h3 className="font-display text-base font-bold text-foreground">
                Recent Dispatches
              </h3>
              <p className="text-xs text-muted-foreground font-sans">
                Latest stories filed into the newsroom CMS
              </p>
            </div>
            <Link
              to="/admin/news"
              className="text-xs font-semibold text-brand hover:underline inline-flex items-center gap-1"
            >
              <span>View All ({allNews.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-rule/60">
            {recentStories.map((item) => (
              <div
                key={item.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-9 w-12 rounded-xs object-cover border border-rule/60 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground font-display text-sm truncate">
                      {item.title}
                    </p>
                    <p className="text-muted-foreground text-[11px]">
                      {formatDate(item.publishedDate)} • {item.author || "Staff"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 sm:justify-end text-[11px] font-mono">
                  <span className="text-muted-foreground">{item.views} views</span>
                  <span className="text-rose-700">{item.likes} likes</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-xs uppercase text-[10px] font-semibold ${
                      item.status === "published"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-neutral-100 text-neutral-600 border border-neutral-300"
                    }`}
                  >
                    {item.status}
                  </span>
                  <Link
                    to="/admin/news/$id/edit"
                    params={{ id: item.id }}
                    className="text-brand hover:underline font-sans font-medium"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
