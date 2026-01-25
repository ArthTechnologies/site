<script>
  import { API_URL } from "$lib/scripts/config";



  import RSS from "$lib/components/ui/RSS.svelte";


  import Email from "$lib/components/ui/Email.svelte";


  import { browser } from "$app/environment";





  //get the top 10 posts


  let hits = [];


  let platforms = [];


  let res = {};


  let x1 = [


    0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320,


    340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540, 560, 580, 600,


  ];


  let y1 = [];

  let y2 = [];


  let points = "";
  let points2 = ""; 


  let linux;


  let windows;


  let macos;


  let android;


  let ios;


  let unknown;





  let languages = [];


  let referrers = [];


  let pages = [];

  let referrerRedirects = [];



  let promise;




  let totalRedirects = 0;
  let totalRedirectsB = 0;


  let getStartedButtonClicks;


  if (browser) {


    promise = fetch(`${API_URL}/analytics`)


      .then((response) => response.json())


      .then((json) => {
        if (!json) return;


        res = json;


        console.log(json);


        hits = json.hits;


        platforms = json.devices;


        let langsTemp = [];


        //get the top 12 languages


        for (let i = 0; i < 9; i++) {


          let lang = {


            name: Object.keys(json.languages)[i],


            hits: json.languages[Object.keys(json.languages)[i]],


          };


          console.log(lang);


          langsTemp.push(lang);


        }


        //sort the languages by hits


        languages = langsTemp.sort((a, b) => b.hits - a.hits);


        console.log(languages);





        //move data to appear as columns,


        //as there is a visual bug with the grid on column mode


        languages = [


          languages[0],


          languages[4],


          languages[1],


          languages[5],


          languages[2],


          languages[6],


          languages[3],


          languages[7],


        ];





        let refTemp = [];


        //get the top 12 referrers


        for (let i = 0; i < 9; i++) {


          let ref = {


            name: Object.keys(json.referrers)[i],


            hits: json.referrers[Object.keys(json.referrers)[i]],


          };


          refTemp.push(ref);


        }


        //sort the referrers by hits


        referrers = refTemp.sort((a, b) => b.hits - a.hits);





        //move data to appear as columns,


        //as there is a visual bug with the grid on column mode


        referrers = [


          referrers[0],


          referrers[4],


          referrers[1],


          referrers[5],


          referrers[2],


          referrers[6],


          referrers[3],


          referrers[7],


        ];





        let pageTemp = [];


        //get the top 12 pages


        for (let i = 0; i < 9; i++) {


          let page = {


            name: Object.keys(json.pages)[i],


            hits: json.pages[Object.keys(json.pages)[i]],


          };


          pageTemp.push(page);


        }


        //sort the pages by hits


        pages = pageTemp.sort((a, b) => b.hits - a.hits);





        //move data to appear as columns,


        //as there is a visual bug with the grid on column mode


        pages = [


          pages[0],


          pages[4],


          pages[1],


          pages[5],


          pages[2],


          pages[6],


          pages[3],


          pages[7],


        ];





        for (let i = res.day - 30; i <= res.day; i++) {


          if (res.days[i] == undefined) {


            y1.push(200);
            y2.push(200);
                      


          } else {


            y1.push(200 - (200 / res.max) * res.days[i].hits);
            let clickPercentage = 0;
            let sum = 0;
            if (res.days[i].redirects && res.days[i].hits) {
              sum += res.days[i].redirects;
            }

            if (res.days[i].redirectsB && res.days[i].hits) {
              sum += res.days[i].redirectsB;
            }

            clickPercentage = (sum / res.days[i].hits) * 100;

            y2.push(200 - (200 / res.max) * (res.days[i].hits * (clickPercentage / 100)));  


          }


        }


        for (let i = 0; i <= 30; i++) {


          points += `${x1[i]},${y1[i]} `; 
          points2 += `${x1[i]},${y2[i]} `;



        }


        linux = res.devices.linux;


        windows = res.devices.windows;


        macos = res.devices.macintosh;


        android = res.devices.android;


        ios = res.devices.iOS;


        unknown = res.devices.unknown;





        getStartedButtonClicks = res.getStartedButtonClicks;

        // Calculate A/B test totals
        totalRedirects = 0;
        totalRedirectsB = 0;
        for (let day in res.days) {
          if (res.days[day].redirects) totalRedirects += res.days[day].redirects;
          if (res.days[day].redirectsB) totalRedirectsB += res.days[day].redirectsB;
        }

        // Process referrer redirects (clicks by referrer)
        let refRedirectTemp = [];
        if (json.referrerRedirects) {
          for (let key in json.referrerRedirects) {
            let ref = {
              name: key,
              clicks: json.referrerRedirects[key],
            };
            refRedirectTemp.push(ref);
          }
          referrerRedirects = refRedirectTemp.sort((a, b) => b.clicks - a.clicks);
        }


      })
      .catch((err) => {
        console.error("Analytics fetch failed:", err.message);
      });


  }


</script>





<div class="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
  <!-- Header Section -->
  <div class="pt-12 pb-8 px-4">
    <div class="max-w-7xl mx-auto text-center">
      <h1 class="text-4xl font-bold mb-2 text-base-content">
        Analytics Dashboard
      </h1>
      <p class="text-base-content/60 text-lg">Real-time insights into your website's performance</p>
    </div>
  </div>

  <!-- Main Content -->
  <div class="flex items-center flex-col px-4 pb-36">

    <!-- Chart Section -->
    <div class="w-full max-w-4xl mb-12">
      <div class="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-base-300/50">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-6 flex items-center gap-3 text-base-content font-semibold">
            Hits in the last 30 days
          </h2>

          <div class="bg-gradient-to-br from-base-200 to-base-300 rounded-2xl shadow-xl p-8 border border-primary/10 flex justify-center">
            <svg width="600" height="200" class="chart-svg">


      <!-- x axis -->


      <line x1="0" x2="600" y1="200" y2="200" />


      <g class="x" transform="translate(0,220)">


        <text x="0">30</text>


        <text x="120">24</text>


        <text x="240">18</text>


        <text x="360">12</text>


        <text x="480">6</text>


        <text x="600">Today</text>


      </g>





      <!-- y axis -->


      <line x1="0" x2="0" y1="0" y2="200" />


      <g class="y" transform="translate(-10,0)">


        <text y="200">0</text>


        <text y="100">{res.max / 2}</text>


        <text y="0">{res.max}</text>


      </g>



              <defs>
                <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#00a4cd;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#088385;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#ff8c00;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#cc4304;stop-opacity:1" />
                </linearGradient>
              </defs>

              <polyline
                style="stroke: url(#lineGradient2); stroke-width: 3; filter: drop-shadow(0 2px 4px rgba(255, 140, 0, 0.3))"
                points="{points2}"
              />

              <!-- data -->
              <polyline
                style="stroke: url(#lineGradient1); stroke-width: 3; filter: drop-shadow(0 2px 4px rgba(0, 164, 205, 0.3))"
                points="{points}"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>





    <!-- Platforms Section -->
    <div class="w-full max-w-4xl mb-12">
      <div class="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-base-300/50">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-6 text-base-content font-semibold">
            Hits by platform
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="stat-card bg-gradient-to-br from-base-200/80 to-base-300/80 rounded-xl shadow-md p-6 flex justify-between items-center border border-base-content/5 hover:shadow-lg hover:border-primary/20 transition-all duration-200">
              <p class="text-left font-medium text-base-content/80">Windows</p>
              <div class="text-right">
                <p class="text-3xl font-bold text-base-content">{windows}</p>
                <p class="text-sm text-base-content/60 mt-1">{Math.round((windows / res.hits) * 100)}%</p>
              </div>
            </div>

            <div class="stat-card bg-gradient-to-br from-base-200/80 to-base-300/80 rounded-xl shadow-md p-6 flex justify-between items-center border border-base-content/5 hover:shadow-lg hover:border-primary/20 transition-all duration-200">
              <p class="text-left font-medium text-base-content/80">Linux</p>
              <div class="text-right">
                <p class="text-3xl font-bold text-base-content">{linux}</p>
                <p class="text-sm text-base-content/60 mt-1">{Math.round((linux / res.hits) * 100)}%</p>
              </div>
            </div>

            <div class="stat-card bg-gradient-to-br from-base-200/80 to-base-300/80 rounded-xl shadow-md p-6 flex justify-between items-center border border-base-content/5 hover:shadow-lg hover:border-primary/20 transition-all duration-200">
              <p class="text-left font-medium text-base-content/80">Mac</p>
              <div class="text-right">
                <p class="text-3xl font-bold text-base-content">{macos}</p>
                <p class="text-sm text-base-content/60 mt-1">{Math.round((macos / res.hits) * 100)}%</p>
              </div>
            </div>

            <div class="stat-card bg-gradient-to-br from-base-200/80 to-base-300/80 rounded-xl shadow-md p-6 flex justify-between items-center border border-base-content/5 hover:shadow-lg hover:border-primary/20 transition-all duration-200">
              <p class="text-left font-medium text-base-content/80">iOS</p>
              <div class="text-right">
                <p class="text-3xl font-bold text-base-content">{ios}</p>
                <p class="text-sm text-base-content/60 mt-1">{Math.round((ios / res.hits) * 100)}%</p>
              </div>
            </div>

            <div class="stat-card bg-gradient-to-br from-base-200/80 to-base-300/80 rounded-xl shadow-md p-6 flex justify-between items-center border border-base-content/5 hover:shadow-lg hover:border-primary/20 transition-all duration-200">
              <p class="text-left font-medium text-base-content/80">Android</p>
              <div class="text-right">
                <p class="text-3xl font-bold text-base-content">{android}</p>
                <p class="text-sm text-base-content/60 mt-1">{Math.round((android / res.hits) * 100)}%</p>
              </div>
            </div>

            <div class="stat-card bg-gradient-to-br from-base-200/80 to-base-300/80 rounded-xl shadow-md p-6 flex justify-between items-center border border-base-content/5 hover:shadow-lg hover:border-primary/20 transition-all duration-200">
              <p class="text-left font-medium text-base-content/80">Unknown</p>
              <div class="text-right">
                <p class="text-3xl font-bold text-base-content">{unknown}</p>
                <p class="text-sm text-base-content/60 mt-1">{Math.round((unknown / res.hits) * 100)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Languages Section -->
    <div class="w-full max-w-4xl mb-12">
      <div class="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-base-300/50">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-6 text-base-content font-semibold">
            Hits by language
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {#await promise then}
              {#each languages as language, index}
                {#if language.hits != null}
                  <div class="bg-gradient-to-br from-base-200/80 to-base-300/80 rounded-lg shadow-md p-5 border border-base-content/5 hover:shadow-lg hover:border-primary/20 transition-all duration-200">
                    <p class="text-xs font-semibold uppercase text-base-content/70 tracking-wider mb-2">{language.name}</p>
                    <p class="text-3xl font-bold text-base-content mb-1">{Math.round((language.hits / res.initial) * 100)}%</p>
                    <p class="text-xs text-base-content/60">{language.hits} Hits</p>
                  </div>
                {/if}
              {/each}
            {/await}
          </div>
        </div>
      </div>
    </div>





    <!-- Referrers Section -->
    <div class="w-full max-w-4xl mb-12">
      <div class="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-base-300/50">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-6 text-base-content font-semibold">
            Hits by referrer
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {#await promise then}
              {#each referrers as referrer, index}
                {#if referrer.hits != null}
                  <div class="bg-gradient-to-br from-base-200/80 to-base-300/80 rounded-lg shadow-md p-5 border border-base-content/5 hover:shadow-lg hover:border-primary/20 transition-all duration-200">
                    <p class="text-xs font-semibold capitalize text-base-content/70 tracking-wide mb-2">{referrer.name}</p>
                    <p class="text-3xl font-bold text-base-content mb-1">{Math.round((referrer.hits / res.initial) * 100)}%</p>
                    <p class="text-xs text-base-content/60">{referrer.hits} Hits</p>
                  </div>
                {/if}
              {/each}
            {/await}
          </div>
        </div>
      </div>
    </div>


    <!-- Clicks by Referrer Section -->
    <div class="w-full max-w-4xl mb-12">
      <div class="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-base-300/50">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-6 text-base-content font-semibold">
            Clicks by referrer
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {#await promise then}
              {#each referrerRedirects as referrer, index}
                {#if referrer.clicks != null}
                  <div class="bg-gradient-to-br from-base-200/80 to-base-300/80 rounded-lg shadow-md p-5 border border-base-content/5 hover:shadow-lg hover:border-secondary/20 transition-all duration-200">
                    <p class="text-xs font-semibold capitalize text-base-content/70 tracking-wide mb-2">{referrer.name}</p>
                    <p class="text-3xl font-bold text-base-content mb-1">{referrer.clicks}</p>
                    <p class="text-xs text-base-content/60">Clicks</p>
                  </div>
                {/if}
              {/each}
            {/await}
          </div>
        </div>
      </div>
    </div>


    <!-- Pages Section -->
    <div class="w-full max-w-4xl mb-12">
      <div class="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-base-300/50">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-6 text-base-content font-semibold">
            Hits by page
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {#await promise then}
              {#each pages as page, index}
                {#if page.hits != null}
                  <div class="bg-gradient-to-br from-base-200/80 to-base-300/80 rounded-lg shadow-md p-5 border border-base-content/5 hover:shadow-lg hover:border-primary/20 transition-all duration-200">
                    <p class="text-xs font-semibold capitalize text-base-content/70 tracking-wide mb-2 truncate" title={page.name}>{page.name}</p>
                    <p class="text-3xl font-bold text-base-content mb-1">{Math.round((page.hits / res.initial) * 100)}%</p>
                    <p class="text-xs text-base-content/60">{page.hits} Hits</p>
                  </div>
                {/if}
              {/each}
            {/await}
          </div>
        </div>
      </div>
    </div>





    <!-- Summary Stats -->
    <div class="w-full max-w-4xl">
      <div class="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-base-300/50">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-6 text-base-content font-semibold">
            Summary Statistics
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="stat bg-gradient-to-br from-base-200/80 to-base-300/80 rounded-xl shadow-md p-8 border border-base-content/5 hover:shadow-lg hover:border-primary/20 transition-all duration-200">
              <div class="stat-title text-base-content/60 font-medium mb-3">Get Started Clicks</div>
              <div class="stat-value text-4xl text-base-content font-bold">{getStartedButtonClicks}</div>
            </div>

            <div class="stat bg-gradient-to-br from-base-200/80 to-base-300/80 rounded-xl shadow-md p-8 border border-base-content/5 hover:shadow-lg hover:border-primary/20 transition-all duration-200">
              <div class="stat-title text-base-content/60 font-medium mb-3">First Time Visitors</div>
              <div class="stat-value text-4xl text-base-content font-bold">{res.initial}</div>
              <div class="stat-desc text-base text-base-content/70 font-semibold mt-3">{Math.round((res.initial / res.hits) * 100)}%</div>
            </div>

            <div class="stat bg-gradient-to-br from-base-200/80 to-base-300/80 rounded-xl shadow-md p-8 border border-base-content/5 hover:shadow-lg hover:border-primary/20 transition-all duration-200">
              <div class="stat-title text-base-content/60 font-medium mb-3">Returning Visitors</div>
              <div class="stat-value text-4xl text-base-content font-bold">{res.returning}</div>
              <div class="stat-desc text-base text-base-content/70 font-semibold mt-3">{Math.round((res.returning / res.hits) * 100)}%</div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="stat bg-gradient-to-br from-base-200/80 to-base-300/80 rounded-xl shadow-md p-8 border border-base-content/5 hover:shadow-lg hover:border-accent/20 transition-all duration-200">
              <div class="stat-title text-base-content/60 font-medium mb-3">A/B Test: Landing Page A</div>
              <div class="stat-value text-4xl text-base-content font-bold">{totalRedirects}</div>
              <div class="stat-desc text-base text-base-content/70 font-semibold mt-3">{totalRedirects > 0 && getStartedButtonClicks > 0 ? Math.round((totalRedirects / getStartedButtonClicks) * 100) : 0}% of total clicks</div>
            </div>

            <div class="stat bg-gradient-to-br from-base-200/80 to-base-300/80 rounded-xl shadow-md p-8 border border-base-content/5 hover:shadow-lg hover:border-accent/20 transition-all duration-200">
              <div class="stat-title text-base-content/60 font-medium mb-3">A/B Test: Landing Page B</div>
              <div class="stat-value text-4xl text-base-content font-bold">{totalRedirectsB}</div>
              <div class="stat-desc text-base text-base-content/70 font-semibold mt-3">{totalRedirectsB > 0 && getStartedButtonClicks > 0 ? Math.round((totalRedirectsB / getStartedButtonClicks) * 100) : 0}% of total clicks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>





<style>
  .chart-svg {
    overflow: visible;
    max-width: 100%;
    height: auto;
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

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .card {
    animation: fadeIn 0.4s ease-out;
  }

  .stat-card {
    backdrop-filter: blur(8px);
  }
</style>