<script lang="ts">
  import { load } from "$lib/scripts/docs";
</script>

<div
  class="flex flex-col md:flex-row p-3 space-x-3 items-center md:items-start"
>
  <div class="space-y-3">
    <ul
      class="menu px-4 py-2 w-80 bg-neutral shadow-xl text-base-content rounded-lg"
    >
      <li>
        <a href="/software/" on:click={load}>Software</a>
      </li>
    </ul>
    <ul class="menu p-4 w-80 bg-neutral shadow-xl text-base-content rounded-lg">
      <p class="font-mono text-center font-bold">Tutorials</p>
      <!-- Sidebar content here -->

      <li>
        <a href="/software/how-to-join-servers" on:click={load}
          >How to Join Minecraft Servers</a
        >
        <a href="/software/using-dynmap" on:click={load}>Using Dynmap</a>
        <a href="/software/using-simple-voice-chat" on:click={load}
          >Using Simple Voice Chat</a
        >
      </li>
    </ul>
    <ul class="menu p-4 w-80 bg-neutral shadow-xl text-base-content rounded-lg">
      <p class="font-mono text-center font-bold">Arth Panel</p>
      <!-- Sidebar content here -->
      <p class="divider">Quartz API</p>
      <li>
        <a href="/software/home" class="font-bold" on:click={load}
          >Universal Header Parameters</a
        >
      </li>
      <li><a href="/software/accounts" on:click={load}>Account</a></li>
      <li><a href="/software/servers" on:click={load}>Servers</a></li>
      <li><a href="/software/proxies" on:click={load}>Proxies</a></li>
      <li><a href="/software/terminal" on:click={load}>Terminal</a></li>
      <li><a href="/software/curseforge" on:click={load}>CurseForge</a></li>
      <li><a href="/software/translate" on:click={load}>Translate</a></li>
      <li><a href="/software/checkout" on:click={load}>Checkout</a></li>
      <li><a href="/software/misc" on:click={load}>Misc</a></li>
    </ul>
  </div>
  <slot />
</div>
