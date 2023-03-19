<script>
  import { t } from "$lib/scripts/i18n";

  //{$t("")}
</script>

<div class="card shadow-2xl space-y-10 space-x-10">
  <div
    class="card-body bg-gradient-to-tl from-orange-500 to-pink-600 rounded-xl hero "
  >
    <div class="hero-content text-center">
      <div class="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-none">
        <h1
          class="font-title text-left md:text-center text-neutral-focus  text-4xl font-extrabold sm:text-5xl lg:text-7xl"
        >
          {$t("hosting.title")}
        </h1>
        <div class=" py-7 text-left text-4xl md:text-center text-neutral-focus">
          <div class="font-bold"><strike>$5</strike> $3<small>/mo</small></div>
          <p class="text-[1.1rem]">For the rest of 2023</p>
        </div>
        <div class="space-y-5 flex  flex-col lg:flex-row  space-x-5">
          <!-- Minecraft Realms Table -->
          <div class="bg-base-200 w-96  rounded-xl p-4 space-y-3 ml-5 mt-5">
            <p class="text-2xl font-bold -mb-3">Minecraft Realms</p>
            <p class="text-sm">Cheapest Plan</p>
            <div class="flex justify-between px-2">
              <div class="flex items-center space-x-2">
                <div class="bg-slate-300 w-2 h-2 rounded-full" />
                <div class="bg-base-300 w-36 h-12 rounded-lg text-left px-1.5">
                  <p class="font-mono" style="font-variant: small-caps">
                    price
                  </p>
                  <p class="font-bold text-xl -mt-1.5">$4/mo</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="bg-slate-300 w-2 h-2 rounded-full" />
                <div class="bg-base-300 w-36 h-12 rounded-lg text-left px-1.5">
                  <p class="font-mono" style="font-variant: small-caps">
                    plugins
                  </p>
                  <p class="font-bold text-xl -mt-1.5">None</p>
                </div>
              </div>
            </div>
            <div class="flex justify-between px-2">
              <div class="flex items-center space-x-2">
                <div class="bg-slate-300 w-2 h-2 rounded-full" />
                <div class="bg-base-300 w-36 h-12 rounded-lg text-left px-1.5">
                  <p class="font-mono" style="font-variant: small-caps">
                    worldgen mods
                  </p>
                  <p class="font-bold text-xl -mt-1.5">None</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="bg-slate-300 w-2 h-2 rounded-full" />
                <div class="bg-base-300 w-36 h-12 rounded-lg text-left px-1.5">
                  <p class="font-mono" style="font-variant: small-caps">
                    memory
                  </p>
                  <p class="font-bold text-xl -mt-1.5">Unreported</p>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2 ml-2">
              <div class="bg-slate-300 w-3 h-2 rounded-full" />
              <div class="bg-base-300 w-42 h-20 rounded-lg text-left px-1.5">
                <p class="font-mono" style="font-variant: small-caps">
                  crossplay
                </p>
                <p class="font-bold text-xl -mt-1.5">
                  Bedrock & Java Edition players can't play together.
                </p>
              </div>
            </div>
            <a href="https://www.minecraft.net/en-us/realms" target="_blank">
              <button class=" btn btn-sm mt-2.5">
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-external-link mr-1"
                    ><path
                      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                    /><polyline points="15 3 21 3 21 9" /><line
                      x1="10"
                      y1="14"
                      x2="21"
                      y2="3"
                    /></svg
                  >View
                </div>
              </button>
            </a>
          </div>
          <!-- Arth Hosting Table -->
          <div class="bg-base-200 w-96  rounded-xl p-4 space-y-3 outline">
            <p
              class="text-2xl font-bold -mb-3 text-transparent bg-clip-text sm:bg-gradient-to-tr from-orange-500 to-pink-600"
            >
              Arth Hosting
            </p>

            <p class="text-sm">Only Plan</p>
            <div class="flex justify-between px-2">
              <div class="flex items-center space-x-2">
                <div class="bg-slate-300 w-2 h-2 rounded-full" />
                <div class="bg-base-300 w-36 h-12 rounded-lg text-left px-1.5">
                  <p class="font-mono" style="font-variant: small-caps">
                    price
                  </p>
                  <p class="font-bold text-xl -mt-1.5">$3/mo</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="bg-slate-300 w-2 h-2 rounded-full" />
                <div class="bg-base-300 w-36 h-12 rounded-lg text-left px-1.5">
                  <p class="font-mono" style="font-variant: small-caps">
                    plugins
                  </p>
                  <p class="font-bold text-xl -mt-1.5">Yes</p>
                </div>
              </div>
            </div>
            <div class="flex justify-between px-2">
              <div class="flex items-center space-x-2">
                <div class="bg-slate-300 w-2 h-2 rounded-full" />
                <div class="bg-base-300 w-36 h-12 rounded-lg text-left px-1.5">
                  <p class="font-mono" style="font-variant: small-caps">
                    worldgen mods
                  </p>
                  <p class="font-bold text-xl -mt-1.5">Yes</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="bg-slate-300 w-2 h-2 rounded-full" />
                <div class="bg-base-300 w-36 h-12 rounded-lg text-left px-1.5">
                  <p class="font-mono" style="font-variant: small-caps">
                    memory
                  </p>
                  <p class="font-bold text-xl -mt-1.5">3GB+</p>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2 ml-2">
              <div class="bg-slate-300 w-3 h-2 rounded-full" />
              <div class="bg-base-300 w-42 h-20 rounded-lg text-left px-1.5">
                <p class="font-mono" style="font-variant: small-caps">
                  crossplay
                </p>
                <p class="font-bold text-xl -mt-1.5">
                  Bedrock & Java Edition players can play together.
                </p>
              </div>
            </div>
            <a href="/hosting">
              <button class=" btn btn-outline btn-sm  mt-2.5">
                <div class="flex items-center">Coming Soon</div>
              </button>
            </a>
          </div>
          <!-- Apex Hosting Table -->
          <div class="bg-base-200 w-96  rounded-xl p-4 space-y-3">
            <p class="text-2xl font-bold -mb-3">Apex Hosting</p>
            <p class="text-sm">Cheapest Plan</p>
            <div class="flex justify-between px-2">
              <div class="flex items-center space-x-2">
                <div class="bg-slate-300 w-2 h-2 rounded-full" />
                <div class="bg-base-300 w-36 h-12 rounded-lg text-left px-1.5">
                  <p class="font-mono" style="font-variant: small-caps">
                    price
                  </p>
                  <p class="font-bold text-xl -mt-1.5">$7.5/mo</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="bg-slate-300 w-2 h-2 rounded-full" />
                <div class="bg-base-300 w-36 h-12 rounded-lg text-left px-1.5">
                  <p class="font-mono" style="font-variant: small-caps">
                    plugins
                  </p>
                  <p class="font-bold text-xl -mt-1.5">Yes</p>
                </div>
              </div>
            </div>
            <div class="flex justify-between px-2">
              <div class="flex items-center space-x-2">
                <div class="bg-slate-300 w-2 h-2 rounded-full" />
                <div class="bg-base-300 w-36 h-12 rounded-lg text-left px-1.5">
                  <p class="font-mono" style="font-variant: small-caps">
                    worldgen mods
                  </p>
                  <p class="font-bold text-xl -mt-1.5">Yes</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="bg-slate-300 w-2 h-2 rounded-full" />
                <div class="bg-base-300 w-36 h-12 rounded-lg text-left px-1.5">
                  <p class="font-mono" style="font-variant: small-caps">
                    memory
                  </p>
                  <p class="font-bold text-xl -mt-1.5">2GB</p>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2 ml-2">
              <div class="bg-slate-300 w-3 h-2 rounded-full" />
              <div class="bg-base-300 w-42 h-20 rounded-lg text-left px-1.5">
                <p class="font-mono" style="font-variant: small-caps">
                  crossplay
                </p>
                <p class="font-bold text-lg -mt-1.5">
                  Bedrock & Java Edition players can play together with extra
                  setup.
                </p>
              </div>
            </div>
            <a href="https://apexminecrafthosting.com/pricing/" target="_blank">
              <button class=" btn btn-sm mt-2.5">
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-external-link mr-1"
                    ><path
                      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                    /><polyline points="15 3 21 3 21 9" /><line
                      x1="10"
                      y1="14"
                      x2="21"
                      y2="3"
                    /></svg
                  >View
                </div>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
