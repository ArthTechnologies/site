<script lang="ts">
  import ThemeToggle from "./../ui/ThemeToggle.svelte";
  import Helper from "./../ui/Helper.svelte";
  let Webname = "Arth Panel";

  type NavType = "default" | "welcome";

  export let navType: NavType;
  import { t, locale, locales } from "$lib/scripts/i18n";
  import { onMount } from "svelte";
  import LanguageSwitcher from "../ui/LanguageSwitcher.svelte";
  import { browser } from "$app/environment";
  import { ChevronDown, Home } from "lucide-svelte";

  //set locale to browser language if navigator is available
  if (typeof navigator !== "undefined") {
    locale.set(navigator.language);
  }
  let referrer = "none";
  let campaign_name = "none"; 
  if (navType === "dark") {
    bgColor = "bg-base-300";
  }
  onMount(() => {
    window.addEventListener("click", handleWindowClick);
    setInterval(() => {
      referrer = localStorage.getItem("referrer") || "none";
      campaign_name = localStorage.getItem("campaign_name") || "none";  
    }, 1000);
  });
  function handleWindowClick(event) {
    const dropdown = document.getElementById("dropdown");

    // Check if the clicked element is outside of the dropdown
    if (dropdown && !dropdown.contains(event.target)) {
      closeDropdown();
    }
  }

  function closeDropdown() {
    document.getElementById("dropdown").open = false;
  }

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

<div class=" h-[92px] w-full flex items-center justify-center font-poppins">
  <div
    class=" h-[58px] max-sm:scale-90 w-full sm:w-[85%] xl:w-[1200px] flex justify-between items-center z-10 text-white"
  >
    <a href="/" class="btn px-2 btn-ghost">
      <img src="/brand/hosting-full.svg" class="max-xl:hidden h-[1.5rem]" />
      <img
        src="/images/hosting-logo.svg"
        class="xl:hidden h-[1.5rem] scale-150"
      />
    </a>
    <div class="flex gap-1 sm:gap-3 items-center">
      <a href="/"
        ><button class="max-md:hidden px-2 py-1 btn-ghost rounded-lg"
          >{$t("navbar.home")}</button
        >
      </a>
      <a href="/articles"
        ><button class=" px-2 py-1 btn-ghost rounded-lg max-sm:hidden"
          >{$t("navbar.articles")}</button
        ></a
      >

      <div class="dropdown dropdown-end">
        <div
          tabindex="0"
          role="button"
          class=" px-2 py-1 btn-ghost rounded-lg flex items-center gap-1"
        >
          <p class="max-md:hidden">{$t("navbar.more")}</p>
          <p class="md:hidden">{$t("navbar.pages")}</p>
          <ChevronDown size="16" class="mt-0.5" />
        </div>

        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow bg-opacity-75 backdrop-blur mt-1"
        >
          <li>
            <a class="sm:hidden" href="/articles">{$t("navbar.articles")}</a>
          </li>
          <li><a href="/software">{$t("navbar.software")}</a></li>
          <li><a href="/infrastructure">Infrastructure</a></li>
          <li><a href="/privacy">{$t("navbar.privacyPolicy")}</a></li>
          <li>
            <a href="https://status.arthmc.xyz/">{$t("navbar.status")}</a>
          </li>
        </ul>
      </div>

      <LanguageSwitcher />
      <a
        href="https://servers.arthmc.xyz/login"
        target="_blank"
        rel="noreferrer"
      >
        <div
          class="max-lg:hidden h-12 mx-2 px-5 cursor-pointer flex items-center bg-white hover:bg-gray-300 rounded-full text-black border-0"
        >
          {$t("navbar.login")}
        </div></a
      >
      <a
        on:click={getStartedClicked}
        href="https://servers.arthmc.xyz/signup?referrer={referrer}&campaign_name={campaign_name}"
        target="_blank"
        rel="noreferrer"
      >
        <div
          class="h-12 px-5 cursor-pointer flex items-center bg-gradient-to-b from-[#E93843] to-[#F56922] hover:brightness-90 rounded-full text-white whiteGradientStroke font-poppins-bold"
        >
          <p>{$t("navbar.getStarted")}</p>
        </div>
      </a>
    </div>
  </div>
</div>

<style>
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
