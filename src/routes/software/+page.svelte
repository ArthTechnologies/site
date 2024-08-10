<script lang="ts">
  import { marked } from "marked";
  import { load } from "$lib/scripts/docs";
  import { ExternalLink } from "lucide-svelte";
  import { t } from "$lib/scripts/i18n";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  load("home");

  if (browser) {
    // Trigger the animation when the component is mounted
    onMount(() => {
      showElement();
    });
  }
</script>

<div
  class="w-full h-full bg-gradient-to-b from-base-300 to-sky-900 absolute z-[-1] top-0 -left-3"
></div>

<div class="flex flex-col md:w-[60%] lg:w-[70%] pr-3">
  <p class=" text-3xl xl:text-4xl font-bold mt-10 pl-5 pr-9">
    <span class="text-white">Arth Panel</span> was created to make managing your
    servers as simple as possible. It's both the software powering Arth Hosting
    and an open-source software that you can run yourself if you have server
    computers running Linux.<br /><br />Having both of these use cases during
    the development process has led to a panel with unprecedented flexibility,
    transparency and power.
  </p>
  <div class="lg:ml-8 xl:ml-24 2xl:ml-32 element-container">
    <p class="text-3xl text-center font-bold mt-16 mb-6 2xl:w-[62rem]">
      Components
    </p>
    <div class="flex gap-5 mb-24 max-md:flex-col">
      <div
        class="card bg-neutral bg-opacity-70 backdrop-blur-xl w-80 shadow-xl text-center shadow-teal-700/50"
      >
        <div class="card-body">
          <h2 class="card-title justify-center">Observer</h2>
          <p>
            The frontend of Arth Panel, made with Svelte to achieve fast loading
            speeds. It features umatched UI design, with command shortcuts,
            one-click worldgen mods and so much more.
          </p>
          <div class="card-actions justify-center">
            <a
              href="https://codeberg.org/arth/observer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button class="btn bg-[#6eb7de] text-black hover:bg-sky-600"
                >View Repo <ExternalLink class="ml-1.5" /></button
              ></a
            >
          </div>
        </div>
      </div>
      <div
        class="card bg-neutral bg-opacity-70 backdrop-blur-xl w-80 shadow-xl text-center shadow-sky-200/50"
      >
        <div class="card-body">
          <h2 class="card-title justify-center">Quartz</h2>
          <p>
            The Node.js backend of Arth Panel, built from the ground up to be
            lightweight and easy to dissect. It stores minimal files and all the
            setup needed can be done in one unified config file.
          </p>
          <a
            href="https://codeberg.org/arth/quartz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button class="btn bg-[#6eb7de] text-black hover:bg-sky-600"
              >View Repo <ExternalLink class="ml-1.5" /></button
            ></a
          >
        </div>
      </div>
      <div
        class="card bg-neutral bg-opacity-70 backdrop-blur-xl w-80 shadow-xl text-center shadow-indigo-700/50"
      >
        <div class="card-body">
          <h2 class="card-title justify-center">JarsMC</h2>
          <p>
            A special backend with the purpose of storing and updating all the
            jars for all the versions and softwares you want. Plus, it has
            support for Geyser, Terralith and more.
          </p>
          <a
            href="https://codeberg.org/arth/jarsmc.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button class="btn bg-[#6eb7de] text-black hover:bg-sky-600"
              >View Repo <ExternalLink class="ml-1.5" /></button
            ></a
          >
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .element-container {
    position: relative;
    animation: dropInFadeIn 4s ease;
    opacity: 1;
  }

  @keyframes dropInFadeIn {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
