<script lang="ts">
  import { API_URL } from "$lib/scripts/config";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import Plans from "$lib/components/ui/landing/Plans.svelte";
  import { t } from "$lib/scripts/i18n";
  import { BadgeCheck, MemoryStick, CpuIcon, CupSodaIcon, Globe2, Globe, Upload, Users, SettingsIcon } from "lucide-svelte";

  import { onMount } from "svelte";

  let isVisible = false;
  let enableShootingStars = false;

  let basicPrice = "$3.49";
  let plusPrice = "$4.99";
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
    getPlusPrice().then((price) => {
      plusPrice = price;
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
        let referrer = localStorage.getItem("referrer") || "";
        fetch(`${API_URL}/analytics/getStartedButtonClicked?referrer=` + encodeURIComponent(referrer), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }).catch((err) => {
          console.error("Analytics fetch failed:", err.message);
        });
      }
    }
  }

  function getBasicPrice() {
    return fetch("https://ip2c.org/s")
      .then((response) => response.text())
      .then((data) => {
        console.log("country detected: ", data.split(";")[1]);
        if (data.split(";")[1]?.toUpperCase() == "MX") {
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
      })
      .catch((err) => {
        console.error("IP geolocation fetch failed:", err.message);
        return "$3.49";
      });
  }

  function getPlusPrice() {
    return fetch("https://ip2c.org/s")
      .then((response) => response.text())
      .then((data) => {
        if (data.split(";")[1]?.toUpperCase() == "MX") {
          return "$80";
        } else {
          return "$4.99";
        }
      })
      .catch((err) => {
        console.error("IP geolocation fetch failed:", err.message);
        return "$4.99";
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
  class="relative -mt-16 bg-[url('/images/hostingbg.webp?v=2')] flex flex-col items-center sm:h-[57rem] xl:h-[67rem] text-[#efefef] pb-40 px-5 mainArea relative"
>
  <div
    class="-mt-16 absolute h-[60rem] min-[1000px]:h-[80rem] w-full bg-gradient-to-b from-[#483b4d] to-[#66582f] z-[-1]"
  ></div>

  <div
    class="text-white max-md:hidden mt-36 xl:mt-32 px-4 py-2 bg-green-600 rounded-full text-gray-300 font-semibold text-sm flex items-center gap-2"
  >
    <BadgeCheck size="16" class="shrink-0" />
    {$t("landing.subtitle")}
  </div>
  <b
    class="text-white leading-tight mt-40 max-md:mb-10 mb-1.5 xl:mb-6 md:mt-5 font-bold text-4xl md:text-5xl lg:text-6xl lg:w-[65rem] text-center font-poppins-bold"
  >
    {$t("landing.title")}
  </b>
<iframe src="https://status.arthmc.xyz/badge?theme=dark" class="mt-6 -mb-4 bg-[#222838] pl-1 w-[182px] rounded-lg shadow-sm" height="30" frameborder="0" scrolling="no" style="color-scheme: normal"></iframe>
  <Plans />
</div>

<div
  style="background-size: cover;"
  class="relative -mt-96 lg:-mt-56 xl:-mt-[22rem] 2xl:-mt-96 bg-[url('/images/hostingbg2.svg?v=2')] object-fit max-md:bg-center flex flex-col  min-h-screen text-[#efefef] pb-96 px-5 mainArea relative"
>
  <div class="flex max-md:flex-col gap-6 md:gap-12 mt-96 md:mt-64 lg:ml-16 2xl:ml-36 md:h-[25rem] justify-start">
    <img src="/images/Panel.webp?v=3" class=" rounded-3xl z-10 h-[64vw] sm:h-[58vw] md:h-[30vw] lg:h-[31.3vw] xl:h-[25rem]" />
    <img
      src="/images/Panel2.svg?v=2"
      class="absolute -left-10 -top-10 blur-3xl opacity-75"
    />
    <div class=" z-10 flex flex-col justify-between h-min">
<div class=" sm:w-2/3 md:w-[20rem] lg:w-[23rem] xl:w-[27rem]">
  <p class="text-3xl lg:text-[2rem] xl:text-4xl font-poppins-bold mt-2 mb-6 md:leading-[2.8rem]">
    Simplicity, built from the ground up.
  </p>
  <p class="font-poppins w-[90%] text-[.95rem] lg:text-base">
    Our custom open-source panel makes everything easy. Install Geyser crossplay, Dynmap and more with zero configuration on your end.
  </p>
</div>
      <img src="/images/Panel3.svg?v=2" class="w-[25rem] xl:w-[27rem] mt-4" />
    </div>
  </div>
    <div class="flex flex-row-reverse max-md:flex-col-reverse gap-6 md:gap-12 mt-24 lg:mr-16 2xl:mr-80 md:h-[16rem] justify-start">
<div class="grid grid-cols-2 gap-8 h-fit scale-[80%] -ml-6">  
  <div class="flex gap-2 w-52 h-fit">
    <CpuIcon size=32 color="#edcfb0" class="flex-shrink-0"/>
    <div class="flex flex-col h-min"><b>4 Shared vCPUs</b><p>Reliable, fast performance.</p></div>
  </div>
    <div class="flex gap-2 w-52 h-fit">
    <Globe size=32 color="#edcfb0" class="flex-shrink-0"/>
    <div class="flex flex-col h-min"><b>Custom Subdomains</b><p>Choose an address like [name].arthmc.xyz</p></div>
  </div>
      <div class="flex gap-2 w-52 h-fit">
    <SettingsIcon size=32 color="#edcfb0" class="flex-shrink-0"/>
    <div class="flex flex-col h-min"><b>Power users</b><p class="w-[90%]">SFTP access and 2 extra ports available.</p></div>
  </div>
        <div class="flex gap-2 w-52 h-fit">
    <Users size=32 color="#edcfb0" class="flex-shrink-0"/>
    <div class="flex flex-col h-min"><b>Player Manager</b><p>Manage on & offline players from the panel.</p></div>
  </div>
  </div>

    <div class=" z-10 flex flex-col justify-between h-min">
<div class=" sm:w-2/3 md:w-[20rem] lg:w-[23rem] xl:w-[27rem] flex flex-col items-end">
  <p class="text-3xl lg:text-[2rem] xl:text-4xl font-poppins-bold mt-2 mb-6 md:leading-[2.8rem] text-right">
    Capable of anything you need.
  </p>
  <p class="font-poppins w-[80%] text-[.95rem] lg:text-base text-right">
    We give you all of the tools and power for whatever you need.
  </p>
</div>
     
    </div>
  </div>
  <div
    class="flex max-md:flex-col-reverse gap-5 justify-center max-md:mt-24 lg:mr-72 mb-16 max-lg:items-end"
  >
    <div class="md:w-1/3 z-10 text-right flex flex-col items-end max-md:flex-col-reverse">
<div class="flex flex-col items-end">
  <p class="text-3xl lg:text-[2rem] xl:text-4xl font-poppins-bold mt-12 mb-6">
    Unmatched pricing.
  </p>
  <p class="font-poppins w-[88%] md:w-[64%]">
    By cutting down on middlemen, we can offer unmatched pricing for all plans. At $1/GB of ram, we're less than half the price of the competition.
  </p>
</div>
      <img
      src="/images/Performance2.svg?v=2"
      class="z-10  h-[4.5rem] mt-7"
    />
    </div>
    <img
      src="/images/Performance1.svg?v=2"
      class="z-10  sm:w-[75%] md:w-fit md:h-64 lg:h-80"
    />
  </div>
  <p class="font-pippins font-bold text-center w-full  text-xl -mb-7 mt-24">
    {$t("landing.plans.title2")}
  </p>
  <div class="-ml-5">
    <Plans />
  </div>
  <p class="font-pippins font-bold text-left flex scale-90 w-[95%] text-xl mt-32">
    {$t("landing.faq.title")}
  </p>
  <div class="max-lg:text-sm flex flex-col gap-2 mt-2.5 scale-90 w-[95%]">
    <div
      tabindex="0"
      class="md:w-2/3 collapse collapse-arrow border-base-300 bg-base-200 border"
    >
      <div class="collapse-title text-lg font-medium">
        {@html $t("landing.faq.1.title")}
      </div>
      <div class="collapse-content">
        <p>{@html $t("landing.faq.1.desc")}</p>
      </div>
    </div>
    <div
      tabindex="0"
      class="md:w-2/3 collapse collapse-arrow border-base-300 bg-base-200 border"
    >
      <div class="collapse-title text-xl font-medium">
        {@html $t("landing.faq.2.title")}
      </div>
      <div class="collapse-content">
        <p>{@html $t("landing.faq.2.desc")}</p>
      </div>
    </div>
    <div
      tabindex="0"
      class="md:w-2/3 collapse collapse-arrow border-base-300 bg-base-200 border"
    >
      <div class="collapse-title text-xl font-medium">
        {$t("landing.faq.3.title")}
      </div>
      <div class="collapse-content">
        <p>{$t("landing.faq.3.desc")}</p>
      </div>
    </div>
  </div>
</div>

<!-- background for the footer-->
<div
  class="absolute bottom-0 w-full h-[40rem] md:h-48 bg-gradient bg-gradient-to-r from-blue-950 to-sky-950"
></div>
