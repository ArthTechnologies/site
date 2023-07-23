<script lang="ts">
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import Network from "$lib/components/ui/cards/Network.svelte";
  import HostingMain from "$lib/components/ui/cards/HostingMain.svelte";
  import Mods from "$lib/components/ui/cards/Mods.svelte";

  import { onMount } from "svelte";

  let isVisible = false;

  // Function to trigger the animation
  function showElement() {
    isVisible = true;
  }

  // Trigger the animation when the component is mounted
  onMount(showElement);
</script>

<div
  class="bg-black flex flex-col items-center min-h-screen text-white pb-48 px-5"
>
  <div class="text-5xl font-bold mt-24 text-center space-y-5">
    <span
      class=" text-7xl h-20 text-transparent bg-clip-text bg-gradient-to-tr from-orange-500 to-pink-600"
      >Arth Hosting</span
    >
    <p class="">Minecraft Servers, Simplified.</p>
  </div>
  {#if isVisible}
    <div
      class="md:flex items-center mt-24 space-x-8 space-y-5 element-container"
    >
      <img
        src="/images/ServerCard.webp"
        alt="Server Card from our Interface"
        class=""
        width="500px"
      />

      <div class="w-64">
        <p class="text-xl font-bold">An interface built from the ground up.</p>
        <p>
          Almost every hosting provider uses the same Pterodactyl® Interface. We
          felt we could do better, so we started the <a
            href="/software"
            class="text-accent hover:link">Arth Panel</a
          > project, which reimagines the Minecraft Hosting experience.
        </p>
      </div>
    </div>
    <div class="flex items-center mt-24 space-x-3 md:ml-48 element-container">
      <div class="w-64">
        <p class="text-xl font-bold">
          Play with friends on any edition.<sup
            ><a href="#footnotes" class="hover:link">1</a></sup
          >
        </p>
        <p>
          Our servers have the Geyser crossplay software built-in<sup
            ><a href="#footnotes" class="hover:link">2</a></sup
          >, which allows Bedrock Edition players to join. Almost all plugins
          will work for Bedrock players as well.
        </p>
      </div>
      <img
        src="/images/PhoneMinecraft.webp"
        alt="Minecraft on a phone, looking at a java edition player."
        class="w-[10rem] md:w-[30rem] -mb-8"
      />
    </div>
    <div class="flex items-center mt-24 space-x-3 md:ml-48 element-container">
      <img
        src="/images/RyzenCPU.webp"
        alt="AMD Ryzen CPU"
        class="w-[10rem] md:w-[30rem]"
      />
      <div class="w-64">
        <p class="text-xl font-bold">Insane performance.</p>
        <p>
          Our servers are powered by AMD Ryzen™ 7 5700X processors<sup
            ><a href="#footnotes" class="hover:link">3</a></sup
          >, and around 4GB of RAM per server, which is twice as much as the
          leading competitor<sup
            ><a href="#footnotes" class="hover:link">4</a></sup
          >'s cheapest plan.
        </p>
      </div>
    </div>

    <div class="md:flex items-center mt-24 space-y-2 md:space-x-8">
      <div class="flex flex-col items-center">
        <div>
          <span class="text-[4rem] md:text-[10rem] font-bold"
            ><s>$5</s><span
              class=" h-20 text-transparent bg-clip-text bg-gradient-to-tr from-orange-500 to-pink-600"
              >$3</span
            ><span class="text-[1rem]">/mo</span>
          </span>
        </div>
        <p class="text-2xl -mt-4 md:-mt-8 font-bold">For the rest of 2023</p>
      </div>

      <a
        href="https://servers.arthmc.xyz/signin"
        class="-mb-2 flex flex-justify center rounded-lg btn btn-outline flex bg-gradient-to-tr from-orange-500 to-pink-600 text-black pr-3 pl-4 md:btn-lg border-2 border-gray-500 space-x-1"
        target="_blank"
        rel="noreferrer"
        ><p>Servers</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-arrow-up-right"
          ><line x1="7" y1="17" x2="17" y2="7" /><polyline
            points="7 7 17 7 17 17"
          /></svg
        ></a
      >
    </div>
  {/if}

  <ul class="mt-48 w-[20rem] md:w-[50rem]" id="footnotes">
    <li>
      <sup>1</sup>The discontinued legacy console (Xbox One, Xbox 360, PS4, PS3,
      PlayStation Vita, Wii U, and New Nintendo 3DS) and Raspberry PI editions
      are not supported.
    </li>
    <li>
      <sup>2</sup>Modded plans do not include Geyser built-in as it will not
      work once mods are installed.
    </li>
    <li>
      <sup>3</sup>Each server is allotted a minimum of one core, and doesn't
      nesescarily have access to all eight cores of the processor.
    </li>
    <li>
      <sup>4</sup>The leading competitor refers to Apex Minecraft Hosting, which
      starts at $7.49 for the first month, and $9.99/mo afterwards.
    </li>
  </ul>
</div>
<!--vertical gradient from black to base 300-->
<div class="h-48 bg-gradient-to-b from-black to-base-300" />

<style>
  .element-container {
    position: relative;
    animation: dropInFadeIn 2s ease;
    opacity: 1;
  }

  @keyframes dropInFadeIn {
    0% {
      opacity: 0;
      transform: translateY(-100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
