<script lang="ts">
  import { onMount } from "svelte";
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

  Chart.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Legend,
    Tooltip,
    LineController
  );

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
  let loading = true;
  let error = "";

  let totals = { views: 0, clicks: 0, signups: 0, payments: 0 };

  // Aggregated referrer and campaign totals across all 30 days
  let byReferrer: Record<string, Breakdown> = {};
  let byCampaign: Record<string, Breakdown> = {};

  function pct(a: number, b: number): string {
    if (!b) return "—";
    return Math.round((a / b) * 100) + "%";
  }

  function addBreakdown(
    target: Record<string, Breakdown>,
    source: Record<string, Breakdown> = {}
  ) {
    for (const [key, val] of Object.entries(source)) {
      if (!target[key]) target[key] = { views: 0, clicks: 0, signups: 0, payments: 0 };
      target[key].views    += val.views    ?? 0;
      target[key].clicks   += val.clicks   ?? 0;
      target[key].signups  += val.signups  ?? 0;
      target[key].payments += val.payments ?? 0;
    }
  }

  function sorted(map: Record<string, Breakdown>): [string, Breakdown][] {
    return Object.entries(map).sort(([, a], [, b]) => b.views - a.views);
  }

  onMount(async () => {
    try {
      const res = await fetch("/api/analytics");
      const data = await res.json();

      days = Object.entries(data.days as Record<string, DayData>)
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-30);

      for (const [, d] of days) {
        totals.views    += d.views    ?? 0;
        totals.clicks   += d.clicks   ?? 0;
        totals.signups  += d.signups  ?? 0;
        totals.payments += d.payments ?? 0;
        addBreakdown(byReferrer, d.byReferrer);
        addBreakdown(byCampaign, d.byCampaign);
      }

      loading = false;

      setTimeout(() => {
        if (!canvas) return;
        const labels = days.map(([d]) => d.slice(5));
        const mk = (field: keyof Breakdown) => days.map(([, v]) => v[field] ?? 0);

        new Chart(canvas, {
          type: "line",
          data: {
            labels,
            datasets: [
              { label: "Views",    data: mk("views"),    borderColor: "#60a5fa", tension: 0.3, fill: false, pointRadius: 3 },
              { label: "Clicks",   data: mk("clicks"),   borderColor: "#f97316", tension: 0.3, fill: false, pointRadius: 3 },
              { label: "Signups",  data: mk("signups"),  borderColor: "#4ade80", tension: 0.3, fill: false, pointRadius: 3 },
              { label: "Payments", data: mk("payments"), borderColor: "#facc15", tension: 0.3, fill: false, pointRadius: 3 },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: "top" },
              tooltip: { mode: "index", intersect: false },
            },
            scales: { y: { beginAtZero: true } },
          },
        });
      }, 0);
    } catch (e) {
      error = "Failed to load analytics.";
      loading = false;
    }
  });
</script>

<div class="min-h-screen bg-base-200 p-6 md:p-12 font-poppins">
  <h1 class="text-3xl font-bold mb-1">Analytics</h1>
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
