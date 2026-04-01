import { getAll, addClient, removeClient } from "$lib/server/analytics";

const enc = new TextEncoder();

export function GET() {
  let ctrl: ReadableStreamDefaultController<Uint8Array>;

  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      ctrl = c;
      addClient(c);
      // Send current snapshot immediately so the dashboard isn't blank
      c.enqueue(enc.encode(`data: ${JSON.stringify(getAll())}\n\n`));
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
    },
  });
}
