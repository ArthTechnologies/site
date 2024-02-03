<script lang="ts">
  import ThemeToggle from "./../ui/ThemeToggle.svelte";
  import Helper from "./../ui/Helper.svelte";
  let Webname = "Arth Panel";

  type NavType = "default" | "welcome";

  export let navType: NavType;
  import { t, locale, locales } from "$lib/scripts/i18n";
  import { onMount } from "svelte";
  import LanguageSwitcher from "../ui/LanguageSwitcher.svelte";

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
</script>

{#if navType === "default" || navType === "dark"}
  <div class="navbar flex justify-between bg-base-300 z-50">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl w-[6.1rem]" href="/"
        ><img src="/images/sitelogo.svg" alt="Arth" width="75" height="75" /></a
      >
    </div>
    <div class="flex-1 md:flex-none navbar-end">
      <a href="/" class="rounded-lg hidden md:flex btn btn-ghost"
        >{$t("navbar.home")}</a
      >

      <div>
        <a
          href="https://servers.arthmc.xyz/signin"
          class="rounded-lg btn btn-outline flex bg-gradient-to-tr from-orange-500 to-pink-600 text-black -space-x-2 pr-1.5 pl-2.5 md:pr-3 md:pl-4 hover:opacity-90"
          target="_blank"
          rel="noreferrer"
          ><p class="mr-3">{$t("signup")}</p>
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
      <div class="hidden sm:flex">
        <a href="/blog" class="rounded-lg btn btn-ghost">Blog</a>

        <a href="/docs" class="rounded-lg btn btn-ghost">Docs</a>
      </div>
      <LanguageSwitcher />

      <div class="dropdown dropdown-end z-50" id="dropdown">
        <label
          tabindex="0"
          class="btn btn-ghost btn-circle"
          on:click={closeDropdown}
        >
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
            class="feather feather-menu"
            ><line x1="3" y1="12" x2="21" y2="12" /><line
              x1="3"
              y1="6"
              x2="21"
              y2="6"
            /><line x1="3" y1="18" x2="21" y2="18" /></svg
          ><path
            d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
          /><path
            d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
          />
        </label>
        <ul
          tabindex="0"
          class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 bg-opacity-95 backdrop-blur rounded-box w-52"
        >
          <div class="block sm:hidden">
            <li>
              <a href="/" class="rounded-lg">{$t("navbar.home")}</a>
            </li>
            <li>
              <a href="/blog" class="rounded-lg">Blog</a>
            </li>
            <li>
              <a href="/docs" class="rounded-lg">Docs</a>
            </li>
          </div>
          <li>
            <a href="/software" class="justify-between">
              {$t("navbar.software")}
            </a>
          </li>
          <li>
            <a href="/status" class="justify-between"> Status </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
{:else if navType === "welcome"}
  <div class="navbar fixed justify-between px-6">
    <a class="btn btn-ghost normal-case text-2xl" href="/">{Webname}</a>
    <ThemeToggle />
  </div>
{/if}
