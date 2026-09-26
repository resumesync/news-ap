import { useState } from "react";
import { Save, RefreshCw } from "lucide-react";
import type { SiteSettings } from "@/data/types";
import { toast } from "sonner";

interface SettingsFormProps {
  settings: SiteSettings;
  onSave: (updates: Partial<SiteSettings>) => void;
}

export function SettingsForm({ settings, onSave }: SettingsFormProps) {
  const [siteName, setSiteName] = useState(settings.siteName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl || "");
  const [faviconUrl, setFaviconUrl] = useState(settings.faviconUrl || "");

  // Default ad frequency options: 2, 3, 4, 5, 10, Custom
  const initialFreq = settings.defaultAdFrequency || 4;
  const isPresetFreq = [2, 3, 4, 5, 10].includes(initialFreq);
  const [freqSelect, setFreqSelect] = useState<string>(
    isPresetFreq ? String(initialFreq) : "custom",
  );
  const [customFreq, setCustomFreq] = useState<number>(initialFreq);
  const [adsEnabled, setAdsEnabled] = useState(settings.adsEnabled);

  // Social Links
  const [facebookUrl, setFacebookUrl] = useState(settings.facebookUrl);
  const [xUrl, setXUrl] = useState(settings.xUrl);
  const [instagramUrl, setInstagramUrl] = useState(settings.instagramUrl);
  const [whatsappUrl, setWhatsappUrl] = useState(settings.whatsappUrl);

  // Contacts
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [contactPhone, setContactPhone] = useState(settings.contactPhone);
  const [contactAddress, setContactAddress] = useState(settings.contactAddress);

  // Theme Settings
  const [theme, setTheme] = useState<"ivory" | "white" | "dark">(settings.theme || "ivory");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const resolvedFreq =
      freqSelect === "custom"
        ? Math.max(1, Number(customFreq) || 4)
        : Number(freqSelect) || 4;

    onSave({
      siteName: siteName.trim() || "EIGHT NEWS",
      tagline: tagline.trim(),
      logoUrl: logoUrl.trim() || undefined,
      faviconUrl: faviconUrl.trim() || undefined,
      defaultAdFrequency: resolvedFreq,
      adsEnabled,
      facebookUrl: facebookUrl.trim(),
      xUrl: xUrl.trim(),
      instagramUrl: instagramUrl.trim(),
      whatsappUrl: whatsappUrl.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      contactAddress: contactAddress.trim(),
      theme,
    });

    toast.success("Publication settings saved successfully");
  };

  const handleResetToDefaults = () => {
    if (window.confirm("Reset settings to default values?")) {
      setSiteName("EIGHT NEWS");
      setTagline("The Independent Journal of Record");
      setLogoUrl("");
      setFaviconUrl("");
      setFreqSelect("4");
      setAdsEnabled(true);
      setTheme("ivory");
      toast.info("Settings reverted in form. Click Save to persist.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8 font-sans">
      {/* 1. Publication Identity */}
      <div className="bg-white border border-rule/80 rounded-xs p-6 shadow-xs space-y-4">
        <h3 className="font-display text-base font-bold text-foreground border-b border-rule pb-2">
          Publication Identity & Branding
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="settings-site-name"
              className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1"
            >
              Publication Name
            </label>
            <input
              id="settings-site-name"
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              required
              className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs font-semibold focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label
              htmlFor="settings-tagline"
              className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1"
            >
              Editorial Tagline / Subtitle
            </label>
            <input
              id="settings-tagline"
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-brand"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="settings-logo-url"
              className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1"
            >
              Custom Logo Image URL (Optional)
            </label>
            <input
              id="settings-logo-url"
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="Leave empty for iconic '8' monogram"
              className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label
              htmlFor="settings-favicon-url"
              className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1"
            >
              Favicon URL (Optional)
            </label>
            <input
              id="settings-favicon-url"
              type="url"
              value={faviconUrl}
              onChange={(e) => setFaviconUrl(e.target.value)}
              placeholder="/favicon.ico"
              className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-brand"
            />
          </div>
        </div>
      </div>

      {/* 2. Advertisement Frequency System */}
      <div className="bg-white border border-rule/80 rounded-xs p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <div>
            <h3 className="font-display text-base font-bold text-foreground">
              Advertisement Delivery & Frequency Engine
            </h3>
            <p className="text-xs text-muted-foreground font-sans">
              Control the exact interval for interleaving advertisements in the news feed
            </p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
            <input
              type="checkbox"
              checked={adsEnabled}
              onChange={(e) => setAdsEnabled(e.target.checked)}
              className="accent-brand h-4 w-4"
            />
            <span>Advertisements Enabled</span>
          </label>
        </div>

        <div className="pt-2">
          <label
            htmlFor="settings-ad-frequency"
            className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1.5"
          >
            Show advertisement after X news:
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <select
              id="settings-ad-frequency"
              value={freqSelect}
              onChange={(e) => setFreqSelect(e.target.value)}
              className="bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs font-semibold focus:outline-none focus:border-brand"
            >
              <option value="2">Show advertisement after every 2 news</option>
              <option value="3">Show advertisement after every 3 news</option>
              <option value="4">Show advertisement after every 4 news (Recommended)</option>
              <option value="5">Show advertisement after every 5 news</option>
              <option value="10">Show advertisement after every 10 news</option>
              <option value="custom">Custom Frequency...</option>
            </select>

            {freqSelect === "custom" && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={customFreq}
                  onChange={(e) => setCustomFreq(Number(e.target.value))}
                  className="w-24 bg-[#fbfbfa] border border-rule rounded-xs px-3 py-1.5 text-xs font-mono font-semibold focus:outline-none focus:border-brand"
                />
                <span className="text-xs text-muted-foreground">articles</span>
              </div>
            )}
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Current rule: The public news feed will interleave active sponsored campaigns at this interval.
          </p>
        </div>
      </div>

      {/* 3. Theme & Styling Mode */}
      <div className="bg-white border border-rule/80 rounded-xs p-6 shadow-xs space-y-4">
        <h3 className="font-display text-base font-bold text-foreground border-b border-rule pb-2">
          Editorial Color Scheme & Theme
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label
            className={`border rounded-xs p-3.5 flex flex-col justify-between cursor-pointer transition-all ${
              theme === "ivory"
                ? "border-brand bg-brand/5 shadow-xs"
                : "border-rule bg-[#fbfbfa] hover:border-rule/80"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-xs uppercase tracking-wider">
                Classic Warm Ivory
              </span>
              <input
                type="radio"
                name="theme"
                value="ivory"
                checked={theme === "ivory"}
                onChange={() => setTheme("ivory")}
                className="accent-brand"
              />
            </div>
            <p className="text-[11px] text-muted-foreground font-serif">
              Authentic newsprint feel with subtle warm-paper background and crimson accents.
            </p>
          </label>

          <label
            className={`border rounded-xs p-3.5 flex flex-col justify-between cursor-pointer transition-all ${
              theme === "white"
                ? "border-brand bg-brand/5 shadow-xs"
                : "border-rule bg-[#fbfbfa] hover:border-rule/80"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-xs uppercase tracking-wider">
                Pure Crisp White
              </span>
              <input
                type="radio"
                name="theme"
                value="white"
                checked={theme === "white"}
                onChange={() => setTheme("white")}
                className="accent-brand"
              />
            </div>
            <p className="text-[11px] text-muted-foreground font-serif">
              High-contrast digital magazine look with razor sharp typography.
            </p>
          </label>

          <label
            className={`border rounded-xs p-3.5 flex flex-col justify-between cursor-pointer transition-all ${
              theme === "dark"
                ? "border-brand bg-brand/5 shadow-xs"
                : "border-rule bg-[#fbfbfa] hover:border-rule/80"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-xs uppercase tracking-wider">
                Night Edition (Dark)
              </span>
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === "dark"}
                onChange={() => setTheme("dark")}
                className="accent-brand"
              />
            </div>
            <p className="text-[11px] text-muted-foreground font-serif">
              Deep charcoal background optimized for comfortable low-light evening reading.
            </p>
          </label>
        </div>
      </div>

      {/* 4. Social & Contact Details */}
      <div className="bg-white border border-rule/80 rounded-xs p-6 shadow-xs space-y-4">
        <h3 className="font-display text-base font-bold text-foreground border-b border-rule pb-2">
          Social Links & Bureau Contacts
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="settings-x-url"
              className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1"
            >
              X / Twitter Handle URL
            </label>
            <input
              id="settings-x-url"
              type="url"
              value={xUrl}
              onChange={(e) => setXUrl(e.target.value)}
              className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label
              htmlFor="settings-facebook-url"
              className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1"
            >
              Facebook Page URL
            </label>
            <input
              id="settings-facebook-url"
              type="url"
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
              className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label
              htmlFor="settings-instagram-url"
              className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1"
            >
              Instagram Profile URL
            </label>
            <input
              id="settings-instagram-url"
              type="url"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label
              htmlFor="settings-whatsapp-url"
              className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1"
            >
              WhatsApp Channel URL
            </label>
            <input
              id="settings-whatsapp-url"
              type="url"
              value={whatsappUrl}
              onChange={(e) => setWhatsappUrl(e.target.value)}
              className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-brand"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-rule/60">
          <div>
            <label
              htmlFor="settings-contact-email"
              className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1"
            >
              Editorial Contact Email
            </label>
            <input
              id="settings-contact-email"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label
              htmlFor="settings-contact-phone"
              className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1"
            >
              Newsroom Bureau Phone
            </label>
            <input
              id="settings-contact-phone"
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-brand"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="settings-contact-address"
              className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-1"
            >
              Bureau Office Address
            </label>
            <input
              id="settings-contact-address"
              type="text"
              value={contactAddress}
              onChange={(e) => setContactAddress(e.target.value)}
              className="w-full bg-[#fbfbfa] border border-rule rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-brand"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handleResetToDefaults}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Reset Form Defaults</span>
        </button>

        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white px-6 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
        >
          <Save className="h-4 w-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </form>
  );
}
