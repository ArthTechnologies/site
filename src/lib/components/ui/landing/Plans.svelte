<script>
  import { browser } from "$app/environment";
  import { t } from "$lib/scripts/i18n";
  import { CpuIcon, MemoryStick } from "lucide-svelte";

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
  class=" relative flex gap-1 md:gap-5 max-md:overflow-x-scroll w-screen justify-center mt-10"
>
  <div
    class="max-md:w-48 flex flex-col items-center gap-2.5 bg-base-300 bg-opacity-[85%] backdrop-blur-[1px] rounded-2xl px-3 md:px-6 py-5 grayGradientStroke"
  >
    <p class="font-poppins-bold text-[1.25rem] md:text-3xl text-center -mb-3 md:mb-3">
      {$t("landing.plans.basic.title")}
    </p>

    <div class=" flex gap-4 -mb-3.5 md:mb-3.5">
      <div class="max-md:hidden w-20 outline p-2 rounded">
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
    <p class="font-poppins-bold text-3xl md:text-[51px] mt-2 text-center max-md:flex flex-col mb-1.5">
      $3.99<span class="text-sm">/{$t("misc.monthShort")}</span>
    </p>
    <a
      on:click={getStartedClicked}
      href="https://servers.arthmc.xyz/signup?plan=basic"
      target="_blank"
      rel="noreferrer"
    >
      <div
        class="text-sm w-fit h-12 px-5 cursor-pointer flex items-center bg-gradient-to-b from-[#E93843] to-[#F56922] hover:brightness-90 rounded-full text-gray-300 whiteGradientStroke font-poppins-bold text-[#ebeef5]"
      >
        {$t("landing.plans.button")}
      </div>
    </a>
  </div>
  <div
    class="max-md:w-48 flex flex-col items-center gap-2.5 bg-base-300 bg-opacity-[85%] backdrop-blur-[1px] rounded-2xl px-3 md:px-6 py-5 grayGradientStroke"
  >
    <p class="font-poppins-bold text-[1.25rem] md:text-3xl text-center -mb-3 md:mb-3">
      {$t("landing.plans.plus.title")}
    </p>
    <div class=" flex gap-4 -mb-3.5 md:mb-3.5">
      <div class="max-md:hidden w-20 outline p-2 rounded">
        <p class="text-center font-poppins-bold text-xl ">8GB</p>
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
          <MemoryStick size="20" />6GB
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
    <p class="font-poppins-bold text-3xl md:text-[51px] mt-2 text-center max-md:flex flex-col mb-1.5">
      $5.99<span class="text-sm">/{$t("misc.monthShort")}</span>
    </p>
    <a
      on:click={getStartedClicked}
      href="https://servers.arthmc.xyz/signup?plan=plus"
      target="_blank"
      rel="noreferrer"
    >
      <div
        class="text-sm w-fit h-12 px-5 cursor-pointer flex items-center bg-gradient-to-b from-[#E93843] to-[#F56922] hover:brightness-90 rounded-full text-gray-300 whiteGradientStroke font-poppins-bold text-[#ebeef5]"
      >
        {$t("landing.plans.button")}
      </div>
    </a>
  </div>
  <div
    class="max-md:w-48 flex flex-col items-center gap-2.5 bg-base-300 bg-opacity-[85%] backdrop-blur-[1px] rounded-2xl px-3 md:px-6 py-5 goldGradientStroke"
  >
    <p class="font-poppins-bold text-[1.25rem] md:text-3xl text-center -mb-3 md:mb-3">
      {$t("landing.plans.premium.title")}
    </p>

    <div class=" flex gap-4 -mb-3.5 md:mb-3.5">
      <div class="max-md:hidden w-20 outline p-2 rounded outline-[#edcfb0] text-[#edcfb0]">
        <p class="text-center font-poppins-bold text-xl ">8GB</p>
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
          <MemoryStick size="20" />8GB
        </div>
      </div>
      <div class="w-24 outline outline-[#d1d1d1] p-2 rounded max-md:hidden">
        <p class="text-center font-poppins-bold text-xl">20GB</p>
        <div
          class="flex font-poppins font-bold items-center gap-0.5 justify-center text-sm"
        >
          <CpuIcon size="16" />Storage
        </div>
      </div>
    </div>
    <p class="font-poppins-bold text-3xl md:text-[51px] mt-2 text-center max-md:flex flex-col mb-1.5">
      $7.99<span class="text-sm">/{$t("misc.monthShort")}</span>
    </p>
    <a
      on:click={getStartedClicked}
      href="https://servers.arthmc.xyz/signup?plan=premium"
      target="_blank"
      rel="noreferrer"
    >
      <div
        class="text-sm w-fit h-12 px-5 cursor-pointer flex items-center bg-gradient-to-b from-[#E93843] to-[#F56922] hover:brightness-90 rounded-full text-gray-300 whiteGradientStroke font-poppins-bold text-[#ebeef5]"
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
