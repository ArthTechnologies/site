<script lang="ts">
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import "../app.css";
  import "$lib/styles/components.scss";

  import { onMount } from "svelte";
  import { themeChange } from "theme-change";
  import Footer from "$lib/components/layout/Footer.svelte";
  import { browser } from "$app/environment";
  //post request to http://localhost:5000/analytics/
  if (browser) {
    console.log(navigator.doNotTrack);
    if (
      navigator.doNotTrack == "1" ||
      localStorage.getItem("allowAnalytics") == "false"
    ) {
      localStorage.setItem("allowAnalytics", "false");
    } else {
      localStorage.setItem("allowAnalytics", "true");
      fetch("http://localhost:5000/analytics/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: window.location.pathname,
          platform: navigator.platform,
        }),
      });
    }
  }
  onMount(() => {
    themeChange(false);
    // 👆 false parameter is required for svelte
  });
  // will break if not used here
</script>

<div class="flex flex-col h-screen justify-between">
  <div class="mb-32">
    <Navbar navType="default" />
    <slot />
  </div>
  <Footer />
</div>
