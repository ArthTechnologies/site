import { recordEvent, broadcastNotification } from "$lib/server/analytics";
import { json } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";

function parseDevice(ua: string): string {
  if (!ua) return "Unknown";
  if (/bot|crawl|spider|slurp|facebookexternalhit/i.test(ua)) return "Bot";
  if (/iPad/i.test(ua)) return "iPad";
  if (/iPhone/i.test(ua)) return "iPhone";
  if (/Android.*Mobile/i.test(ua)) return "Android Phone";
  if (/Android/i.test(ua)) return "Android Tablet";
  if (/Windows/i.test(ua)) return "Windows";
  if (/Macintosh/i.test(ua)) return "Mac";
  if (/Linux/i.test(ua)) return "Linux";
  return "Other";
}

export async function POST({ request }: RequestEvent) {
  const { referrer = "unknown", campaign = "unknown" } = await request.json().catch(() => ({}));
  recordEvent("views", referrer, campaign);

  const ua = request.headers.get("user-agent") ?? "";
  broadcastNotification({
    device: parseDevice(ua),
    referrer,
    campaign,
    time: new Date().toISOString(),
  });

  return json({ ok: true });
}
