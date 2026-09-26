const KEY = "eight_news_device_id";

/** Stable anonymous device id used to de-duplicate views, likes and ad events. */
export function getDeviceId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = window.localStorage.getItem(KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `d_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    window.localStorage.setItem(KEY, id);
  }
  return id;
}

/** True the first time this session sees `key`; used to throttle ad impressions. */
export function onceThisSession(key: string): boolean {
  if (typeof window === "undefined") return false;
  const k = `eight_once_${key}`;
  if (window.sessionStorage.getItem(k)) return false;
  window.sessionStorage.setItem(k, "1");
  return true;
}
