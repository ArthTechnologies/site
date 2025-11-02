<script>
  import { browser } from "$app/environment";
  import { t } from "$lib/scripts/i18n";
  import { CpuIcon, MemoryStick } from "lucide-svelte";
  let billedQuarterly = true;

  function getStartedClicked() {
    if (browser) {
      if (localStorage.getItem("allowAnalytics") == "true") {
        let page = localStorage.getItem("ab_NewLandingPage");
        fetch(
          "https://ocelot.arthmc.xyz/analytics/getStartedButtonClicked?bpage=" +
            page,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    }
  }
</script>

<div
  class=" relative flex  max-md:overflow-x-scroll w-screen justify-center mt-10"
>
  <div
    class="max-md:w-48 flex flex-col items-start gap-2.5 bg-base-300 bg-opacity-[85%] backdrop-blur-[1px] rounded-l-2xl px-3 md:px-6 py-5 grayGradientStroke"
  >
    <p class=" font-bold text-[1.25rem] md:text-3xl text-left -mb-3 md:mb-0">
      {$t("landing.plans.basic.title")}
    </p>

    <div class=" flex gap-4 -mb-3.5 md:mb-3.5 hidden">
      <div class="hidden w-20 outline p-2 rounded">
        <p class="text-center font-poppins-bold text-xl ">4GB</p>
        <div
          class="flex font-poppins font-bold items-center gap-1 justify-center text-sm"
        >
          <MemoryStick size="18" />RAM
        </div>
      </div>
      <div class="md:hidden p-2 rounded">
    
        <div
          class="flex font-poppins font-bold items-center gap-1 justify-center"
        >
          <MemoryStick size="20" />4GB
        </div>
      </div>
      <div class="w-24 outline outline-[#d1d1d1] p-2 rounded max-md:hidden">
        <p class="text-center font-poppins-bold text-xl">10GB</p>
        <div
          class="flex font-poppins font-bold items-center gap-0.5 justify-center text-sm"
        >
          <CpuIcon size="16" />Storage
        </div>
      </div>
    </div>
    <p class="font-poppins font-bold text-xl  text-center max-md:flex flex-col mb-0.5">
      $3.99<span class="text-sm">/{$t("misc.month")}</span>
    </p>
<div class="flex items-center font-poppins gap-1.5 text-sm"><input type="checkbox"  bind:checked={billedQuarterly}  class="toggle toggle-xs" /> Billed Quarterly</div>
<div class="divider w-full h-[1px] bg-gray-400 my-2"></div>
<ul class="list-disc font-poppins list-inside text-md">
      <li>4GB RAM</li>
      <li>16GB Storage</li>
      <li>Ryzen 7 CPUs</li>
      </ul>
    <a
      on:click={getStartedClicked}
      href="https://servers.arthmc.xyz/signup?plan=basic&quarterly={billedQuarterly}"
      target="_blank"
      rel="noreferrer"
      class="w-full"
    >
      <div
        class="text-sm w-full h-12 px-5 cursor-pointer flex flex-col justify-center items-center bg-gradient-to-b from-[#E93843] to-[#F56922] hover:brightness-90 rounded-full text-gray-100 whiteGradientStroke font-poppins-bold text-[#ebeef5]"
      >
        {$t("landing.plans.button")}
      </div>
    </a>
  </div>
  <div
    class="max-md:w-48 flex flex-col items-start gap-2.5 bg-base-300 bg-opacity-[85%] backdrop-blur-[1px] px-3 md:px-6 py-5 grayGradientStroke"
  >
    <p class=" font-bold text-[1.25rem] md:text-3xl text-left -mb-3 md:mb-0">
      {$t("landing.plans.plus.title")}
    </p>

    <div class=" flex gap-4 -mb-3.5 md:mb-3.5 hidden">
      <div class="hidden w-20 outline p-2 rounded">
        <p class="text-center font-poppins-bold text-xl ">4GB</p>
        <div
          class="flex font-poppins font-bold items-center gap-1 justify-center text-sm"
        >
          <MemoryStick size="18" />RAM
        </div>
      </div>
      <div class="md:hidden p-2 rounded">
    
        <div
          class="flex font-poppins font-bold items-center gap-1 justify-center"
        >
          <MemoryStick size="20" />4GB
        </div>
      </div>
      <div class="w-24 outline outline-[#d1d1d1] p-2 rounded max-md:hidden">
        <p class="text-center font-poppins-bold text-xl">10GB</p>
        <div
          class="flex font-poppins font-bold items-center gap-0.5 justify-center text-sm"
        >
          <CpuIcon size="16" />Storage
        </div>
      </div>
    </div>
    <p class="font-poppins font-bold text-xl  text-center max-md:flex flex-col mb-0.5">
      $5.99<span class="text-sm">/{$t("misc.month")}</span>
    </p>
<div class="flex items-center font-poppins gap-1.5 text-sm"><input type="checkbox"  bind:checked={billedQuarterly}  class="toggle toggle-xs" /> Billed Quarterly</div>
<div class="divider w-full h-[1px] bg-gray-400 my-2"></div>
<ul class="list-disc font-poppins list-inside text-md">
      <li>6GB RAM</li>
      <li>24GB Storage</li>
      <li>Ryzen 7 CPUs</li>
      </ul>
    <a
      on:click={getStartedClicked}
      href="https://servers.arthmc.xyz/signup?plan=plus&quarterly={billedQuarterly}"
      target="_blank"
      rel="noreferrer"
      class="w-full"
    >
      <div
        class="text-sm w-full h-12 px-5 cursor-pointer flex flex-col justify-center items-center bg-gradient-to-b from-[#E93843] to-[#F56922] hover:brightness-90 rounded-full text-gray-100 whiteGradientStroke font-poppins-bold text-[#ebeef5]"
      >
        {$t("landing.plans.button")}
      </div>
    </a>
  </div>
    <div
    class="max-md:w-48 flex flex-col items-start gap-2.5 bg-base-300 bg-opacity-[85%] backdrop-blur-[1px] rounded-r-2xl px-3 md:px-6 py-5 goldGradientStroke"
  >
    <p class="text-[#edcfb0] font-bold text-[1.25rem] md:text-3xl text-left -mb-3 md:mb-0">
      {$t("landing.plans.premium.title")}
    </p>

    <div class=" flex gap-4 -mb-3.5 md:mb-3.5 hidden">
      <div class="hidden w-20 outline p-2 rounded">
        <p class="text-center font-poppins-bold text-xl ">4GB</p>
        <div
          class="flex font-poppins font-bold items-center gap-1 justify-center text-sm"
        >
          <MemoryStick size="18" />RAM
        </div>
      </div>
      <div class="md:hidden p-2 rounded">
    
        <div
          class="flex font-poppins font-bold items-center gap-1 justify-center"
        >
          <MemoryStick size="20" />4GB
        </div>
      </div>
      <div class="w-24 outline outline-[#d1d1d1] p-2 rounded max-md:hidden">
        <p class="text-center font-poppins-bold text-xl">15GB</p>
        <div
          class="flex font-poppins font-bold items-center gap-0.5 justify-center text-sm"
        >
          <CpuIcon size="16" />Storage
        </div>
      </div>
    </div>
    <p class="font-poppins font-bold text-xl  text-center max-md:flex flex-col mb-0.5 text-[#edcfb0]">
      $7.99<span class="text-sm opacity-80">/{$t("misc.month")}</span>
    </p>
<div class="flex items-center font-poppins gap-1.5 text-sm"><input type="checkbox" bind:checked={billedQuarterly}  class="toggle toggle-xs" /> Billed Quarterly</div>
<div class="divider w-full h-[1px] bg-gray-400 my-2"></div>
<ul class="list-disc font-poppins list-inside text-md">
      <li>8GB RAM</li>
      <li>32GB Storage</li>
      <li>Ryzen 7 CPUs</li>
      </ul>
    <a
      on:click={getStartedClicked}
      href="https://servers.arthmc.xyz/signup?plan=premium&quarterly={billedQuarterly}"
      target="_blank"
      rel="noreferrer"
      class="w-full"  
    >
      <div
        class="text-sm w-full h-12 px-5 cursor-pointer flex flex-col justify-center items-center bg-gradient-to-b from-[#E93843] to-[#F56922] hover:brightness-90 rounded-full text-gray-100 whiteGradientStroke font-poppins-bold text-[#ebeef5]"
      >
        {$t("landing.plans.button")}
      </div>
    </a>
  </div>
</div>

<style>
  .grayGradientStroke {
    position: relative;

    z-index: 1;
  }

  .grayGradientStroke::before {
    content: "";
    position: absolute;
    top: 0px;

    bottom: 0px;
    left: 0px;
    right: 0px;
    border-radius: inherit; /* Inherits button's border-radius */
    padding: 2px; /* Space between button and border */
    background: linear-gradient(180deg, #eeeeee9c, #ffffff00);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    z-index: -1;
  }

  .whiteGradientStroke {
    position: relative;

    z-index: 1;
  }

  .whiteGradientStroke::before {
    content: "";
    position: absolute;
    top: 0px;

    bottom: 0px;
    left: 0px;
    right: 0px;
    border-radius: inherit; /* Inherits button's border-radius */
    padding: 2px; /* Space between button and border */
    background: linear-gradient(180deg, #ffffff, #ffffff00);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    z-index: -1;
  }

    .goldGradientStroke {
    position: relative;

    z-index: 1;
  }

  .goldGradientStroke::before {
    content: "";
    position: absolute;
    top: 0px;

    bottom: 0px;
    left: 0px;
    right: 0px;
    border-radius: inherit; /* Inherits button's border-radius */
    padding: 2px; /* Space between button and border */
    background: linear-gradient(180deg, #f1d6b8, #d09670);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    z-index: -1;
  }
</style>
