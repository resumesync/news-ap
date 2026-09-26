import { useState } from "react";
import { X, Save } from "lucide-react";
import type { Advertisement, AdPosition } from "@/data/types";
import { toast } from "sonner";

interface AdvertisementFormProps {
  initialData?: Advertisement | null;
  onSave: (data: Omit<Advertisement, "id" | "impressions" | "clicks">) => void;
  onClose: () => void;
}

export function AdvertisementForm({
  initialData,
  onSave,
  onClose,
}: AdvertisementFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [image, setImage] = useState(
    initialData?.image ||
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&h=300&q=80",
  );
  const [targetUrl, setTargetUrl] = useState(initialData?.targetUrl || "");
  const [sponsorName, setSponsorName] = useState(initialData?.sponsorName || "");
  const [position, setPosition] = useState<AdPosition>(initialData?.position || "BETWEEN_NEWS");

  // Frequency options: 2, 3, 4, 5, 10, Custom
  const initialFreq = initialData?.frequency || 4;
  const isPresetFreq = [2, 3, 4, 5, 10].includes(initialFreq);
  const [frequencySelect, setFrequencySelect] = useState<string>(
    isPresetFreq ? String(initialFreq) : "custom",
  );
  const [customFrequency, setCustomFrequency] = useState<number>(initialFreq);

  const [startDate, setStartDate] = useState(initialData?.startDate || "2026-01-01");
  const [endDate, setEndDate] = useState(initialData?.endDate || "2026-12-31");
  const [status, setStatus] = useState<"active" | "disabled">(initialData?.status || "active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Campaign title is required");
      return;
    }
    if (!image.trim()) {
      toast.error("Creative image URL is required");
      return;
    }

    const resolvedFrequency =
      frequencySelect === "custom"
        ? Math.max(1, Number(customFrequency) || 4)
        : Number(frequencySelect) || 4;

    onSave({
      title: title.trim(),
      image: image.trim(),
      targetUrl: targetUrl.trim() || "#",
      sponsorName: sponsorName.trim() || undefined,
      position,
      frequency: resolvedFrequency,
      startDate,
      endDate,
      status,
    });

    toast.success(initialData ? "Advertisement updated" : "New advertisement created");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-rule w-full max-w-2xl rounded-xs shadow-2xl overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#1c1917] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold">
              {initialData ? "Edit Advertisement Campaign" : "New Advertisement Placement"}
            </h2>
            <p className="text-[11px] text-neutral-400 font-sans">
              Configure sponsored banners and interleaving frequency
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-xs transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Campaign Title & Sponsor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="ad-title"
                className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1"
              >
                Campaign Title *
              </label>
              <input
                id="ad-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Tata Clean Mobility 2026"
                required
                className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label
                htmlFor="ad-sponsor-name"
                className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1"
              >
                Sponsor Brand / Label
              </label>
              <input
                id="ad-sponsor-name"
                type="text"
                value={sponsorName}
                onChange={(e) => setSponsorName(e.target.value)}
                placeholder="e.g. Tata Motors"
                className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-brand"
              />
            </div>
          </div>

          {/* Image URL & Live Preview */}
          <div>
            <label
              htmlFor="ad-image-url"
              className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1"
            >
              Creative Banner Image URL *
            </label>
            <input
              id="ad-image-url"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              required
              className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-brand"
            />
            {image && (
              <div className="mt-2 rounded-xs overflow-hidden border border-rule bg-muted max-h-32">
                <img src={image} alt="Creative Preview" className="h-full w-full object-cover" />
              </div>
            )}
          </div>

          {/* Target URL */}
          <div>
            <label
              htmlFor="ad-target-url"
              className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1"
            >
              Target Click URL (Destination)
            </label>
            <input
              id="ad-target-url"
              type="url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-brand"
            />
          </div>

          {/* Position & Ad Frequency Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-rule">
            <div>
              <label
                htmlFor="ad-position"
                className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1"
              >
                Placement Position
              </label>
              <select
                id="ad-position"
                value={position}
                onChange={(e) => setPosition(e.target.value as AdPosition)}
                className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs font-semibold focus:outline-none focus:border-brand"
              >
                <option value="TOP">TOP (Masthead Banner)</option>
                <option value="BETWEEN_NEWS">BETWEEN_NEWS (Interleaved in Feed)</option>
                <option value="ARTICLE_MIDDLE">ARTICLE_MIDDLE (In-Article Body)</option>
                <option value="BOTTOM">BOTTOM (Page Footer Banner)</option>
                <option value="STICKY_BOTTOM">STICKY_BOTTOM (Floating Bottom Bar)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="ad-frequency"
                className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1"
              >
                Ad Frequency (Show after X news)
              </label>
              <div className="flex gap-2">
                <select
                  id="ad-frequency"
                  value={frequencySelect}
                  onChange={(e) => setFrequencySelect(e.target.value)}
                  className="flex-1 bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs font-semibold focus:outline-none focus:border-brand"
                >
                  <option value="2">Every 2 News</option>
                  <option value="3">Every 3 News</option>
                  <option value="4">Every 4 News (Standard)</option>
                  <option value="5">Every 5 News</option>
                  <option value="10">Every 10 News</option>
                  <option value="custom">Custom Frequency...</option>
                </select>
                {frequencySelect === "custom" && (
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={customFrequency}
                    onChange={(e) => setCustomFrequency(Number(e.target.value))}
                    className="w-20 bg-[#fbfbfa] border border-rule rounded-xs px-2.5 py-1 text-xs font-mono focus:outline-none focus:border-brand"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Dates & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-rule">
            <div>
              <label
                htmlFor="ad-start-date"
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                Start Date
              </label>
              <input
                id="ad-start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label
                htmlFor="ad-end-date"
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                End Date
              </label>
              <input
                id="ad-end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label
                htmlFor="ad-status"
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                Status
              </label>
              <select
                id="ad-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as "active" | "disabled")}
                className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-brand"
              >
                <option value="active">Active</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-rule flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground rounded-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white px-5 py-2 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
            >
              <Save className="h-4 w-4" />
              <span>Save Campaign</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
