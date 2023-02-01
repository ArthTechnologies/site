<script lang="ts">
  import {load } from "$lib/scripts/docs";
</script>

<div class="flex flex-col md:flex-row p-3 space-x-3 ">
 <div class="space-y-3">
  <ul class="menu p-4 w-80 bg-base-300 shadow-xl text-base-content rounded-lg ">
    <p class="font-mono text-center font-bold">Tutorials</p>
    <!-- Sidebar content here -->

    <li><a href="/docs/how-to-join-servers" on:click={load}>How to Join Minecraft Servers</a></li>
    

    
  </ul>
    <ul class="menu p-4 w-80 bg-base-300 shadow-xl text-base-content rounded-lg sm:h-96 h-72">
      <p class="font-mono text-center font-bold">Arth Panel</p>
        <!-- Sidebar content here -->
        <a class="divider link-hover" href="/docs">Quartz API Routes</a>
        <li><a href="/docs/servers" on:click={load}>Servers</a></li>
        <li><a href="/docs/terminal" on:click={load}>Terminal</a></li>
        <li><a href="/docs/keys" on:click={load}>Encryption Keys</a></li>
        <li><a href="/docs/settings" on:click={load}>Settings</a></li>
        

        
      </ul>
 </div>
<slot/>
</div>