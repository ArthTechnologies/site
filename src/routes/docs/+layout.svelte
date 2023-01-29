<script lang="ts">
  import {load } from "$lib/scripts/docs";
</script>

<div class="flex p-3 space-x-3 h-screen">
    <ul class="menu p-4 w-80 bg-base-300 shadow-xl text-base-content rounded-lg">
        <!-- Sidebar content here -->
        <p class="divider">Quartz API</p>
        <li><a href="/docs/servers" on:click={load}>Servers</a></li>
        <li><a href="/docs/terminal" on:click={load}>Terminal</a></li>
        <li><a href="/docs/keys" on:click={load}>Encryption Keys</a></li>
        <li><a href="/docs/settings" on:click={load}>Settings</a></li>
        

        
      </ul>
<slot/>
</div>