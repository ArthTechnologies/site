<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import Plans from "$lib/components/ui/landing/Plans.svelte";
  import { t } from "$lib/scripts/i18n";
  import { BadgeCheck, MemoryStick, CpuIcon } from "lucide-svelte";

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
  class="relative -mt-16 bg-[url('/images/hostingbg.webp')] flex flex-col items-center xl:h-[120vh] text-[#efefef] pb-40 px-5 mainArea relative"
>
  <div
    class="-mt-16 absolute h-[60rem] min-[1000px]:h-[80rem] w-full bg-[#66582f] z-[-1]"
  ></div>

  <div
    class="max-md:hidden mt-40 px-4 py-2 bg-green-600 rounded-full text-white font-semibold text-sm flex items-center gap-2"
  >
    <BadgeCheck size="16" class="shrink-0" />
    Experience unmatched price for performance and exclusive features on every plan.
  </div>
  <b
    class="leading-tight mt-40 mb-20 md:mt-6 font-bold text-4xl md:text-6xl lg:text-7xl lg:w-[65rem] text-center font-poppins-bold"
  >
    Quality Minecraft Hosting at Affordable Prices
  </b>
  <p
    class="font-poppins-bold text-left w-full md:w-[800px] text-xl -mb-12 md:hidden"
  >
    Plans
  </p>
  <Plans />
</div>
<div
  style="background-size: cover;"
  class="relative -mt-60 sm:-mt-40 xl:-mt-96 bg-[url('/images/hostingbg2.svg')] object-fit flex flex-col items-center min-h-screen text-[#efefef] pb-96 px-5 mainArea relative"
>
  <div class="md:flex gap-5 mt-60 sm:ml-24">
    <img src="/images/Panel.webp" class="z-10 h-56 sm:h-64 md:h-[17rem]" />
    <img
      src="/images/Panel2.svg"
      class="absolute left-0 -top-10 blur-2xl opacity-90"
    />
    <div class="w-[85%] md:w-1/3 z-10">
      <p class="text-4xl font-poppins-bold mt-12 mb-6">
        An experience built from the ground up.
      </p>
      <p class="font-poppins w-[90%]">
        Most leading hosting providers base their panels off of the exact same
        software, so we started the open-source <a
          target="_blank"
          rel="noreferrer"
          href="/software"
          class="text-accent hover:link">Arth Panel</a
        > project to reimagine the user experience with countless ease of use features
        not seen on any other hosting service.
      </p>
    </div>
  </div>
  <div
    class="flex max-md:flex-col-reverse gap-5 mt-32 justify-end md:mr-32 mb-16"
  >
    <div class="md:w-1/3 z-10 text-right flex flex-col items-end">
      <p class="text-4xl font-poppins-bold mt-12 mb-6">Insane Performance.</p>
      <p class="font-poppins w-[90%]">
        Our servers are powered by AMD Ryzen™ 7 5700X processors, and have a
        better price for performance than all of the leading competitors.
      </p>
    </div>
    <img src="/images/PricePerRAM_EN.webp" class="z-10 h-60 md:h-80" />
  </div>
  <p class="font-pippins font-bold text-left w-full md:w-[800px] text-xl -mb-7">
    All Plans
  </p>
  <Plans />
</div>

<!-- background for the footer-->
<div
  class="absolute bottom-0 w-full h-[40rem] md:h-48 bg-gradient bg-gradient-to-r from-blue-950 to-sky-950"
></div>
