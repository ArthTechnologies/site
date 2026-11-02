import { recordEvent } from "$lib/server/analytics";
import { json } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function POST({ request }: RequestEvent) {
  const { referrer = "unknown", campaign = "unknown", billingEmail, accountId } = await request.json().catch(() => ({}));
  const bounded = (value: unknown) => typeof value === "string" && value.length <= 254 ? value : null;
  recordEvent("payments", referrer, campaign, { billingEmail: bounded(billingEmail), accountId: bounded(accountId) });
  return json({ ok: true }, { headers: CORS });
}
