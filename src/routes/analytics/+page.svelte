<script>
  import RSS from "$lib/components/ui/RSS.svelte";
  import Email from "$lib/components/ui/Email.svelte";
  import { browser } from "$app/environment";

  //get the top 10 posts
  let hits = [];
  let platforms = [];
  let res = {};
  let x1 = [
    0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
    170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300,
  ];
  let y1 = [];
  let points = "";
  let linux;
  let windows;
  let macos;
  let android;
  let ios;
  if (browser) {
    fetch("https://backend.arthmc.xyz/analytics")
      .then((response) => response.json())
      .then((json) => {
        res = json;
        console.log(json);
        hits = json.hits;
        platforms = json.devices;
        for (let i = res.day - 30; i <= res.day; i++) {
          if (res.days[i] == undefined) {
            y1.push(100);
          } else {
            y1.push(100 - (100 / res.max) * res.days[i]);
          }
        }
        for (let i = 0; i <= 30; i++) {
          points += `${x1[i]},${y1[i]} `;
        }
        linux = res.devices.linux;
        windows = res.devices.windows;
        macos = res.devices.macintosh;
        android = res.devices.android;
        ios = res.devices.iOS;
      });
  }
</script>

<div class="flex items-center flex-col">
  <p class="text-lg font-bold my-3 ml-8">Hits in the last 30 days</p>
  <div class="bg-base-200 rounded-xl shadow mb-5">
    <svg width="300" height="100">
      <!-- x axis -->
      <line x1="0" x2="300" y1="100" y2="100" />
      <g class="x" transform="translate(0,120)">
        <text x="0">30</text>
        <text x="60">24</text>
        <text x="120">18</text>
        <text x="180">12</text>
        <text x="240">6</text>
        <text x="300">Today</text>
      </g>

      <!-- y axis -->
      <line x1="0" x2="0" y1="0" y2="100" />
      <g class="y" transform="translate(-10,0)">
        <text y="100">0</text>
        <text y="50">{res.max / 2}</text>
        <text y="0">{res.max}</text>
      </g>

      <!-- data -->
      <polyline
        style="stroke: #00a4cd; stroke-width: 2"
        points="
      {points}
    "
      />
    </svg>
  </div>
</div>

<div class="flex flex-col items-center">
  <p class="text-lg font-bold mt-3 ml-8 mb-3">Hits by platform</p>
  <div
    class="bg-base-200 w-1/3 md:w-1/4 rounded-xl shadow p-5 flex justify-between mb-3"
  >
    <p class="text-left">Windows: {windows}</p>
    <p class="text-center">{(windows / res.hits) * 100}%</p>
  </div>
  <div
    class="bg-base-200 w-1/3 md:w-1/4 rounded-xl shadow p-5 flex justify-between mb-3"
  >
    <p class="text-left">Linux: {linux}</p>
    <p class="text-center">{(linux / res.hits) * 100}%</p>
  </div>
  <div
    class="bg-base-200 w-1/3 md:w-1/4 rounded-xl shadow p-5 flex justify-between mb-3"
  >
    <p class="text-left">Mac: {macos}</p>
    <p class="text-center">{(macos / res.hits) * 100}%</p>
  </div>
  <div
    class="bg-base-200 w-1/3 md:w-1/4 rounded-xl shadow p-5 flex justify-between mb-3"
  >
    <p class="text-left">iOS: {ios}</p>
    <p class="text-center">{(ios / res.hits) * 100}%</p>
  </div>
  <div
    class="bg-base-200 w-1/3 md:w-1/4 rounded-xl shadow p-5 flex justify-between mb-3"
  >
    <p class="text-left">Android: {android}</p>
    <p class="text-center">{(android / res.hits) * 100}%</p>
  </div>
</div>

<style>
  svg {
    overflow: visible;
    margin: 3em;
  }

  line,
  polyline {
    fill: none;
    stroke: black;
  }

  .x text {
    text-anchor: middle;
  }

  .y text {
    text-anchor: end;
    dominant-baseline: middle;
  }
</style>
