<script>
  import { browser } from "$app/environment";
  import CopyLink from "$lib/components/ui/CopyLink.svelte";
  import QRCode from "$lib/components/ui/QRCode.svelte";
  import ShareToMastodon from "$lib/components/ui/ShareToMastodon.svelte";
  import ShareToX from "$lib/components/ui/ShareToX.svelte";
  import { onMount } from "svelte";

  let tab = "windows";
  onMount(() => {
    //try to detect OS via user agent
    if (browser) {
      const userAgent = navigator.userAgent;
      console.log(userAgent);
      if (userAgent.indexOf("Win") != -1) {
        tab = "windows";
        windows();
      } else if (userAgent.indexOf("Linux") != -1) {
        tab = "linux";
        linux();
      } else if (userAgent.indexOf("Mac") != -1) {
        tab = "mac";
        mac();
      }
    }
  });

  function windows() {
    tab = "windows";
    const windows = document.getElementById("windows");
    const linux = document.getElementById("linux");
    const mac = document.getElementById("mac");
    windows.classList.add("tab-active");
    linux.classList.remove("tab-active");
    mac.classList.remove("tab-active");
  }
  function linux() {
    tab = "linux";
    const windows = document.getElementById("windows");
    const linux = document.getElementById("linux");
    const mac = document.getElementById("mac");
    windows.classList.remove("tab-active");
    linux.classList.add("tab-active");
    mac.classList.remove("tab-active");
  }
  function mac() {
    tab = "mac";
    const windows = document.getElementById("windows");
    const linux = document.getElementById("linux");
    const mac = document.getElementById("mac");
    windows.classList.remove("tab-active");
    linux.classList.remove("tab-active");
    mac.classList.add("tab-active");
  }
</script>

<div class="relative flex flex-col items-center justify-center bg-[#535382]">
  <img
    src="/images/modSetupBackground.webp"
    class="h-[90vh] 2xl:h-full object-cover"
  />

  <div class="absolute">
    <div
      class="rounded-xl w-[25rem] relative
       md:w-[45rem] h-[40rem] md:h-[33.3rem] lg:w-[60rem] p-8 bg-base-200
      flex flex-col items-center justify-start bg-opacity-95 backdrop-blur"
    >
      <div class="px-3 py-2 top-0 left-0 flex absolute items-center">
        <ShareToMastodon /><ShareToX /><QRCode /><CopyLink />
      </div>
      <div role="tablist" class="tabs bg-base-300 tabs-boxed mb-3">
        <a
          on:click={windows}
          id="windows"
          role="tab"
          class="tab tab-active flex items-center gap-2"
          ><svg
            fill="#a6adbb"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4875 4875"
            class="w-[1.357rem]"
            ><path
              d="M0 0h2311v2310H0zm2564 0h2311v2310H2564zM0 2564h2311v2311H0zm2564 0h2311v2311H2564"
            /></svg
          >Windows</a
        >
        <a
          on:click={linux}
          id="linux"
          role="tab"
          class="tab flex items-center gap-2"
        >
          <svg
            viewBox="0 0 256 256"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="xMidYMid"
            class="w-[1.5rem]"
          >
            <g>
              <path
                d="M255.637396,127.683191 C255.637396,198.196551 198.47207,255.363378 127.954205,255.363378 C57.4348387,255.363378 0.27026393,198.196551 0.27026393,127.683191 C0.27026393,57.1653255 57.4355894,0 127.954205,0 C198.472821,0 255.637396,57.1653255 255.637396,127.683191 L255.637396,127.683191 Z"
                fill="#a6adbb"
              />
              <path
                d="M41.1334194,110.63254 C31.7139707,110.63254 24.0827683,118.264493 24.0827683,127.683191 C24.0827683,137.097384 31.7139707,144.728587 41.1334194,144.728587 C50.5476129,144.728587 58.1788152,137.097384 58.1788152,127.683191 C58.1788152,118.264493 50.5476129,110.63254 41.1334194,110.63254 L41.1334194,110.63254 Z M162.848282,188.111202 C154.694569,192.820551 151.898839,203.240727 156.608938,211.389935 C161.313032,219.543648 171.733208,222.338628 179.886921,217.629279 C188.039883,212.925185 190.835613,202.505009 186.126264,194.350545 C181.42217,186.202088 170.995988,183.407109 162.848282,188.111202 L162.848282,188.111202 Z M78.1618299,127.683191 C78.1618299,110.836739 86.5295015,95.9534545 99.3332551,86.9409032 L86.8703343,66.0667683 C71.9555191,76.0365044 60.8581818,91.271132 56.2464282,109.113806 C61.6276833,113.504845 65.0720469,120.189372 65.0720469,127.68244 C65.0720469,135.171003 61.6276833,141.855531 56.2464282,146.246569 C60.852176,164.094499 71.9495132,179.329877 86.8703343,189.299613 L99.3332551,168.420223 C86.5295015,159.412927 78.1618299,144.530393 78.1618299,127.683191 L78.1618299,127.683191 Z M127.954205,77.8855601 C153.967109,77.8855601 175.30895,97.8302874 177.549138,123.265877 L201.839859,122.907777 C200.644692,104.129689 192.441431,87.2719765 179.836622,74.875871 C173.354792,77.3247625 165.86773,76.9501466 159.396411,73.2197537 C152.91383,69.4788504 148.849361,63.1681877 147.738276,56.3177478 C141.438123,54.5790499 134.807648,53.6271202 127.952704,53.6271202 C116.168446,53.6271202 105.026815,56.3950733 95.1344047,61.2913548 L106.979472,82.5175836 C113.351695,79.5521877 120.460387,77.8855601 127.954205,77.8855601 L127.954205,77.8855601 Z M127.954205,177.475566 C120.460387,177.475566 113.351695,175.808188 106.980223,172.843543 L95.1351554,194.069021 C105.027566,198.971308 116.169196,201.740012 127.954205,201.740012 C134.80915,201.740012 141.439625,200.787331 147.739026,199.043378 C148.850111,192.192938 152.916082,185.888282 159.397161,182.140622 C165.872985,178.404223 173.355543,178.036364 179.837372,180.485255 C192.442182,168.08915 200.645443,151.231437 201.84061,132.453349 L177.543883,132.095249 C175.30895,157.537595 153.967859,177.475566 127.954205,177.475566 L127.954205,177.475566 Z M162.842276,67.2446686 C170.995988,71.9532669 181.416915,69.1642933 186.121009,61.0105806 C190.830358,52.856868 188.041384,42.4359413 179.886921,37.7258416 C171.733208,33.0217478 161.313032,35.8167273 156.602182,43.9704399 C151.898839,52.1196481 154.693818,62.5405748 162.842276,67.2446686 L162.842276,67.2446686 Z"
                fill="#000000"
              />
            </g>
          </svg>Linux</a
        >
        <a
          on:click={mac}
          id="mac"
          role="tab"
          class="tab flex items-center gap-2"
        >
          <svg
            class="w-[1.3rem] mb-[.1rem]"
            fill="#a6adbb"
            viewBox="0 0 256 315"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="xMidYMid"
          >
            <g>
              <path
                d="M213.803394,167.030943 C214.2452,214.609646 255.542482,230.442639 256,230.644727 C255.650812,231.761357 249.401383,253.208293 234.24263,275.361446 C221.138555,294.513969 207.538253,313.596333 186.113759,313.991545 C165.062051,314.379442 158.292752,301.507828 134.22469,301.507828 C110.163898,301.507828 102.642899,313.596301 82.7151126,314.379442 C62.0350407,315.16201 46.2873831,293.668525 33.0744079,274.586162 C6.07529317,235.552544 -14.5576169,164.286328 13.147166,116.18047 C26.9103111,92.2909053 51.5060917,77.1630356 78.2026125,76.7751096 C98.5099145,76.3877456 117.677594,90.4371851 130.091705,90.4371851 C142.497945,90.4371851 165.790755,73.5415029 190.277627,76.0228474 C200.528668,76.4495055 229.303509,80.1636878 247.780625,107.209389 C246.291825,108.132333 213.44635,127.253405 213.803394,167.030988 M174.239142,50.1987033 C185.218331,36.9088319 192.607958,18.4081019 190.591988,0 C174.766312,0.636050225 155.629514,10.5457909 144.278109,23.8283506 C134.10507,35.5906758 125.195775,54.4170275 127.599657,72.4607932 C145.239231,73.8255433 163.259413,63.4970262 174.239142,50.1987249"
              />
            </g>
          </svg>Mac</a
        >
      </div>
      {#if tab == "windows"}
        <p class="text text-4xl font-bold mb-4">
          How to setup <i>Arthean Expansion</i>:
        </p>
        <div class="flex flex-col items-center text-center gap-3 text-lg">
          <div>
            1. Install the <a
              href="https://curseforge.com/download/app"
              class="text-primary hover:link"
              target="_blank"
              rel="noreferrer">CurseForge App</a
            >
          </div>
          <div class="flex flex-col items-center">
            2. Search for "Arthean" and press "New Instance", then "Install".
            <img
              class="h-[12rem] mt-2 rounded-lg"
              src="images/Step2Linux.webp"
            />
          </div>
          <div class="flex flex-col items-center">
            3. Add a server with "arthmc.xyz:25568" as the address.
            <img class="h-[3rem] mt-2 rounded-lg" src="images/Step3.webp" />
          </div>
        </div>
      {:else if tab == "linux"}
        <p class="text text-4xl font-bold mb-4">
          How to setup <i>Arthean Expansion</i>:
        </p>
        <div class="flex flex-col items-center text-center gap-3 text-lg">
          <div>
            1. Install <a
              href="https://prismlauncher.org/download/linux/"
              class="text-primary hover:link"
              target="_blank"
              rel="noreferrer">ATLauncher</a
            >
          </div>
          <div class="flex flex-col items-center">
            2. Search for "Arthean" and press "New Instance", then "Install".
            <img
              class="h-[12rem] mt-2 rounded-lg"
              src="images/Step2Linux.webp"
            />
          </div>
          <div class="flex flex-col items-center">
            3. Add a server with "arthmc.xyz:25568" as the address.
            <img class="h-[3rem] mt-2 rounded-lg" src="images/Step3.webp" />
          </div>
        </div>
      {:else if tab == "mac"}
        <p class="text text-4xl font-bold mb-4">
          How to setup <i>Arthean Expansion</i>:
        </p>
        <div class="flex flex-col items-center text-center gap-3 text-lg">
          <div>
            1. Install the <a
              href="https://curseforge.com/download/app"
              class="text-primary hover:link"
              target="_blank"
              rel="noreferrer">CurseForge App</a
            >
          </div>
          <div class="flex flex-col items-center">
            2. Search for "Arthean" and press "New Instance", then "Install".
            <img
              class="h-[12rem] mt-2 rounded-lg"
              src="images/Step2Linux.webp"
            />
          </div>
          <div class="flex flex-col items-center">
            3. Add a server with "arthmc.xyz:25568" as the address.
            <img class="h-[3rem] mt-2 rounded-lg" src="images/Step3.webp" />
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
