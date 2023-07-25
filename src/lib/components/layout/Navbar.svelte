<script lang="ts">
  import ThemeToggle from "./../ui/ThemeToggle.svelte";
  import Helper from "./../ui/Helper.svelte";
  let Webname = "Arth Panel";

  type NavType = "default" | "welcome";

  export let navType: NavType;
  import { t, locale, locales } from "$lib/scripts/i18n";

  //set locale to browser language if navigator is available
  if (typeof navigator !== "undefined") {
    locale.set(navigator.language);
  }
</script>

{#if navType === "default"}
  <div class="navbar bg-base-300">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl w-24" href="/"
        ><img src="/images/sitelogo.svg" alt="Arth" width="75" height="75" /></a
      >
    </div>
    <div class="flex-none space-x-2">
      <ul class="menu menu-horizontal p-0">
        <li>
          <a href="/" class="rounded-lg hidden md:flex">{$t("navbar.home")}</a>
        </li>
        <li>
          <a
            href="https://servers.arthmc.xyz/signin"
            class="rounded-lg btn btn-outline flex bg-gradient-to-tr from-orange-500 to-pink-600 text-black -space-x-2 pr-1.5 pl-2.5 md:pr-3 md:pl-4"
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
        </li>
        <div class="hidden sm:block">
          <li>
            <a href="/blog" class="rounded-lg">Blog</a>
          </li>
          <li>
            <a href="/docs/" class="rounded-lg">Docs</a>
          </li>
        </div>
      </ul>

      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
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
          class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52"
        >
          <div class="block sm:hidden">
            <li><a href="/" class="rounded-lg">{$t("navbar.home")}</a></li>
            <li>
              <a href="/hosting" class="rounded-lg">{$t("navbar.hosting")}</a>
            </li>
            <li>
              <a href="/blog" class="rounded-lg">Blog</a>
            </li>
            <li>
              <a href="/docs/" class="rounded-lg">Docs</a>
            </li>
          </div>
          <li>
            <a
              href="https://discord.com/invite/bjY39AbK35"
              class="justify-between"
            >
              {$t("navbar.discord")}
            </a>
          </li>
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
