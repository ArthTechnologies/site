<script lang="ts">
  import { API_URL } from "$lib/scripts/config";
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import "../app.css";
  import "$lib/styles/components.scss";

  import { onMount } from "svelte";
  import { themeChange } from "theme-change";
  import Footer from "$lib/components/layout/Footer.svelte";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";

  let onMainPage = false;
  //post request to http://localhost:5000/analytics/
  if (browser) {
    //a-b test
    let slug = window.location.pathname;
    if (slug === "/") {
      if (localStorage.getItem("ab_NewLandingPage") == null) {
        let x = Math.floor(Math.random() * 2) == 0;
        console.log("x is..." + x);
        if (!x) {
          console.log("x is false");
          localStorage.setItem("ab_NewLandingPage", "false");
    
        } else {
        console.log("x is true");
        localStorage.setItem("ab_NewLandingPage", "true");
        goto("/hosting");
      }
    } // else {

       
    }
    onMainPage = window.location.pathname === "/";
    console.log(navigator.doNotTrack);
    let object = {
      url: window.location.pathname,
      userAgent: navigator.userAgent,
      locale: navigator.language,
      returning: localStorage.getItem("allowAnalytics") == "true",
      referrer: document.referrer,
    };
    let referrer = document.referrer;
    if (referrer == "" || referrer == null) {
      referrer = "unknown";
    }
    let campaign_name = "unknown";
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    if (urlParams.has("utm_campaign")) {
      campaign_name = urlParams.get("utm_campaign") || "none";
    }
        console.log("cn\n"  + campaign_name);

    if (localStorage.getItem("referrer") == null) localStorage.setItem("referrer", referrer);
    if (localStorage.getItem("campaign_name") == null) localStorage.setItem("campaign_name", campaign_name);
    console.log(object);
    if (
      navigator.doNotTrack == "1" ||
      localStorage.getItem("allowAnalytics") == "false"
    ) {
      localStorage.setItem("allowAnalytics", "false");
    } else if (localStorage.getItem("allowAnalytics") == null) {
      console.log("sending analytics...");

      fetch(`${API_URL}/analytics/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      }).catch((err) => {
        console.error("Analytics fetch failed:", err.message);
      });
      localStorage.setItem("allowAnalytics", "true");
    }
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
