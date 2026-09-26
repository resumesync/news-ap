import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/admin-layout";
import { AdvertisementTable } from "@/components/admin/advertisement-table";
import { AdvertisementForm } from "@/components/admin/advertisement-form";
import { useAdsAdmin } from "@/hooks/use-ads";
import { useSettings } from "@/hooks/use-settings";
import { Plus, Sliders } from "lucide-react";
import type { Advertisement } from "@/data/types";

export const Route = createFileRoute("/admin/ads")({
  component: AdminAds,
});

function AdminAds() {
  const { allAds, addAd, editAd, removeAd, toggleStatus } = useAdsAdmin();
  const { settings, update: updateSettings } = useSettings();
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenAdd = () => {
    setEditingAd(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (ad: Advertisement) => {
    setEditingAd(ad);
    setIsFormOpen(true);
  };

  const handleSave = (data: Omit<Advertisement, "id" | "impressions" | "clicks">) => {
    if (editingAd) {
      editAd(editingAd.id, data);
    } else {
      addAd(data);
    }
  };

  return (
    <AdminLayout
      title="Advertisement Management"
      description="Manage partner campaigns, placements, and feed interleaving frequencies"
      action={
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 bg-brand hover:bg-brand/90 text-white px-3.5 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>New Campaign</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Global Ad Frequency Notice Card */}
        <div className="bg-white border border-rule/80 rounded-xs p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xs bg-amber-50 text-amber-700 border border-amber-200">
              <Sliders className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Feed Ad Frequency Engine: Every {settings.defaultAdFrequency} News Articles
              </p>
              <p className="text-[11px] text-muted-foreground">
                Active status: {settings.adsEnabled ? "Enabled" : "Disabled (All ads hidden)"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground">
              Quick Frequency:
            </label>
            <select
              value={settings.defaultAdFrequency}
              onChange={(e) =>
                updateSettings({ defaultAdFrequency: Number(e.target.value) || 4 })
              }
              className="bg-[#fbfbfa] border border-rule rounded-xs px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-brand"
            >
              <option value={2}>Every 2 news</option>
              <option value={3}>Every 3 news</option>
              <option value={4}>Every 4 news (Default)</option>
              <option value={5}>Every 5 news</option>
              <option value={10}>Every 10 news</option>
            </select>
          </div>
        </div>

        {/* Advertisements Table */}
        <AdvertisementTable
          ads={allAds}
          onEdit={handleOpenEdit}
          onDelete={removeAd}
          onToggleStatus={toggleStatus}
          onAddNew={handleOpenAdd}
        />

        {/* Advertisement Form Modal */}
        {isFormOpen && (
          <AdvertisementForm
            initialData={editingAd}
            onSave={handleSave}
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </AdminLayout>
  );
}
