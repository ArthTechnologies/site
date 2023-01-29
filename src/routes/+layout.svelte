<script lang="ts">
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import "../app.css";
  import "$lib/styles/components.scss";

  import { onMount } from "svelte";
  import { themeChange } from "theme-change";
  import Footer from "$lib/components/layout/Footer.svelte";

  onMount(() => {
    themeChange(false);
    // 👆 false parameter is required for svelte
  });
  // will break if not used here
</script>
<div class="flex flex-col h-screen justify-between">

<div>
  <Navbar navType="default" />
<slot />
</div>
<Footer navType="default" />
</div>