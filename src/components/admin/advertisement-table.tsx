import { useState } from "react";
import { Edit, Trash2, CheckCircle, XCircle, ExternalLink, Plus } from "lucide-react";
import type { Advertisement } from "@/data/types";
import { formatCount } from "@/lib/format";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AdvertisementTableProps {
  ads: Advertisement[];
  onEdit: (ad: Advertisement) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onAddNew: () => void;
}

export function AdvertisementTable({
  ads,
  onEdit,
  onDelete,
  onToggleStatus,
  onAddNew,
}: AdvertisementTableProps) {
  const [filterPosition, setFilterPosition] = useState<string>("all");

  const filteredAds = ads.filter((ad) => {
    if (filterPosition === "all") return true;
    return ad.position === filterPosition;
  });

  const handleDelete = (ad: Advertisement) => {
    if (window.confirm(`Delete advertisement campaign: "${ad.title}"?`)) {
      onDelete(ad.id);
      toast.success("Campaign removed");
    }
  };

  const handleToggle = (ad: Advertisement) => {
    onToggleStatus(ad.id);
    const next = ad.status === "active" ? "disabled" : "active";
    toast.success(`Campaign is now ${next}`);
  };

  return (
    <div className="bg-white border border-rule/80 rounded-xs shadow-xs overflow-hidden">
      {/* Table toolbar */}
      <div className="p-4 border-b border-rule flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="ad-filter-position" className="text-xs text-muted-foreground font-medium whitespace-nowrap">
            Filter Position:
          </label>
          <select
            id="ad-filter-position"
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="bg-[#fbfbfa] border border-rule/80 rounded-xs px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:border-brand"
          >
            <option value="all">All Placements ({ads.length})</option>
            <option value="NEWS_BANNER">NEWS_BANNER (Every News Story)</option>
            <option value="TOP">TOP (Masthead Banner)</option>
            <option value="BETWEEN_NEWS">BETWEEN_NEWS (Interleaved)</option>
            <option value="ARTICLE_MIDDLE">ARTICLE_MIDDLE (In-Story)</option>
            <option value="BOTTOM">BOTTOM (Page Foot)</option>
            <option value="STICKY_BOTTOM">STICKY_BOTTOM (Floating)</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onAddNew}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-brand hover:bg-brand/90 text-white px-3.5 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>New Campaign</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-[#f8f7f4] border-b border-rule text-muted-foreground uppercase tracking-wider text-[11px] font-semibold">
            <tr>
              <th className="py-3 px-4 w-20">Creative</th>
              <th className="py-3 px-4 min-w-[220px]">Campaign / Sponsor</th>
              <th className="py-3 px-3">Position</th>
              <th className="py-3 px-3 text-center">Frequency</th>
              <th className="py-3 px-3 text-right">Impressions</th>
              <th className="py-3 px-3 text-right">Clicks</th>
              <th className="py-3 px-3 text-right">CTR</th>
              <th className="py-3 px-3 whitespace-nowrap">Flight Dates</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-4 text-right min-w-[100px]">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-rule/60">
            {filteredAds.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-muted-foreground text-sm">
                  No advertising campaigns found.
                </td>
              </tr>
            ) : (
              filteredAds.map((ad) => {
                const ctr = ((ad.clicks / Math.max(1, ad.impressions)) * 100).toFixed(2);

                return (
                  <tr key={ad.id} className="hover:bg-secondary/40 transition-colors">
                    {/* Creative image */}
                    <td className="py-2.5 px-4">
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="h-10 w-16 object-cover rounded-xs border border-rule/60"
                      />
                    </td>

                    {/* Title & Target */}
                    <td className="py-2.5 px-4">
                      <div className="font-semibold text-foreground line-clamp-1">{ad.title}</div>
                      {ad.targetUrl && (
                        <a
                          href={ad.targetUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-muted-foreground hover:text-brand truncate max-w-xs flex items-center gap-1 mt-0.5"
                        >
                          <span className="truncate">{ad.targetUrl}</span>
                          <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                        </a>
                      )}
                    </td>

                    {/* Position */}
                    <td className="py-2.5 px-3">
                      <span className="inline-block px-2 py-0.5 rounded-xs text-[10px] font-mono font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200">
                        {ad.position}
                      </span>
                    </td>

                    {/* Frequency */}
                    <td className="py-2.5 px-3 text-center font-mono">
                      {ad.position === "BETWEEN_NEWS" ? (
                        <span className="font-semibold text-foreground">Every {ad.frequency}</span>
                      ) : ad.position === "NEWS_BANNER" ? (
                        <span className="font-semibold text-rose-600">Every News</span>
                      ) : (
                        <span className="text-muted-foreground/50">—</span>
                      )}
                    </td>

                    {/* Impressions */}
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-foreground">
                      {formatCount(ad.impressions)}
                    </td>

                    {/* Clicks */}
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-brand font-semibold">
                      {formatCount(ad.clicks)}
                    </td>

                    {/* CTR */}
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-emerald-700 font-semibold">
                      {ctr}%
                    </td>

                    {/* Flight dates */}
                    <td className="py-2.5 px-3 whitespace-nowrap text-muted-foreground text-[11px]">
                      {ad.startDate || "Ongoing"} → {ad.endDate || "Ongoing"}
                    </td>

                    {/* Status */}
                    <td className="py-2.5 px-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[10px] uppercase font-semibold tracking-wider",
                          ad.status === "active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-neutral-100 text-neutral-500 border border-neutral-300",
                        )}
                      >
                        {ad.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-2.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => onEdit(ad)}
                          className="p-1 text-muted-foreground hover:text-brand hover:bg-secondary rounded-xs cursor-pointer"
                          title="Edit Campaign"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>

                        {/* Enable/Disable Toggle */}
                        <button
                          type="button"
                          onClick={() => handleToggle(ad)}
                          className={cn(
                            "p-1 rounded-xs transition-colors cursor-pointer",
                            ad.status === "active"
                              ? "text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
                              : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100",
                          )}
                          title={ad.status === "active" ? "Disable" : "Enable"}
                        >
                          {ad.status === "active" ? (
                            <CheckCircle className="h-3.5 w-3.5" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5" />
                          )}
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDelete(ad)}
                          className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xs cursor-pointer"
                          title="Delete Campaign"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
