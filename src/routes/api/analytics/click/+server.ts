import { recordEvent } from "$lib/server/analytics";
import { json } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";

export async function POST({ request }: RequestEvent) {
  const { referrer = "unknown", campaign = "unknown" } = await request.json().catch(() => ({}));
  recordEvent("clicks", referrer, campaign);
  return json({ ok: true });
}
