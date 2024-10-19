<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { t } from "$lib/scripts/i18n";
  import {
    BadgeDollarSign,
    Check,
    MemoryStick,
    Cpu,
    Plug,
    ExternalLink,
  } from "lucide-svelte";

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

<div
  style="background-size: cover;"
  class="relative bg-[url('/images/landingbg.svg')] max-md:bg-[url('/images/landingbg_mobile.svg')] object-fit flex flex-col items-center min-h-screen text-[#efefef] pb-40 px-5 mainArea relative"
>
  <div
    class="-mt-16 absolute h-[60rem] min-[1000px]:h-[80rem] w-full bg-gradient bg-gradient-to-tr from-[#2f0c00] to-[#000000] z-[-1]"
  ></div>

  <div class="text-5xl font-bold mt-8 md:mt-16 text-center space-y-5">
    <span
      class=" text-5xl md:text-7xl h-20 text-transparent bg-clip-text bg-gradient-to-tr from-orange-500 to-pink-600"
      >Arth Hosting</span
    >
    <p class="max-md:text-3xl text-gray-100">{$t("main.subtitle")}</p>
  </div>
  {#if isVisible}
    <div
      class="flex max-md:flex-col-reverse items-center md:mt-14 space-x-3 md:ml-32 element-container"
    >
      <div class="w-64 text-right max-md:ml-20">
        <p class="text-xl font-bold">{$t("main.performance.title")}</p>
        <p>
          {@html $t("main.performance.desc")}
        </p>
      </div>
      <img
        src="/images/PricePerRAM_{locale}.webp"
        alt="AMD Ryzen CPU"
        class="w-[30.5rem] z-20 max-md:scale-90"
      />
    </div>
  {/if}

  <div
    class="flex max-md:flex-col max-md:gap-6 items-center max-sm:mt-24 max-sm: mb-14 mt-14 space-x-3 min-[768px]:max-[846px]:ml-20 md:ml-48 brightness-95"
  >
    <img
      src="/images/PhoneMinecraft.webp"
      alt="Minecraft on a phone, looking at a java edition player."
      class="w-[19rem] md:w-[30rem] -mb-8 z-20 mt-12 m"
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
    class="flex max-md:flex-col-reverse max-md:gap-6 items-center mt-16 md:-mt-16 min-[858px]:-mt-8 min-[1000px]:mt-0 space-x-8 space-y-5 sm:ml-36 min-[768px]:max-[846px]:ml-20 min-[768px]:max-[846px]:scale-[97%]"
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
      class="z-20 w-[19rem] min-[900px]:w-[28rem] brightness-[.70]"
    />
  </div>

  <div class="md:flex items-center mt-64 2xl:mt-[20rem] space-y-2 md:space-x-8">
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
      <p class="text-2xl mt-16 font-bold min-[1000px]:max-[1200px]:mt-96">
        {$t("plans")}
      </p>
      <div
        class="max-[820px]:-mx-5 max-[500px]:scale-90 grid md:grid-cols-2 min-[1200px]:grid-cols-3 gap-4 items-center max-md:mb-4 mt-12"
      >
        <div
          class="backdrop-blur-xl bg-opacity-75 transition duration-200 hover:-translate-y-0.5 ease-in-out rounded-xl bg-base-200 w-[110%] w-[24rem] shadow-2xl shadow-orange-950/20 hover:shadow-orange-950/40 p-6"
        >
          <div class="flex gap-5 items-center">
            <img
              src="/images/basicPlan.webp"
              class="rounded-xl h-[5.75rem] w-[9.5rem]"
            />
            <div>
              <h2 class=" mb-1">
                <span>{$t("landing.plans.basic.title")}</span>
              </h2>
              <div class="flex gap-2">
                <p class="text-accent-content text-4xl font-bold">$3.49</p>

                <p class="w-5 text-sm text-gray-400">{$t("perMonth")}</p>
              </div>
            </div>
          </div>
          <div class="flex gap-2 text-sm text-gray-300 mt-2.5">
            <p class="flex items-center gap-1">
              <Cpu size="16" class="shrink-0" />
              {$t("basic.1")}
            </p>
            <p class="flex items-center gap-1">
              <MemoryStick size="16" class="shrink-0" />
              {$t("basic.2")}
            </p>
            <p class="flex items-center gap-1">
              <Plug size="16" class="shrink-0" />{$t("basic.3")}
            </p>
          </div>
          <a
            class="btn2 btn-sm mt-4 px-4 flex gap-1.5 items-center w-fit"
            href="https://servers.arthmc.xyz/signin?plan=basic"
            target="_blank"
            rel="noreferrer"
            on:click={getStartedClicked}
          >
            {$t("landing.plans.button")}<ExternalLink
              size="18"
              class="shrink-0 -mr-1 mb-0.5"
            /></a
          >
        </div>

        <div
          class="backdrop-blur-xl bg-opacity-75 transition duration-200 hover:-translate-y-0.5 ease-in-out rounded-xl bg-base-200 w-[110%] w-[24rem] shadow-2xl shadow-orange-950/20 hover:shadow-orange-950/40 p-6"
        >
          <div class="flex gap-5 items-center">
            <img
              src="/images/moddedPlan.webp"
              class="rounded-xl h-[5.75rem] w-[9.5rem]"
            />
            <div>
              <h2 class=" mb-1">
                <span>{$t("landing.plans.modded.title")}</span>
              </h2>
              <div class="flex gap-2">
                <p class="text-accent-content text-4xl font-bold">$4.99</p>

                <p class="w-5 text-sm text-gray-400">{$t("perMonth")}</p>
              </div>
            </div>
          </div>
          <div class="flex gap-2 text-sm text-gray-300 mt-2.5">
            <p class="flex items-center gap-1">
              <Cpu size="16" class="shrink-0" />
              {$t("modded.1")}
            </p>
            <p class="flex items-center gap-1">
              <MemoryStick size="16" class="shrink-0" />
              {$t("modded.2")}
            </p>
            <p class="flex items-center gap-1">
              <Plug size="16" class="shrink-0" />{$t("modded.3")}
            </p>
          </div>
          <a
            class="btn2 btn-sm mt-4 px-4 flex gap-1.5 items-center w-fit"
            href="https://servers.arthmc.xyz/signin?plan=modded"
            target="_blank"
            rel="noreferrer"
            on:click={getStartedClicked}
          >
            {$t("landing.plans.button")}<ExternalLink
              size="18"
              class="shrink-0 -mr-1 mb-0.5"
            /></a
          >
        </div>
        <div class="md:max-[1200px]:col-span-2 w-full flex justify-center">
          <div
            class="backdrop-blur-xl bg-opacity-75 transition duration-200 hover:-translate-y-0.5 ease-in-out rounded-xl bg-base-200 w-[24rem] w-[110%] shadow-2xl shadow-orange-950/20 hover:shadow-orange-950/40 p-6"
          >
            <div class="flex gap-5 items-center">
              <img
                src="/images/premiumPlan.webp"
                class="rounded-xl h-[5.75rem] w-[9.5rem]"
              />
              <div>
                <h2 class=" mb-1">
                  <span>Premium</span>
                </h2>
                <div class="flex gap-2">
                  <p class="text-accent-content text-4xl font-bold">$7.99</p>

                  <p class="w-5 text-sm text-gray-400">{$t("perMonth")}</p>
                </div>
              </div>
            </div>
            <div class="flex gap-2 text-sm text-gray-300 mt-2.5">
              <p class="flex items-center gap-1">
                <Cpu size="16" class="shrink-0" />
                {$t("premium.1")}
              </p>
              <p class="flex items-center gap-1">
                <MemoryStick size="16" class="shrink-0" />
                {$t("premium.2")}
              </p>
              <p class="flex items-center gap-1">
                <Plug size="16" class="shrink-0" />{$t("premium.3")}
              </p>
            </div>
            <a
              class="btn2 btn-sm mt-4 px-4 flex gap-1.5 items-center w-fit"
              href="https://servers.arthmc.xyz/signin?plan=modded"
              target="_blank"
              rel="noreferrer"
              on:click={getStartedClicked}
            >
              {$t("landing.plans.button")}<ExternalLink
                size="18"
                class="shrink-0 -mr-1 mb-0.5"
              /></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full px-4 lg:px-32 mt-32">
    <p class="text-3xl font-bold text-gray-200">{$t("landing.faq.title")}</p>
    <div class="flex flex-col gap-1 w-[90%] md:w-[75%] lg:w-1/2">
      <div>
        <p class="text-xl font-bold mt-4 text-gray-100">
          {$t("landing.faq.1.title")}
        </p>
        <p class="text-gray-200">
          {@html $t("landing.faq.1.desc")}
        </p>
      </div>
      <div>
        <p class="text-xl font-bold mt-4 text-gray-100">
          {$t("landing.faq.2.title")}
        </p>
        <p class="text-gray-200">
          {@html $t("landing.faq.2.desc")}
        </p>
      </div>
      <div>
        <p class="text-xl font-bold mt-4 text-gray-100">
          {$t("landing.faq.3.title")}
        </p>
        <p class="text-gray-200">
          {@html $t("landing.faq.3.desc")}
        </p>
      </div>
      <ul class="mt-48 w-full text-sm text-gray-400" id="footnotes">
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
    </div>
  </div>

  <div
    class="shooting-stars-container relative"
    id="shootingStarsContainer"
  ></div>
</div>
<!-- background for the footer-->
<div
  class="absolute bottom-0 w-full h-[40rem] md:h-48 bg-gradient bg-gradient-to-r from-[#281818] to-[#0c0400]"
></div>

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
  .btn2 {
    font-weight: 600;
    text-transform: uppercase;

    border-radius: 0.5rem;

    border: calc(0.1rem) solid transparent;
    position: relative;
    color: #dfdfdf;

    background: linear-gradient(#15181e, #15181e),
      linear-gradient(
        #15181e 50%,
        rgba(18, 18, 19, 0.6) 80%,
        rgba(18, 18, 19, 0)
      ),
      linear-gradient(90deg, var(--orange), var(--pink));
    background-origin: border-box;
    background-clip: padding-box, border-box, border-box;
    background-size: 150%;
  }
  .btn2:hover {
    background: linear-gradient(#131518, #131518),
      linear-gradient(
        #131518 50%,
        rgba(18, 18, 19, 0.6) 80%,
        rgba(18, 18, 19, 0)
      ),
      linear-gradient(90deg, var(--orange), var(--pink));
    background-origin: border-box;
    background-clip: padding-box, border-box, border-box;
    background-size: 150%;
  }

  :root {
    --pink: #ff64f9;

    --orange: #ff6d1b;
  }
</style>
