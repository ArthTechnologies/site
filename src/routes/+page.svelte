<script lang="ts">
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import Network from "$lib/components/ui/cards/Network.svelte";
  import HostingMain from "$lib/components/ui/cards/HostingMain.svelte";
  import Mods from "$lib/components/ui/cards/Mods.svelte";
</script>

<div class="p-5 space-y-5">
  <HostingMain />
  <Network />
  <Mods />
</div>
