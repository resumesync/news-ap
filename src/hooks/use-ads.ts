import { useState, useEffect, useCallback } from "react";
import type { Advertisement, AdPosition } from "@/data/types";
import {
  getStoredAds,
  getActiveAds,
  createAd,
  updateAd,
  deleteAd,
  toggleAdStatus,
  recordAdImpression,
  recordAdClick,
  getAdById,
} from "@/lib/storage";

export function useAds(position?: AdPosition) {
  const [ads, setAds] = useState<Advertisement[]>(() =>
    position ? getActiveAds(position) : getStoredAds(),
  );

  const refresh = useCallback(() => {
    setAds(position ? getActiveAds(position) : getStoredAds());
  }, [position]);

  useEffect(() => {
    refresh();
    const handleDataChange = () => refresh();
    window.addEventListener("eight_news_data_changed", handleDataChange);
    return () => window.removeEventListener("eight_news_data_changed", handleDataChange);
  }, [refresh]);

  return { ads, refresh };
}

export function useAdsAdmin() {
  const [allAds, setAllAds] = useState<Advertisement[]>(() => getStoredAds());

  const refresh = useCallback(() => {
    setAllAds(getStoredAds());
  }, []);

  useEffect(() => {
    refresh();
    const handleDataChange = () => refresh();
    window.addEventListener("eight_news_data_changed", handleDataChange);
    return () => window.removeEventListener("eight_news_data_changed", handleDataChange);
  }, [refresh]);

  const addAd = useCallback(
    (data: Omit<Advertisement, "id" | "impressions" | "clicks">) => {
      const created = createAd(data);
      refresh();
      return created;
    },
    [refresh],
  );

  const editAd = useCallback(
    (id: string, updates: Partial<Advertisement>) => {
      const updated = updateAd(id, updates);
      refresh();
      return updated;
    },
    [refresh],
  );

  const removeAd = useCallback(
    (id: string) => {
      const success = deleteAd(id);
      refresh();
      return success;
    },
    [refresh],
  );

  const toggleStatus = useCallback(
    (id: string) => {
      const updated = toggleAdStatus(id);
      refresh();
      return updated;
    },
    [refresh],
  );

  return {
    allAds,
    addAd,
    editAd,
    removeAd,
    toggleStatus,
    getAdById,
    refresh,
  };
}

export function useAdTracker(adId: string) {
  useEffect(() => {
    recordAdImpression(adId);
  }, [adId]);

  const trackClick = useCallback(() => {
    recordAdClick(adId);
  }, [adId]);

  return { trackClick };
}
