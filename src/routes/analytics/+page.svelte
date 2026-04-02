<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    Chart,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Legend,
    Tooltip,
    LineController,
  } from "chart.js";

  Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip, LineController);

  interface Breakdown {
    views: number;
    clicks: number;
    signups: number;
    payments: number;
  }

  interface DayData extends Breakdown {
    byReferrer: Record<string, Breakdown>;
    byCampaign: Record<string, Breakdown>;
  }

  let days: [string, DayData][] = [];
  let canvas: HTMLCanvasElement;
  let chart: Chart | null = null;
  let loading = true;
  let error = "";
  let live = false;

  let totals = { views: 0, clicks: 0, signups: 0, payments: 0 };
  let byReferrer: Record<string, Breakdown> = {};
  let byCampaign: Record<string, Breakdown> = {};

  function pct(a: number, b: number): string {
    if (!b) return "—";
    return Math.round((a / b) * 100) + "%";
  }

  function sorted(map: Record<string, Breakdown>): [string, Breakdown][] {
    return Object.entries(map).sort(([, a], [, b]) => b.views - a.views);
  }

  function processData(raw: Record<string, DayData>) {
    days = Object.entries(raw)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-30);

    totals = { views: 0, clicks: 0, signups: 0, payments: 0 };
    byReferrer = {};
    byCampaign = {};

    for (const [, d] of days) {
      totals.views    += d.views    ?? 0;
      totals.clicks   += d.clicks   ?? 0;
      totals.signups  += d.signups  ?? 0;
      totals.payments += d.payments ?? 0;

      for (const [key, val] of Object.entries(d.byReferrer ?? {})) {
        if (!byReferrer[key]) byReferrer[key] = { views: 0, clicks: 0, signups: 0, payments: 0 };
        byReferrer[key].views    += val.views    ?? 0;
        byReferrer[key].clicks   += val.clicks   ?? 0;
        byReferrer[key].signups  += val.signups  ?? 0;
        byReferrer[key].payments += val.payments ?? 0;
      }
      for (const [key, val] of Object.entries(d.byCampaign ?? {})) {
        if (!byCampaign[key]) byCampaign[key] = { views: 0, clicks: 0, signups: 0, payments: 0 };
        byCampaign[key].views    += val.views    ?? 0;
        byCampaign[key].clicks   += val.clicks   ?? 0;
        byCampaign[key].signups  += val.signups  ?? 0;
        byCampaign[key].payments += val.payments ?? 0;
      }
    }
  }

  function updateChart() {
    if (!chart) return;
    const mk = (field: keyof Breakdown) => days.map(([, v]) => v[field] ?? 0);
    chart.data.labels = days.map(([d]) => d.slice(5));
    chart.data.datasets[0].data = mk("views");
    chart.data.datasets[1].data = mk("clicks");
    chart.data.datasets[2].data = mk("signups");
    chart.data.datasets[3].data = mk("payments");
    chart.update("none"); // "none" skips animation for instant feel
  }

  function initChart() {
    if (!canvas || chart) return;
    const mk = (field: keyof Breakdown) => days.map(([, v]) => v[field] ?? 0);
    chart = new Chart(canvas, {
      type: "line",
      data: {
        labels: days.map(([d]) => d.slice(5)),
        datasets: [
          { label: "Views",    data: mk("views"),    borderColor: "#60a5fa", tension: 0.3, fill: false, pointRadius: 3 },
          { label: "Clicks",   data: mk("clicks"),   borderColor: "#f97316", tension: 0.3, fill: false, pointRadius: 3 },
          { label: "Signups",  data: mk("signups"),  borderColor: "#4ade80", tension: 0.3, fill: false, pointRadius: 3 },
          { label: "Payments", data: mk("payments"), borderColor: "#facc15", tension: 0.3, fill: false, pointRadius: 3 },
        ],
      },
      options: {
        responsive: true,
        animation: false,
        plugins: {
          legend: { position: "top" },
          tooltip: { mode: "index", intersect: false },
        },
        scales: { y: { beginAtZero: true } },
      },
    });
  }

  interface Toast {
    id: number;
    device: string;
    referrer: string;
    campaign: string;
    time: string;
  }

  let toasts: Toast[] = [];
  let toastSeq = 0;
  const TOAST_TTL = 5000; // ms before auto-dismiss

  function addToast(payload: Omit<Toast, "id">) {
    const id = ++toastSeq;
    toasts = [{ id, ...payload }, ...toasts].slice(0, 5); // keep max 5
    setTimeout(() => dismissToast(id), TOAST_TTL);
  }

  function dismissToast(id: number) {
    toasts = toasts.filter(t => t.id !== id);
  }

  function fmtTime(iso: string): string {
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }

  let es: EventSource;

  onMount(async () => {
    // ── Step 1: load data immediately via plain HTTP so the page is never blank ──
    try {
      const res = await fetch("/api/analytics?json=1");
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      processData(data.days ?? {});
      loading = false;
      setTimeout(initChart, 0);
    } catch (e) {
      error = "Failed to load analytics data.";
      loading = false;
      return;
    }

    // ── Step 2: open SSE for live push updates ──
    es = new EventSource("/api/analytics");

    es.onopen = () => { live = true; };

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      processData(data.days ?? {});
      updateChart();
    };

    es.addEventListener("notification", (event: MessageEvent) => {
      const p = JSON.parse(event.data);
      addToast(p);
    });

    es.onerror = () => { live = false; };
  });

  onDestroy(() => {
    es?.close();
    chart?.destroy();
  });
</script>

<!-- Toast stack -->
<div class="fixed bottom-4 right-4 z-50 flex flex-col-reverse gap-2 pointer-events-none">
  {#each toasts as toast (toast.id)}
    <div class="pointer-events-auto flex items-start gap-3 bg-base-100 border border-base-300 shadow-lg rounded-xl px-4 py-3 w-72 animate-fade-in">
      <span class="mt-0.5 w-2 h-2 rounded-full bg-blue-400 shrink-0 animate-pulse"></span>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold leading-tight">New view</p>
        <p class="text-xs text-base-content/60 mt-0.5">{toast.device}</p>
        <p class="text-xs text-base-content/40 truncate">{toast.referrer === 'unknown' ? 'Direct' : toast.referrer}</p>
        {#if toast.campaign !== 'unknown'}
          <p class="text-xs text-orange-400 truncate">📣 {toast.campaign}</p>
        {/if}
        <p class="text-xs text-base-content/30 mt-0.5">{fmtTime(toast.time)}</p>
      </div>
      <button class="text-base-content/30 hover:text-base-content transition-colors text-lg leading-none" on:click={() => dismissToast(toast.id)}>×</button>
    </div>
  {/each}
</div>

<div class="min-h-screen bg-base-200 p-6 md:p-12 font-poppins">
  <div class="flex items-center gap-3 mb-1">
    <h1 class="text-3xl font-bold">Analytics</h1>
    <span class="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full {live ? 'bg-green-500/20 text-green-400' : 'bg-base-300 text-base-content/40'}">
      <span class="w-1.5 h-1.5 rounded-full {live ? 'bg-green-400 animate-pulse' : 'bg-base-content/30'}"></span>
      {live ? 'live' : 'connecting…'}
    </span>
  </div>
  <p class="text-base-content/50 mb-8 text-sm">TikTok ads funnel · last 30 days</p>

  {#if loading}
    <p class="text-base-content/50 animate-pulse">Loading…</p>
  {:else if error}
    <p class="text-error">{error}</p>
  {:else}
    <!-- Summary cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-base-100 rounded-2xl shadow p-5">
        <p class="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-1">Views</p>
        <p class="text-3xl font-bold">{totals.views}</p>
        <p class="text-xs text-base-content/40 mt-1">30d total</p>
      </div>
      <div class="bg-base-100 rounded-2xl shadow p-5">
        <p class="text-xs text-orange-400 font-semibold uppercase tracking-wider mb-1">Clicks</p>
        <p class="text-3xl font-bold">{totals.clicks}</p>
        <p class="text-xs text-base-content/40 mt-1">{pct(totals.clicks, totals.views)} of views</p>
      </div>
      <div class="bg-base-100 rounded-2xl shadow p-5">
        <p class="text-xs text-green-400 font-semibold uppercase tracking-wider mb-1">Signups</p>
        <p class="text-3xl font-bold">{totals.signups}</p>
        <p class="text-xs text-base-content/40 mt-1">{pct(totals.signups, totals.clicks)} of clicks</p>
      </div>
      <div class="bg-base-100 rounded-2xl shadow p-5">
        <p class="text-xs text-yellow-400 font-semibold uppercase tracking-wider mb-1">Payments</p>
        <p class="text-3xl font-bold">{totals.payments}</p>
        <p class="text-xs text-base-content/40 mt-1">{pct(totals.payments, totals.signups)} of signups</p>
      </div>
    </div>

    <!-- Chart -->
    <div class="bg-base-100 rounded-2xl shadow p-6 mb-8">
      <canvas bind:this={canvas}></canvas>
    </div>

    <!-- Referrer breakdown -->
    <div class="bg-base-100 rounded-2xl shadow overflow-x-auto mb-6">
      <div class="p-5 border-b border-base-200">
        <h2 class="font-bold text-lg">By referrer</h2>
        <p class="text-xs text-base-content/40 mt-0.5">HTTP referrer tracked on first visit</p>
      </div>
      <table class="table table-zebra w-full text-sm">
        <thead>
          <tr>
            <th>Referrer</th>
            <th class="text-blue-400">Views</th>
            <th class="text-orange-400">Clicks</th>
            <th class="text-base-content/40 text-xs font-normal">→ rate</th>
            <th class="text-green-400">Signups</th>
            <th class="text-base-content/40 text-xs font-normal">→ rate</th>
            <th class="text-yellow-400">Payments</th>
            <th class="text-base-content/40 text-xs font-normal">→ rate</th>
          </tr>
        </thead>
        <tbody>
          {#each sorted(byReferrer) as [ref, d]}
            <tr>
              <td class="font-mono text-xs max-w-[160px] truncate">{ref}</td>
              <td>{d.views}</td>
              <td>{d.clicks}</td>
              <td class="text-base-content/40">{pct(d.clicks, d.views)}</td>
              <td>{d.signups}</td>
              <td class="text-base-content/40">{pct(d.signups, d.clicks)}</td>
              <td>{d.payments}</td>
              <td class="text-base-content/40">{pct(d.payments, d.signups)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Campaign breakdown -->
    <div class="bg-base-100 rounded-2xl shadow overflow-x-auto mb-8">
      <div class="p-5 border-b border-base-200">
        <h2 class="font-bold text-lg">By campaign</h2>
        <p class="text-xs text-base-content/40 mt-0.5">utm_campaign URL parameter</p>
      </div>
      <table class="table table-zebra w-full text-sm">
        <thead>
          <tr>
            <th>Campaign</th>
            <th class="text-blue-400">Views</th>
            <th class="text-orange-400">Clicks</th>
            <th class="text-base-content/40 text-xs font-normal">→ rate</th>
            <th class="text-green-400">Signups</th>
            <th class="text-base-content/40 text-xs font-normal">→ rate</th>
            <th class="text-yellow-400">Payments</th>
            <th class="text-base-content/40 text-xs font-normal">→ rate</th>
          </tr>
        </thead>
        <tbody>
          {#each sorted(byCampaign) as [camp, d]}
            <tr>
              <td class="font-mono text-xs max-w-[160px] truncate">{camp}</td>
              <td>{d.views}</td>
              <td>{d.clicks}</td>
              <td class="text-base-content/40">{pct(d.clicks, d.views)}</td>
              <td>{d.signups}</td>
              <td class="text-base-content/40">{pct(d.signups, d.clicks)}</td>
              <td>{d.payments}</td>
              <td class="text-base-content/40">{pct(d.payments, d.signups)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Debug controls -->
    <div class="flex gap-3 mb-6">
      <a
        href="/api/analytics?json=1"
        download="analytics.json"
        class="btn btn-sm btn-ghost border border-base-300 gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Download analytics.json
      </a>
      <button
        class="btn btn-sm btn-ghost border border-error/40 text-error gap-2"
        on:click={async () => {
          if (!confirm("Delete all analytics data? This cannot be undone.")) return;
          await fetch("/api/analytics/data", { method: "DELETE" });
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        Delete analytics.json
      </button>
    </div>

    <!-- Daily table -->
    <div class="bg-base-100 rounded-2xl shadow overflow-x-auto">
      <div class="p-5 border-b border-base-200">
        <h2 class="font-bold text-lg">Daily breakdown</h2>
      </div>
      <table class="table table-zebra w-full text-sm">
        <thead>
          <tr>
            <th>Date</th>
            <th class="text-blue-400">Views</th>
            <th class="text-orange-400">Clicks</th>
            <th class="text-base-content/40 text-xs font-normal">→ rate</th>
            <th class="text-green-400">Signups</th>
            <th class="text-base-content/40 text-xs font-normal">→ rate</th>
            <th class="text-yellow-400">Payments</th>
            <th class="text-base-content/40 text-xs font-normal">→ rate</th>
          </tr>
        </thead>
        <tbody>
          {#each [...days].reverse() as [date, d]}
            <tr>
              <td class="font-mono text-xs">{date}</td>
              <td>{d.views ?? 0}</td>
              <td>{d.clicks ?? 0}</td>
              <td class="text-base-content/40">{pct(d.clicks, d.views)}</td>
              <td>{d.signups ?? 0}</td>
              <td class="text-base-content/40">{pct(d.signups, d.clicks)}</td>
              <td>{d.payments ?? 0}</td>
              <td class="text-base-content/40">{pct(d.payments, d.signups)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  :global(.animate-fade-in) {
    animation: fade-in 0.2s ease-out;
  }
</style>
