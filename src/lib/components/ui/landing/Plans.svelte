<script>
  import { t } from "$lib/scripts/i18n";
  import { CpuIcon, MemoryStick } from "lucide-svelte";
</script>

<div
  class=" relative flex md:gap-5 max-md:overflow-x-scroll w-screen md:justify-center mt-10"
>
  <div
    class="max-md:scale-90 flex flex-col items-center gap-2.5 bg-base-300 bg-opacity-80 rounded-2xl px-3 md:px-6 py-5 grayGradientStroke"
  >
    <p class="font-poppins-bold text-3xl text-center mb-1.5 md:mb-3">
      {$t("landing.plans.basic.title")}
    </p>
    <!-- Small Plan Specs-->
    <div class="md:hidden flex gap-5 mb-3 w-64 justify-center">
      <div
        class=" flex font-poppins font-bold items-center gap-1 justify-center"
      >
        <MemoryStick size="20" />3GB RAM
      </div>

      <div
        class="flex font-poppins font-bold items-center gap-1 justify-center"
      >
        <CpuIcon size="20" />Ryzen 7 CPU
      </div>
    </div>
    <!-- Medium+ Plan Specs-->
    <div class="max-md:hidden flex gap-5 mb-6">
      <div class="w-24 outline p-2 rounded">
        <p class="text-center font-poppins-bold text-xl">3GB</p>
        <div
          class="flex font-poppins font-bold items-center gap-1 justify-center"
        >
          <MemoryStick size="20" />RAM
        </div>
      </div>
      <div class="w-24 outline p-2 rounded">
        <p class="text-center font-poppins-bold text-xl">Ryzen 7</p>
        <div
          class="flex font-poppins font-bold items-center gap-1 justify-center"
        >
          <CpuIcon size="20" />CPU
        </div>
      </div>
    </div>
    <p class="font-poppins-bold text-5xl text-center">
      $3.49<span class="text-sm">/{$t("misc.month")}</span>
    </p>
    <a
      href="https://servers.arthmc.xyz/signin"
      target="_blank"
      rel="noreferrer"
    >
      <div
        class="w-fit h-12 px-5 cursor-pointer flex items-center bg-gradient-to-b from-[#E93843] to-[#F56922] hover:brightness-90 rounded-full text-white whiteGradientStroke font-poppins-bold"
      >
        {$t("landing.plans.button")}
      </div>
    </a>
  </div>
  <div
    class="max-md:scale-90 flex flex-col items-center gap-2.5 bg-base-300 bg-opacity-80 rounded-2xl px-3 md:px-6 py-5 grayGradientStroke"
  >
    <p class="font-poppins-bold text-3xl text-center mb-1.5 md:mb-3">
      {$t("landing.plans.modded.title")}
    </p>
    <!-- Small Plan Specs-->
    <div class="md:hidden flex gap-5 mb-3 w-64 justify-center">
      <div
        class=" flex font-poppins font-bold items-center gap-1 justify-center"
      >
        <MemoryStick size="20" />4GB RAM
      </div>

      <div
        class="flex font-poppins font-bold items-center gap-1 justify-center"
      >
        <CpuIcon size="20" />Ryzen 7 CPU
      </div>
    </div>
    <!-- Medium+ Plan Specs-->
    <div class="max-md:hidden flex gap-5 mb-6">
      <div class="w-24 outline p-2 rounded">
        <p class="text-center font-poppins-bold text-xl">4GB</p>
        <div
          class="flex font-poppins font-bold items-center gap-1 justify-center"
        >
          <MemoryStick size="20" />RAM
        </div>
      </div>
      <div class="w-24 outline p-2 rounded">
        <p class="text-center font-poppins-bold text-xl">Ryzen 7</p>
        <div
          class="flex font-poppins font-bold items-center gap-1 justify-center"
        >
          <CpuIcon size="20" />CPU
        </div>
      </div>
    </div>
    <p class="font-poppins-bold text-5xl text-center">
      $4.99<span class="text-sm">/{$t("misc.month")}</span>
    </p>
    <a
      href="https://servers.arthmc.xyz/signin"
      target="_blank"
      rel="noreferrer"
    >
      <div
        class="w-fit h-12 px-5 cursor-pointer flex items-center bg-gradient-to-b from-[#E93843] to-[#F56922] hover:brightness-90 rounded-full text-white whiteGradientStroke font-poppins-bold"
      >
        {$t("landing.plans.button")}
      </div>
    </a>
  </div>
  <div
    class="max-md:scale-90 flex flex-col items-center gap-2.5 bg-base-300 bg-opacity-80 rounded-2xl px-3 md:px-6 py-5 grayGradientStroke"
  >
    <p class="font-poppins-bold text-3xl text-center mb-1.5 md:mb-3">
      {$t("landing.plans.premium.title")}
    </p>
    <!-- Small Plan Specs-->
    <div class="md:hidden flex gap-5 mb-3 w-64 justify-center">
      <div
        class=" flex font-poppins font-bold items-center gap-1 justify-center"
      >
        <MemoryStick size="20" />8GB RAM
      </div>

      <div
        class="flex font-poppins font-bold items-center gap-1 justify-center"
      >
        <CpuIcon size="20" />Ryzen 7 CPU
      </div>
    </div>
    <!-- Medium+ Plan Specs-->
    <div class="max-md:hidden flex gap-5 mb-6">
      <div class="w-24 outline p-2 rounded">
        <p class="text-center font-poppins-bold text-xl">8GB</p>
        <div
          class="flex font-poppins font-bold items-center gap-1 justify-center"
        >
          <MemoryStick size="20" />RAM
        </div>
      </div>
      <div class="w-24 outline p-2 rounded">
        <p class="text-center font-poppins-bold text-xl">Ryzen 7</p>
        <div
          class="flex font-poppins font-bold items-center gap-1 justify-center"
        >
          <CpuIcon size="20" />CPU
        </div>
      </div>
    </div>
    <p class="font-poppins-bold text-5xl text-center">
      $7.99<span class="text-sm">/{$t("misc.month")}</span>
    </p>
    <a
      href="https://servers.arthmc.xyz/signin"
      target="_blank"
      rel="noreferrer"
    >
      <div
        class="w-fit h-12 px-5 cursor-pointer flex items-center bg-gradient-to-b from-[#E93843] to-[#F56922] hover:brightness-90 rounded-full text-white whiteGradientStroke font-poppins-bold"
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
</style>
