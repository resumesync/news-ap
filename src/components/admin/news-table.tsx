import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Eye,
  Edit,
  Trash2,
  Play,
  CheckCircle,
  XCircle,
  ExternalLink,
  Search,
} from "lucide-react";
import type { NewsItem } from "@/data/types";
import { formatDate, formatCount } from "@/lib/format";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface NewsTableProps {
  news: NewsItem[];
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => void;
}

export function NewsTable({ news, onDelete, onTogglePublish }: NewsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteClick = (item: NewsItem) => {
    if (window.confirm(`Are you sure you want to permanently delete: "${item.title}"?`)) {
      onDelete(item.id);
      toast.success("News dispatch deleted");
    }
  };

  const handlePublishToggleClick = (item: NewsItem) => {
    onTogglePublish(item.id);
    const next = item.status === "published" ? "unpublished" : "published";
    toast.success(`Dispatch status changed to ${next}`);
  };

  return (
    <div className="bg-white border border-rule/80 rounded-xs shadow-xs overflow-hidden">
      {/* Search & Filter Toolbar */}
      <div className="p-4 border-b border-rule flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by headline or keywords..."
            className="w-full bg-[#fbfbfa] border border-rule/80 rounded-xs pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand"
          />
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#fbfbfa] border border-rule/80 rounded-xs px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:border-brand"
          >
            <option value="all">All Status ({news.length})</option>
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-[#f8f7f4] border-b border-rule text-muted-foreground uppercase tracking-wider text-[11px] font-semibold">
            <tr>
              <th className="py-3 px-4 w-16">Image</th>
              <th className="py-3 px-4 min-w-[280px]">Headline</th>
              <th className="py-3 px-4 whitespace-nowrap">Date</th>
              <th className="py-3 px-3 text-right">Views</th>
              <th className="py-3 px-3 text-right">Likes</th>
              <th className="py-3 px-3 text-right">Shares</th>
              <th className="py-3 px-3 text-center">Video</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right min-w-[140px]">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-rule/60">
            {filteredNews.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-muted-foreground text-sm">
                  No dispatches matching filter criteria.
                </td>
              </tr>
            ) : (
              filteredNews.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-secondary/40 transition-colors group"
                >
                  {/* Image */}
                  <td className="py-2.5 px-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-10 w-14 object-cover rounded-xs border border-rule/60"
                    />
                  </td>

                  {/* Title & Slug */}
                  <td className="py-2.5 px-4">
                    <div className="font-semibold text-foreground font-telugu text-sm group-hover:text-brand transition-colors line-clamp-1">
                      {item.titleTe || item.title}
                    </div>
                    <div className="text-[11px] text-muted-foreground truncate max-w-md">
                      /news/{item.slug}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-2.5 px-4 whitespace-nowrap text-muted-foreground">
                    {formatDate(item.publishedDate)}
                  </td>

                  {/* Views */}
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-foreground">
                    {formatCount(item.views)}
                  </td>

                  {/* Likes */}
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-rose-700">
                    {formatCount(item.likes)}
                  </td>

                  {/* Shares */}
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-blue-700">
                    {formatCount(item.shares)}
                  </td>

                  {/* Video Indicator */}
                  <td className="py-2.5 px-3 text-center">
                    {item.videoUrl ? (
                      <span className="inline-grid h-5 w-5 place-items-center bg-brand/10 text-brand rounded-xs mx-auto" title="Video attached">
                        <Play className="h-3 w-3 fill-current" />
                      </span>
                    ) : (
                      <span className="text-muted-foreground/40">—</span>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="py-2.5 px-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[10px] uppercase font-semibold tracking-wider",
                        item.status === "published"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : item.status === "unpublished"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-neutral-100 text-neutral-600 border border-neutral-300",
                      )}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-2.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* View public */}
                      <Link
                        to="/news/$slug"
                        params={{ slug: item.slug }}
                        target="_blank"
                        className="p-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xs"
                        title="View Public Story"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>

                      {/* Edit */}
                      <Link
                        to="/admin/news/$id/edit"
                        params={{ id: item.id }}
                        className="p-1 text-muted-foreground hover:text-brand hover:bg-secondary rounded-xs"
                        title="Edit Article"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Link>

                      {/* Publish / Unpublish Toggle */}
                      <button
                        type="button"
                        onClick={() => handlePublishToggleClick(item)}
                        className={cn(
                          "p-1 rounded-xs transition-colors cursor-pointer",
                          item.status === "published"
                            ? "text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                        )}
                        title={
                          item.status === "published"
                            ? "Click to unpublish"
                            : "Click to publish"
                        }
                      >
                        {item.status === "published" ? (
                          <CheckCircle className="h-3.5 w-3.5" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5" />
                        )}
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(item)}
                        className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xs cursor-pointer"
                        title="Delete article"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
