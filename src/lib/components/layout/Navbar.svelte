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
  import { ChevronDown } from "lucide-svelte";

  //set locale to browser language if navigator is available
  if (typeof navigator !== "undefined") {
    locale.set(navigator.language);
  }
  if (navType === "dark") {
    bgColor = "bg-base-300";
  }
  onMount(() => {
    window.addEventListener("click", handleWindowClick);
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
        fetch("https://backend.arthmc.xyz/analytics/getStartedButtonClicked", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    }
  }
</script>

<div class=" h-[92px] w-full flex items-center justify-center font-poppins">
  <div
    class=" bg-opacity-10 h-[58px] w-[1128px] flex justify-between items-center"
  >
    <img src="/images/hosting-logo.svg" class="h-10" />
    <div class="flex gap-3 items-center">
      <a href="/"
        ><button class=" px-2 py-1 btn-ghost rounded-lg">Home</button></a
      >
      <a href="/articles"
        ><button class=" px-2 py-1 btn-ghost rounded-lg">Articles</button></a
      >
      <a href="/software"
        ><button class=" px-2 py-1 btn-ghost rounded-lg">Docs</button></a
      >

      <div class="dropdown dropdown-end">
        <div
          tabindex="0"
          role="button"
          class=" px-2 py-1 btn-ghost rounded-lg flex items-center gap-1"
        >
          More<ChevronDown size="16" class="mt-0.5" />
        </div>

        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow bg-opacity-75 backdrop-blur"
        >
          <li><a href="/terms-of-service">Terms of Service</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/status">Status</a></li>
        </ul>
      </div>

      <LanguageSwitcher />
      <a
        href="https://servers.arthmc.xyz/signin"
        target="_blank"
        rel="noreferrer"
      >
        <div
          class="h-12 mx-2 px-4 cursor-pointer flex items-center bg-white hover:bg-gray-300 rounded-full text-black border-0"
        >
          Log In
        </div></a
      >
      <a
        href="https://servers.arthmc.xyz/signin"
        target="_blank"
        rel="noreferrer"
      >
        <div
          class=" h-12 px-4 cursor-pointer flex items-center bg-gradient-to-b from-[#E93843] to-[#F56922] hover:opacity-90 rounded-full text-black whiteGradientStroke"
        >
          Get Started
        </div>
      </a>
    </div>
  </div>
</div>

<style>
  .whiteGradientStroke {
    position: relative;

    border: 2px solid transparent; /* Invisible border for spacing */

    z-index: 1;
  }

  .whiteGradientStroke::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
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
  @font-face {
    font-family: "Poppins";
    src: url("/fonts/Poppins-Regular.ttf");
  }

  .font-poppins {
    font-family: "Poppins";
  }
</style>
