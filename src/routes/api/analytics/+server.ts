import { getAll } from "$lib/server/analytics";
import { json } from "@sveltejs/kit";

export function GET() {
  return json(getAll());
}
