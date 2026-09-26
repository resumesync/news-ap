import { Newspaper, Eye, Heart, Share2, Megaphone, MousePointerClick } from "lucide-react";
import { formatCount } from "@/lib/format";

interface DashboardStatsProps {
  totalNews: number;
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  totalAdImpressions: number;
  totalAdClicks: number;
}

export function DashboardStats({
  totalNews,
  totalViews,
  totalLikes,
  totalShares,
  totalAdImpressions,
  totalAdClicks,
}: DashboardStatsProps) {
  const cards = [
    {
      title: "Total News",
      value: formatCount(totalNews),
      subtitle: "Published dispatches",
      icon: Newspaper,
      trend: "+3 this week",
      accent: "text-foreground",
    },
    {
      title: "Total Views",
      value: formatCount(totalViews),
      subtitle: "Verified reader sessions",
      icon: Eye,
      trend: "+18.4% vs last period",
      accent: "text-emerald-700",
    },
    {
      title: "Total Likes",
      value: formatCount(totalLikes),
      subtitle: "Reader appreciation",
      icon: Heart,
      trend: "+12.1% engagement",
      accent: "text-rose-700",
    },
    {
      title: "Total Shares",
      value: formatCount(totalShares),
      subtitle: "WhatsApp, X, Socials",
      icon: Share2,
      trend: "+24.8% virality",
      accent: "text-blue-700",
    },
    {
      title: "Ad Impressions",
      value: formatCount(totalAdImpressions),
      subtitle: "Sponsored views",
      icon: Megaphone,
      trend: "Optimal fill rate",
      accent: "text-amber-700",
    },
    {
      title: "Ad Clicks",
      value: formatCount(totalAdClicks),
      subtitle: "Direct partner traffic",
      icon: MousePointerClick,
      trend: `${((totalAdClicks / Math.max(1, totalAdImpressions)) * 100).toFixed(2)}% CTR`,
      accent: "text-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white border border-rule/80 rounded-xs p-4 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider font-sans">
                  {card.title}
                </span>
                <Icon className="h-4 w-4 opacity-75" />
              </div>

              <div className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                {card.value}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-rule/40 flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground truncate">{card.subtitle}</span>
              <span className={`font-semibold shrink-0 ${card.accent}`}>{card.trend}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
