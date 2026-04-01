<script lang="ts">
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import "../app.css";
  import "$lib/styles/components.scss";

  import { onMount } from "svelte";
  import { themeChange } from "theme-change";
  import Footer from "$lib/components/layout/Footer.svelte";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";

  let onMainPage = false;

  if (browser) {
    // A/B test — keep as-is
    let slug = window.location.pathname;
    if (slug === "/") {
      if (localStorage.getItem("ab_NewLandingPage") == null) {
        let x = Math.floor(Math.random() * 2) == 0;
        if (!x) {
          localStorage.setItem("ab_NewLandingPage", "false");
        } else {
          localStorage.setItem("ab_NewLandingPage", "true");
          goto("/hosting");
        }
      }
    }
    onMainPage = window.location.pathname === "/";

    // Persist referrer & UTM campaign for click attribution
    let referrer = document.referrer || "unknown";
    const urlParams = new URLSearchParams(window.location.search);
    const campaign_name = urlParams.get("utm_campaign") || "unknown";
    if (localStorage.getItem("referrer") == null) localStorage.setItem("referrer", referrer);
    if (localStorage.getItem("campaign_name") == null) localStorage.setItem("campaign_name", campaign_name);

    // Track page view — fire and forget, no consent gate
    fetch("/api/analytics/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referrer: localStorage.getItem("referrer") || "unknown",
        campaign: localStorage.getItem("campaign_name") || "unknown",
      }),
    }).catch(() => {});
  }

  onMount(() => {
    themeChange(false);
    // 👆 false parameter is required for svelte
  });
  // will break if not used here
</script>

<div class="flex flex-col min-h-screen justify-between relative">
  <div class="absolute top-0 w-full">
    <Navbar navType="default" />
  </div>
  <div class="mb-[40rem] md:mb-48 mt-16">
    <slot />
  </div>
  <div class="absolute bottom-0 w-full">
    <Footer />
  </div>
</div>
