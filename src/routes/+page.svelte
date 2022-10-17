<script lang="ts">
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import Network from "$lib/components/ui/cards/Network.svelte";
  import Hosting from "$lib/components/ui/cards/Hosting.svelte";
  import Mods from "$lib/components/ui/cards/Mods.svelte";
</script>

<Navbar navType="default" />
<div class="p-5 space-y-5">
  <Network />
  <Hosting />
  <Mods />
</div>
