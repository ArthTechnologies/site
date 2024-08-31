<script lang="ts">
  import { browser } from "$app/environment";
  import { t } from "$lib/scripts/i18n";
  import { UtensilsIcon } from "lucide-svelte";

  import { onMount } from "svelte";

  let isVisible = false;
  let enableShootingStars = false;

  let basicPrice = "$3.49";
  let moddedPrice = "$4.99";
  let locale;

  if (browser) {
    if (localStorage.getItem("lang") == null) locale = navigator.language;
    else locale = localStorage.getItem("lang");
    if (locale.includes("_")) {
      locale = locale.split("_")[0];
    }
    if (locale.includes("-")) {
      locale = locale.split("-")[0];
    }
    locale = locale.toUpperCase();
  }

  // Function to trigger the animation
  function showElement() {
    isVisible = true;
  }

  // Trigger the animation when the component is mounted
  onMount(() => {
    showElement();
    getBasicPrice().then((price) => {
      basicPrice = price;
    });
    getModdedPrice().then((price) => {
      moddedPrice = price;
    });
  });

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

  function getStartedClicked() {
    if (browser) {
      if (localStorage.getItem("allowAnalytics") == "true") {
        fetch("https://backend.arthmc.xyz/analytics/getStartedButtonClicked", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    }
  }

  function getBasicPrice() {
    return fetch("https://ip2c.org/s")
      .then((response) => response.text())
      .then((data) => {
        console.log("country detected: ", data.split(";")[1]);
        if (data.split(";")[1].toUpperCase() == "MX") {
          const usd = document.getElementById("usd");
          const mxn = document.getElementById("mxn");
          usd?.classList.remove("btn-neutral");
          usd?.classList.remove("hover:bg-base-100");
          usd?.classList.add("pointer-events-none");
          mxn?.classList.add("btn-neutral");
          mxn?.classList.add("hover:bg-base-100");
          mxn?.classList.remove("pointer-events-none");
          return "$60";
        } else {
          const usd = document.getElementById("usd");
          const mxn = document.getElementById("mxn");
          //hide the currency switcher
          usd?.classList.add("hidden");
          mxn?.classList.add("hidden");

          return "$3.49";
        }
      });
  }

  function getModdedPrice() {
    return fetch("https://ip2c.org/s")
      .then((response) => response.text())
      .then((data) => {
        if (data.split(";")[1].toUpperCase() == "MX") {
          return "$80";
        } else {
          return "$4.99";
        }
      });
  }
</script>

<head>
  <meta
    name="description"
    content="Rethinking Minecraft Servers. Arth Hosting was built from the ground up to have the best price, features, and convenience in the market. Basic plan available for only $3.49"
  />
</head>
<!-- background for the navbar-->
<div
  class="absolute z-[-1] top-0 w-full h-16 bg-gradient bg-gradient-to-r from-[#331200] to-[#0c0400]"
></div>
<div
  style="background-size: cover;"
  class="relative bg-[url('images/Vector.svg')] object-fit flex flex-col items-center min-h-screen text-[#efefef] pb-40 px-5 mainArea relative"
>
  <div
    class="absolute h-[60rem] w-full bg-gradient bg-gradient-to-tr from-[#280E00] to-[#000000] z-[-1]"
  ></div>
  <div class="text-5xl font-bold mt-16 text-center space-y-5">
    <span
      class=" text-5xl md:text-7xl h-20 text-transparent bg-clip-text bg-gradient-to-tr from-orange-500 to-pink-600"
      >Arth Hosting</span
    >
    <p class="max-md:text-3xl text-gray-100">{$t("main.subtitle")}</p>
  </div>
  {#if isVisible}
    <div
      class="md:flex items-center mt-14 space-x-3 md:ml-32 element-container"
    >
      <div class="w-64">
        <p class="text-xl font-bold">{$t("main.performance.title")}</p>
        <p>
          {@html $t("main.performance.desc")}
        </p>
      </div>
      <img
        src="/images/PricePerRAM_{locale}.webp"
        alt="AMD Ryzen CPU"
        class="w-[30.5rem] z-20 max-md:mt-4"
      />
    </div>

    <div
      class="flex items-center mt-14 space-x-3 md:ml-48 element-container brightness-95"
    >
      <img
        src="/images/PhoneMinecraft.webp"
        alt="Minecraft on a phone, looking at a java edition player."
        class="w-[10rem] md:w-[30rem] -mb-8 z-20 mt-12 m"
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
      class="md:flex items-center mt-16 space-x-8 space-y-5 element-container md:ml-36"
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
        class="z-20 w-[19rem] md:w-[28rem] brightness-[.70]"
      />
    </div>
    <div
      class="relative h-4 rotate-[5deg] mt-24 w-[120%] bg-gradient bg-gradient-to-r from-orange-500 to-pink-600"
    >
      <div
        class="absolute blur-lg h-4 w-full bg-gradient bg-gradient-to-r from-orange-500 to-pink-600"
      ></div>
    </div>
    <div class="md:flex items-center mt-28 space-y-2 md:space-x-8">
      <div class="flex flex-col items-center">
        <div class="flex space-x-1 justify-start w-full">
          <button
            id="usd"
            class="btn btn-sm pointer-events-none"
            on:click={() => {
              if (browser) {
                const usd = document.getElementById("usd");
                const mxn = document.getElementById("mxn");
                usd?.classList.remove("btn-neutral");
                usd?.classList.remove("hover:bg-base-100");
                usd?.classList.add("pointer-events-none");
                mxn?.classList.add("btn-neutral");
                mxn?.classList.add("hover:bg-base-100");
                mxn?.classList.remove("pointer-events-none");

                basicPrice = "$3.49";
                moddedPrice = "$4.99";
              }
            }}>$</button
          >
          <button
            id="mxn"
            class="btn btn-neutral btn-sm hover:bg-base-100"
            on:click={() => {
              if (browser) {
                const usd = document.getElementById("usd");
                const mxn = document.getElementById("mxn");
                usd?.classList.add("btn-neutral");
                usd?.classList.add("hover:bg-base-100");
                usd?.classList.remove("pointer-events-none");
                mxn?.classList.remove("btn-neutral");
                mxn?.classList.remove("hover:bg-base-100");
                mxn?.classList.add("pointer-events-none");

                basicPrice = "$60";
                moddedPrice = "$80";
              }
            }}>MX$</button
          >
        </div>
        <p class="text-2xl -mt-4 md:-mt-8 font-bold">Plans</p>
        <div class="flex space-x-4 items-center max-md:mb-4 mt-12">
          <div class="card bg-base-100 w-96 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
          </div>
          <div class="card bg-base-100 w-96 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
          </div>
          <div class="card bg-base-100 w-96 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
          </div>
        </div>
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
<!-- background for the footer-->
<div
  class="absolute bottom-0 w-full h-[40rem] md:h-48 bg-gradient bg-gradient-to-r from-[#171212] to-[#0c0400]"
></div>

<!--<button
  class="absolute -bottom-[11.7rem] right-2 text-base-100 hover:link text-sm"
  on:click={() => {
    enableShootingStars = !enableShootingStars;
  }}
>
  Easter Egg
</button>-->

<style>
  .element-container {
    position: relative;
    animation: dropInFadeIn 2s ease;
    opacity: 1;
  }

  @keyframes dropInFadeIn {
    0% {
      opacity: 0;
      transform: translateY(-70px);
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
  .mask1 {
    -webkit-mask-image: url("Vector.svg");
    mask-image: url("Vector.svg");
    mask-repeat: no-repeat;
  }
</style>
