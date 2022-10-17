<script lang="ts">
  import ThemeToggle from "./../ui/ThemeToggle.svelte";
  import Helper from "./../ui/Helper.svelte";
  let Webname = "Arth Panel";

  type NavType = "default" | "welcome";

  export let navType: NavType;
</script>

{#if navType === "default"}
  <div class="navbar bg-base-300 px-4">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl" href="/"
        ><img src="/images/sitelogo.png" alt="Arth" width="75" /><span
          class="badge badge-info">Beta</span
        ></a
      >
    </div>
    <div class="flex-none space-x-2">
      <ul class="menu menu-horizontal p-0">
        <li><a href="/">Home</a></li>
        <li><a href="/">Hosting</a></li>
      </ul>

      <ThemeToggle />

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
            class="feather feather-link"
            ><path
              d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
            /><path
              d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
            /></svg
          >
        </label>
        <ul
          tabindex="0"
          class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52"
        >
          <li>
            <a class="justify-between"> Docs (Coming Soon)</a>
          </li>
          <li>
            <a
              href="https://discord.com/invite/bjY39AbK35"
              class="justify-between"
            >
              Discord
            </a>
          </li>
          <li>
            <a class="justify-between">
              Panel (Coming Soon)
              <div
                class="tooltip tooltip-left"
                data-tip="Arth panel is a software allowing you to manage game servers on a server computer you own. This is not related to any paid Arth Services."
              >
                <div class="btn btn-circle btn-ghost btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-help-circle"
                    ><circle cx="12" cy="12" r="10" /><path
                      d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
                    /><line x1="12" y1="17" x2="12.01" y2="17" /></svg
                  >
                </div>
              </div>
            </a>
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
