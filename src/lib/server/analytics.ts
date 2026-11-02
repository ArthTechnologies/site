import fs from "fs";
import path from "path";

type EventField = "views" | "clicks" | "signups" | "payments";

interface Breakdown {
  views: number;
  clicks: number;
  signups: number;
  payments: number;
}

interface DayData extends Breakdown {
  byReferrer: Record<string, Breakdown>;
  byCampaign: Record<string, Breakdown>;
  paymentDetails?: { billingEmail: string | null; accountId: string | null; referrer: string; campaign: string }[];
}

export interface AnalyticsData {
  days: Record<string, DayData>;
}

const DATA_PATH = path.resolve("data/analytics.json");
const enc = new TextEncoder();

function normalizeReferrer(referrer: string): string {
  if (!referrer || referrer === "unknown") return "unknown";

  // If it's not a URL (no ://), assume it's already simplified
  if (!referrer.includes("://")) {
    return referrer;
  }

  try {
    const u = new URL(referrer);
    let domain = u.hostname || "";
    domain = domain.replace(/^www\./, "");
    domain = domain.split(".")[0];
    return domain || "unknown";
  } catch {
    return "unknown";
  }
}

// SSE client registry — persists across requests within the Node process
const clients = new Set<ReadableStreamDefaultController<Uint8Array>>();

export function addClient(ctrl: ReadableStreamDefaultController<Uint8Array>) {
  clients.add(ctrl);
}

export function removeClient(ctrl: ReadableStreamDefaultController<Uint8Array>) {
  clients.delete(ctrl);
}

function broadcast(data: AnalyticsData) {
  const msg = enc.encode(`data: ${JSON.stringify(publicAnalytics(data))}\n\n`);
  for (const ctrl of clients) {
    try {
      ctrl.enqueue(msg);
    } catch {
      clients.delete(ctrl);
    }
  }
}

export interface HitNotification {
  device: string;
  referrer: string;
  campaign: string;
  time: string;
}

export function broadcastNotification(payload: HitNotification) {
  const safe = { ...payload, referrer: publicLabel(payload.referrer), campaign: publicLabel(payload.campaign) };
  const msg = enc.encode(`event: notification\ndata: ${JSON.stringify(safe)}\n\n`);
  for (const ctrl of clients) {
    try {
      ctrl.enqueue(msg);
    } catch {
      clients.delete(ctrl);
    }
  }
}

function emptyBreakdown(): Breakdown {
  return { views: 0, clicks: 0, signups: 0, payments: 0 };
}

function emptyDay(): DayData {
  return { ...emptyBreakdown(), byReferrer: {}, byCampaign: {} };
}

function read(): AnalyticsData {
  if (!fs.existsSync(DATA_PATH)) return { days: {} };
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  } catch {
    return { days: {} };
  }
}

function write(data: AnalyticsData) {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

function today(): string {
  return new Date().toISOString().split("T")[0];
}

export function recordEvent(
  field: EventField,
  referrer = "unknown",
  campaign = "unknown",
  details?: { billingEmail: string | null; accountId: string | null }
) {
  const data = read();
  const key = today();

  // Normalize referrer server-side to ensure consistency
  referrer = normalizeReferrer(referrer);

  if (!data.days[key]) data.days[key] = emptyDay();
  const day = data.days[key];

  day[field]++;
  if (field === "payments" && details) {
    if (!Array.isArray(day.paymentDetails)) day.paymentDetails = [];
    day.paymentDetails.push({ ...details, referrer, campaign });
  }

  if (!day.byReferrer[referrer]) day.byReferrer[referrer] = emptyBreakdown();
  day.byReferrer[referrer][field]++;

  if (!day.byCampaign[campaign]) day.byCampaign[campaign] = emptyBreakdown();
  day.byCampaign[campaign][field]++;

  write(data);
  broadcast(data);
}

export function getAll(): AnalyticsData {
  return publicAnalytics(read());
}

// Project only numeric aggregate fields, including for pre-existing files.
// Free-form labels can contain customer information, so suppress unsafe labels.
function publicLabel(key: string): string {
  return typeof key === "string" && /^[a-z0-9_-]{1,80}$/i.test(key) && !/(?:acc_|cus_)/i.test(key) && !["__proto__", "constructor", "prototype"].includes(key.toLowerCase()) ? key : "other";
}

function publicAnalytics(data: AnalyticsData): AnalyticsData {
  const number = (v: unknown) => typeof v === "number" && Number.isFinite(v) ? v : 0;
  const counts = (v: any): Breakdown => ({ views: number(v?.views), clicks: number(v?.clicks), signups: number(v?.signups), payments: number(v?.payments) });
  const categories = (v: any): Record<string, Breakdown> => {
    const result: Record<string, Breakdown> = {};
    for (const [key, value] of Object.entries(v || {})) {
      const safe = publicLabel(key);
      const current = result[safe] || emptyBreakdown();
      const next = counts(value);
      for (const field of ["views", "clicks", "signups", "payments"] as const) current[field] += next[field];
      result[safe] = current;
    }
    return result;
  };
  const days: Record<string, DayData> = {};
  for (const [date, day] of Object.entries(data.days || {})) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
    days[date] = { ...counts(day), byReferrer: categories(day.byReferrer), byCampaign: categories(day.byCampaign) };
  }
  return { days };
}

export function deleteAll() {
  if (fs.existsSync(DATA_PATH)) fs.unlinkSync(DATA_PATH);
  broadcast({ days: {} });
}
