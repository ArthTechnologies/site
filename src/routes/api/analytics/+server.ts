import { getAll, addClient, removeClient } from "$lib/server/analytics";
import { json } from "@sveltejs/kit";

const enc = new TextEncoder();

// GET /api/analytics        → SSE stream for live dashboard updates
// GET /api/analytics?json=1 → plain JSON snapshot (initial page load)
export function GET({ url }: { url: URL }) {
  if (url.searchParams.has("json")) {
    return json(getAll());
  }

  let ctrl: ReadableStreamDefaultController<Uint8Array>;

  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      ctrl = c;
      addClient(c);
    },
    cancel() {
      removeClient(ctrl);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      // Tell Nginx / any buffering proxy not to buffer this stream
      "X-Accel-Buffering": "no",
    },
  });
}
