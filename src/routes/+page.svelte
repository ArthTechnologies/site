<script lang="ts">
  import { browser } from "$app/environment";
  import { t } from "$lib/scripts/i18n";

  import { onMount } from "svelte";

  let isVisible = false;
  let enableShootingStars = false;

  // Function to trigger the animation
  function showElement() {
    isVisible = true;
  }

  // Trigger the animation when the component is mounted
  onMount(showElement);

  function createShootingStar() {
    if (enableShootingStars) {
      console.log("createShootingStar");
      const container = document.getElementById("shootingStarsContainer");

      if (container) {
        const star = document.createElement("div");
        star.classList.add("shooting-star");
        star.classList.add("absolute");
        star.classList.add("w-1");
        star.classList.add("h-10");
        star.classList.add("bg-gradient-to-tr");
        star.classList.add("from-orange-500");
        star.classList.add("to-pink-600");
        star.classList.add("rounded-full");
        star.classList.add("z-[-1]");
        star.classList.add("opacity-80");

        const randomX = Math.random() * 100;
        const randomY = Math.random() * 5 - 5;

        star.style.left = `${randomX}vw`;
        star.style.top = `${randomY}vh`;

        container.appendChild(star);
        //play shooting star animation
        star.animate(
          [
            { transform: "translateY(0) rotate(0deg)", opacity: 0 },
            { opacity: 1 },
            { transform: "translateY(300vh)", opacity: 0 },
          ],
          {
            duration: 4500,
            easing: "ease",
            fill: "forwards",
          }
        );

        setTimeout(() => {
          star.remove();
        }, 4500);
      }
    }
  }

  if (browser) {
    //if the browser can handle the animation, this creates a shooting star every 750ms
    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      setInterval(createShootingStar, 300);
    }
  }
</script>

<div
  class="bg-black flex flex-col items-center min-h-screen text-[#efefef] pb-32 px-5 mainArea"
>
  <div class="text-5xl font-bold mt-16 text-center space-y-5">
    <span
      class=" text-7xl h-20 text-transparent bg-clip-text bg-gradient-to-tr from-orange-500 to-pink-600"
      >Arth Hosting</span
    >
    <p class="">{$t("main.subtitle")}</p>
  </div>
  {#if isVisible}
    <div class="flex items-center mt-14 space-x-3 md:ml-32 element-container">
      <div class="w-64">
        <p class="text-xl font-bold">{$t("main.performance.title")}</p>
        <p>
          {@html $t("main.performance.desc")}
        </p>
      </div>
      <img
        src="/images/PricePerRAM.webp"
        alt="AMD Ryzen CPU"
        class="w-[10rem] md:w-[30rem] z-20"
      />
    </div>

    <div class="flex items-center mt-14 space-x-3 md:ml-48 element-container">
      <img
        src="/images/PhoneMinecraft.webp"
        alt="Minecraft on a phone, looking at a java edition player."
        class="w-[10rem] md:w-[30rem] -mb-8 z-20"
      />
      <div class="w-64">
        <p class="text-xl font-bold">
          {$t("main.crossplay.title")}<sup
            ><a href="#footnotes" class="hover:link">2</a></sup
          >
        </p>
        <p>
          {@html $t("main.crossplay.desc")}
        </p>
      </div>
    </div>
    <div
      class="md:flex items-center mt-16 space-x-8 space-y-5 element-container ml-36"
    >
      <div class="w-64">
        <p class="text-xl font-bold">{$t("main.interface.title")}</p>
        <p>
          {@html $t("main.interface.desc")}
        </p>
      </div>
      <img
        src="/images/ServerCard.webp"
        alt="Server Card from our Interface"
        class="z-20"
        width="450px"
      />
    </div>

    <div class="md:flex items-center mt-24 space-y-2 md:space-x-8">
      <div class="flex flex-col items-center">
        <div class="flex space-x-4 items-center">
          <div>
            <p class="text-2xl -mt-4 md:-mt-8 font-bold">{$t("basic")}</p>
            <span class="text-[4rem] md:text-[5.5rem] font-bold"
              ><span class=" h-20 opacity-90">$3.49</span><span
                class="text-[1rem]">{$t("mo")}</span
              >
            </span>
          </div>
          <div class="divider divider-horizontal h-24 mt-7"></div>
          <div>
            <p class="text-2xl -mt-4 md:-mt-8 font-bold">{$t("modded")}</p>
            <span class="text-[4rem] md:text-[5.5rem] font-bold"
              ><span class=" h-20 opacity-90">$4.99</span><span
                class="text-[1rem]">{$t("mo")}</span
              >
            </span>
          </div>
        </div>

        <a
          href="https://servers.arthmc.xyz/signin"
          class="-mb-1 flex rounded-lg btn btn-outline bg-gradient-to-tr from-orange-500 to-pink-600 text-black pr-3 pl-4 md:btn-lg border-2 border-gray-500 space-x-1 w-3/5"
          target="_blank"
          rel="noreferrer"
          ><p>{$t("signup")}</p>
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
    </div>
  {/if}

  <ul class="mt-48 w-[20rem] md:w-[50rem]" id="footnotes">
    <li class="mb-1.5">
      {$t("main.regionsFootnote")}
    </li>
    <li>
      <sup>1</sup>{$t("main.footnote1")}
    </li>
    <li>
      <sup>2</sup>{$t("main.footnote2")}
    </li>
    <li>
      <sup>3</sup>{$t("main.footnote3")}
    </li>
  </ul>
  <div
    class="shooting-stars-container relative"
    id="shootingStarsContainer"
  ></div>
</div>
<!--vertical gradient from black to base 300-->
<div class="h-64 bg-gradient-to-b from-black to-neutral relative">
  <button
    class="absolute -bottom-[11.7rem] right-2 text-base-100 hover:link text-sm"
    on:click={() => {
      enableShootingStars = !enableShootingStars;
    }}
  >
    Easter Egg
  </button>
</div>

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

  .shooting-stars-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10; /* Adjust the z-index as needed */
  }

  @keyframes shootingStarAnimation {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
</style>
