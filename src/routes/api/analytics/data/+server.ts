import { json } from "@sveltejs/kit";

export async function DELETE() {
  // There is no staff authentication on this public endpoint.
  return json({ error: "Analytics deletion is unavailable" }, { status: 403 });
}
