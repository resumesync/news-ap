export function formatCount(n: number): string {
  return new Intl.NumberFormat("en-IN").format(n ?? 0);
}

export function formatCompactCount(n: number): string {
  if (!n || n < 1000) return String(n ?? 0);
  if (n >= 1_000_000) {
    const val = (n / 1_000_000).toFixed(1);
    return `${val.endsWith(".0") ? val.slice(0, -2) : val}M`;
  }
  const val = (n / 1000).toFixed(1);
  return `${val.endsWith(".0") ? val.slice(0, -2) : val}K`;
}

const TELUGU_MONTHS = [
  "జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్",
  "జులై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"
];

export function formatStoryDate(date: string, time?: string | null): string {
  const d = new Date(`${date}T${(time ?? "12:00:00").slice(0, 8)}`);
  if (Number.isNaN(d.getTime())) return date;

  const day = d.getDate();
  const month = TELUGU_MONTHS[d.getMonth()] || "సెప్టెంబర్";
  const year = d.getFullYear();

  let timeString = "";
  if (time) {
    const hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    timeString = ` · ${formattedHours}:${minutes} ${ampm}`;
  }

  return `${day} ${month} ${year}${timeString}`;
}

export function formatDate(date: string, time?: string | null): string {
  const d = new Date(`${date}T${(time ?? "00:00:00").slice(0, 8)}`);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleString("te-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(time ? { hour: "numeric", minute: "2-digit" } : {}),
  });
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\u0C00-\u0C7F]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
