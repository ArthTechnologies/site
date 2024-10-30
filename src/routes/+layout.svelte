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
  //post request to http://localhost:5000/analytics/
  if (browser) {
    //a-b test
    let slug = window.location.pathname;
    if (slug === "/") {
      if (localStorage.getItem("ab_NewLandingPage") == null) {
        let x = Math.floor(Math.random() * 2) == 0;
        console.log("x is..." + x);
        /*if (!x) {
          console.log("x is false");
          localStorage.setItem("ab_NewLandingPage", "false");
          goto("/hosting");
        } else {*/
          console.log("x is true");
          localStorage.setItem("ab_NewLandingPage", "true");
        }
      }// else {
        if (localStorage.getItem("ab_NewLandingPage") == "false") {
          goto("/hosting");
        }
     // }
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
    console.log(object);
    if (
      navigator.doNotTrack == "1" ||
      localStorage.getItem("allowAnalytics") == "false"
    ) {
      localStorage.setItem("allowAnalytics", "false");
    } else {
      console.log("sending analytics...");

      fetch("https://backend.arthmc.xyz/analytics/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
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
