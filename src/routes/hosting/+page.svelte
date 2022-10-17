<script lang="ts">
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import HostingMain from "$lib/components/ui/cards/HostingMain.svelte";
  import HostingFAQ from "$lib/components/ui/cards/HostingFAQ.svelte";

</script>

<Navbar navType="default" />
<div class=" space-y-5">
  <HostingMain />
  <HostingFAQ />

</div>
