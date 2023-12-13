<script lang="ts">
  import { browser } from "$app/environment";
  import { t } from "$lib/scripts/i18n";

  import { onMount } from "svelte";

  let isVisible = false;

  // Function to trigger the animation
  function showElement() {
    isVisible = true;
  }

  // Trigger the animation when the component is mounted
  onMount(showElement);

  function createShootingStar() {
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
          duration: 5000,
          easing: "ease",
          fill: "forwards",
        },
      );
      setTimeout(() => {
        star.remove();
      }, 5000);
    }
  }

  if (browser) {
    //if the browser can handle the animation, this creates a shooting star every 750ms
    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      setInterval(createShootingStar, 600);
    }
  }
</script>

<div
  class="bg-black flex flex-col items-center min-h-screen text-[#efefef] pb-48 px-5 mainArea"
>
  <div class="text-5xl font-bold mt-24 text-center space-y-5">
    <span
      class=" text-7xl h-20 text-transparent bg-clip-text bg-gradient-to-tr from-orange-500 to-pink-600"
      >Arth Hosting</span
    >
    <p class="">{$t("main.subtitle")}</p>
  </div>
  {#if isVisible}
    <div
      class="md:flex items-center mt-24 space-x-8 space-y-5 element-container"
    >
      <img
        src="/images/ServerCard.webp"
        alt="Server Card from our Interface"
        class="z-20"
        width="500px"
      />

      <div class="w-64">
        <p class="text-xl font-bold">{$t("main.interface.title")}</p>
        <p>
          {@html $t("main.interface.desc")}
        </p>
      </div>
    </div>
    <div class="flex items-center mt-24 space-x-3 md:ml-48 element-container">
      <div class="w-64">
        <p class="text-xl font-bold">
          {$t("main.crossplay.title")}<sup
            ><a href="#footnotes" class="hover:link">1</a></sup
          >
        </p>
        <p>
          {@html $t("main.crossplay.desc")}
        </p>
      </div>
      <img
        src="/images/PhoneMinecraft.webp"
        alt="Minecraft on a phone, looking at a java edition player."
        class="w-[10rem] md:w-[30rem] -mb-8 z-20"
      />
    </div>
    <div class="flex items-center mt-24 space-x-3 md:ml-48 element-container">
      <img
        src="/images/RyzenCPU.webp"
        alt="AMD Ryzen CPU"
        class="w-[10rem] md:w-[30rem] z-20"
      />
      <div class="w-64">
        <p class="text-xl font-bold">{$t("main.performance.title")}</p>
        <p>
          {@html $t("main.performance.desc")}
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
            ><span class="text-[1rem]">{$t("mo")}</span>
          </span>
        </div>
        <p class="text-2xl -mt-4 md:-mt-8 font-bold">
          {$t("hosting.price")}
        </p>
      </div>

      <a
        href="https://servers.arthmc.xyz/signin"
        class="-mb-2 flex flex-justify center rounded-lg btn btn-outline flex bg-gradient-to-tr from-orange-500 to-pink-600 text-black pr-3 pl-4 md:btn-lg border-2 border-gray-500 space-x-1"
        target="_blank"
        rel="noreferrer"
        ><p>{$t("servers")}</p>
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
      <sup>1</sup>{$t("main.footnote1")}
    </li>
    <li>
      <sup>2</sup>{$t("main.footnote2")}
    </li>
    <li>
      <sup>3</sup>{$t("main.footnote3")}
    </li>
    <li>
      <sup>4</sup>{$t("main.footnote4")}
    </li>
  </ul>
  <div
    class="shooting-stars-container relative"
    id="shootingStarsContainer"
  ></div>
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
