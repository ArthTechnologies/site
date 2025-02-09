<script lang="ts">
  import { load } from "$lib/scripts/docs";
  import { t } from "$lib/scripts/i18n";
</script>

<div
  class="flex flex-col md:flex-row p-3 space-x-3 items-center md:items-start"
>
  <div class="space-y-3">
    <ul class="menu p-4 w-80 bg-neutral shadow-xl text-base-content rounded-lg">
      <p class="font-mono text-center font-bold">{$t("tutorials")}</p>
      <!-- Sidebar content here -->

      <li>
        <a href="/knowledgebase/how-to-join-servers" on:click={load}
          >How to Join Minecraft Servers</a
        >
        <a href="/knowledgebase/let-friends-access-panel" on:click={load}
        >How to Let Others Access your Server Panel</a
      >
        <a href="/knowledgebase/using-dynmap" on:click={load}>Using Dynmap</a>
        <a href="/knowledgebase/using-bluemap" on:click={load}>Using BlueMap</a>
        <a href="/knowledgebase/using-simple-voice-chat" on:click={load}
          >Using Simple Voice Chat</a
        >
      </li>
    </ul>
  </div>
  <slot />
</div>
