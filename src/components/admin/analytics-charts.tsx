import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { NewsItem, Advertisement } from "@/data/types";
import { getShareStats } from "@/lib/storage";

interface AnalyticsChartsProps {
  news: NewsItem[];
  ads: Advertisement[];
}

export function AnalyticsCharts({ news, ads }: AnalyticsChartsProps) {
  // 1. Time-series data for Views, Likes, Shares
  const timeSeriesData = [
    { date: "Mon", views: 2420, likes: 190, shares: 75 },
    { date: "Tue", views: 3680, likes: 280, shares: 110 },
    { date: "Wed", views: 4920, likes: 410, shares: 185 },
    { date: "Thu", views: 6150, likes: 530, shares: 220 },
    { date: "Fri", views: 7890, likes: 690, shares: 310 },
    { date: "Sat", views: 9840, likes: 890, shares: 440 },
    { date: "Sun (Today)", views: 12450, likes: 1120, shares: 560 },
  ];

  // 2. Share channel distribution
  const shareStats = getShareStats();
  const channelData = [
    { channel: "WhatsApp", shares: shareStats.whatsapp || 320, fill: "#25D366" },
    { channel: "X / Twitter", shares: shareStats.x || 240, fill: "#000000" },
    { channel: "Copy Link", shares: shareStats.copy || 280, fill: "#525252" },
    { channel: "Facebook", shares: shareStats.facebook || 160, fill: "#1877F2" },
    { channel: "Native App", shares: shareStats.native || 110, fill: "#8b5cf6" },
  ];

  // 3. Advertisement Performance (Impressions vs Clicks)
  const adPerformanceData = ads.map((ad) => ({
    name: ad.title.length > 20 ? `${ad.title.slice(0, 18)}...` : ad.title,
    position: ad.position,
    impressions: ad.impressions,
    clicks: ad.clicks,
    ctr: Number(((ad.clicks / Math.max(1, ad.impressions)) * 100).toFixed(2)),
  }));

  // 4. Top stories performance
  const topStories = [...news]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
    .map((item) => ({
      title: item.title.length > 25 ? `${item.title.slice(0, 25)}...` : item.title,
      views: item.views,
      likes: item.likes,
    }));

  return (
    <div className="space-y-6">
      {/* 1. Daily Audience Growth & Engagement Trend */}
      <div className="bg-white border border-rule/80 rounded-xs p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">
              Audience Readership & Engagement Trend
            </h3>
            <p className="text-xs text-muted-foreground font-sans">
              Daily verified page views, reader likes, and community shares
            </p>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-xs font-semibold">
            +34% WoW Growth
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#851e1e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#851e1e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="likesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0efe9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#737373" }} />
              <YAxis tick={{ fontSize: 11, fill: "#737373" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#d4d4d4",
                  fontSize: "12px",
                  borderRadius: "2px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              <Area
                type="monotone"
                dataKey="views"
                name="Article Views"
                stroke="#851e1e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#viewsGrad)"
              />
              <Area
                type="monotone"
                dataKey="likes"
                name="Reader Likes"
                stroke="#059669"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#likesGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2-Column Grid: Share Distribution + Top Stories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Share Distribution */}
        <div className="bg-white border border-rule/80 rounded-xs p-5 shadow-xs">
          <h3 className="font-display text-lg font-bold text-foreground">
            Share Channels Distribution
          </h3>
          <p className="text-xs text-muted-foreground font-sans mb-4">
            Dispatches forwarded via instant messaging and social channels
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0efe9" />
                <XAxis dataKey="channel" tick={{ fontSize: 11, fill: "#737373" }} />
                <YAxis tick={{ fontSize: 11, fill: "#737373" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#d4d4d4",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="shares" name="Total Shares" fill="#851e1e" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 5 Dispatches */}
        <div className="bg-white border border-rule/80 rounded-xs p-5 shadow-xs">
          <h3 className="font-display text-lg font-bold text-foreground">
            Top Dispatches by Readership
          </h3>
          <p className="text-xs text-muted-foreground font-sans mb-4">
            Highest read stories across print & digital editions
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topStories}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0efe9" />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#737373" }} />
                <YAxis
                  dataKey="title"
                  type="category"
                  width={110}
                  tick={{ fontSize: 10, fill: "#525252" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#d4d4d4",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="views" name="Page Views" fill="#1c1917" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Advertisement Performance Breakdown */}
      <div className="bg-white border border-rule/80 rounded-xs p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">
              Advertisement Campaign Delivery & CTR
            </h3>
            <p className="text-xs text-muted-foreground font-sans">
              Impressions delivered and conversion clicks by placement slot
            </p>
          </div>
          <span className="text-xs font-mono font-medium text-muted-foreground">
            {ads.length} Active Campaigns
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={adPerformanceData}
              margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0efe9" />
              <XAxis
                dataKey="name"
                angle={-15}
                textAnchor="end"
                tick={{ fontSize: 10, fill: "#737373" }}
              />
              <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "#737373" }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: "#737373" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#d4d4d4",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar
                yAxisId="left"
                dataKey="impressions"
                name="Impressions"
                fill="#d4d4d4"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                yAxisId="right"
                dataKey="clicks"
                name="Direct Clicks"
                fill="#851e1e"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
