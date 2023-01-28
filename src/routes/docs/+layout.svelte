

<div class="flex p-3 space-x-3">
    <ul class="menu p-4 w-80 bg-base-300 shadow-xl text-base-content rounded-lg">
        <!-- Sidebar content here -->
        <p class="divider">Quartz API</p>
        <li><a href="/docs/servers" on:click={docs}>Servers</a></li>
        <li><a href="/docs/terminal" on:click={docs}>Terminal</a></li>
        <li><a href="/docs/keys" on:click={docs}>Encryption Keys</a></li>
        <li><a href="/docs/settings" on:click={docs}>Settings</a></li>
        

        
      </ul>
<slot/>
</div>