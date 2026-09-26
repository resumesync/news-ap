import { useState, useEffect, useCallback } from "react";
import type { SiteSettings } from "@/data/types";
import { getStoredSettings, updateStoredSettings } from "@/lib/storage";

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(() => getStoredSettings());

  const refresh = useCallback(() => {
    setSettings(getStoredSettings());
  }, []);

  useEffect(() => {
    refresh();
    const handleDataChange = () => refresh();
    window.addEventListener("eight_news_data_changed", handleDataChange);
    return () => window.removeEventListener("eight_news_data_changed", handleDataChange);
  }, [refresh]);

  const update = useCallback(
    (updates: Partial<SiteSettings>) => {
      const updated = updateStoredSettings(updates);
      setSettings(updated);
      return updated;
    },
    [],
  );

  return { settings, update, refresh };
}
