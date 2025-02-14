<script lang="ts">
  import { marked } from "marked";
  import { load } from "$lib/scripts/docs";
  import { ExternalLink } from "lucide-svelte";
  import { t } from "$lib/scripts/i18n";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  load("home");
</script>

<div
  class="w-full h-full bg-gradient-to-b from-base-300 to-sky-900 absolute z-[-1] top-0 -left-3"
></div>

<div class="flex flex-col md:w-[60%] lg:w-[50%] pr-3">
  <p class=" text-3xl font-bold mt-10 pl-5 pr-9">
    <span class="text-gray-300">Arth Panel</span> was created to make managing your
    servers as simple as possible. It's both the software powering Arth Hosting
    and an open-source software that you can run yourself if you have server
    computers running Linux.<br /><br />We don't consider Arth Panel suitable for self-hosting yet, but if you're a developer you can check out and/or contribute to the repos below.
  </p>
  <div class="lg:ml-8 xl:ml-24 2xl:ml-32 element-container flex flex-col items-center">
    <p class="text-3xl text-center font-bold mt-16 mb-6">
      Components
    </p>
    <div class="flex gap-5 mb-24 max-md:flex-col w-fit">
      <div
        class="card bg-neutral bg-opacity-70 backdrop-blur-xl w-80 shadow-xl text-center shadow-teal-700/30"
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
        class="card bg-neutral bg-opacity-70 backdrop-blur-xl w-80 shadow-xl text-center shadow-orange-700/30"
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
