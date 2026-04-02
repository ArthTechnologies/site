import { deleteAll } from "$lib/server/analytics";
import { json } from "@sveltejs/kit";

export async function DELETE() {
  deleteAll();
  return json({ ok: true });
}
