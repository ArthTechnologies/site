<script>
  import { t } from "$lib/scripts/i18n";

  //{$t("")}
</script>

<div class="md:card shadow-2xl space-y-10 space-x-10">
  <div
    class="md:card-body bg-gradient-to-tl from-orange-500 to-pink-600 rounded-xl hero "
  >
    <div class="md:hero-content text-center">
      <div class="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-none">
        <h1
          class="mt-12 md:mt-0 font-title text-left md:text-center text-neutral-focus   font-extrabold text-5xl lg:text-7xl"
        >
          {$t("hosting.title")}
        </h1>
        <div
          class=" pt-7 sm:pb-7 text-left text-4xl md:text-center text-neutral-focus"
        >
          <div class="font-bold">
            <strike>$5</strike> $3<small>{$t("mo")}</small>
          </div>
          <p class="text-[1.1rem]">{$t("hosting.price")}</p>
        </div>
       <div class="flex flex-wrap w-[20rem] gap-3">
        <div class="rounded-full bg-base-100 h-24 w-48 p-1.5 flex flex-col justify-center">
          Built-In Java & Bedrock Edition Crossplay
        </div>
        <div class="rounded-full bg-base-100 h-24 w-24 p-1.5 flex flex-col justify-center mask">
          $3<small>{$t("mo")}</small>
        </div>
        <div class="rounded-full bg-base-100 h-24 w-24 p-1.5 flex flex-col justify-center mask">
          One-Click<small>Worldgen Mods</small>
        </div>
        <div class="rounded-full bg-base-100 h-24 w-24 p-1.5 flex flex-col justify-center mask">
          Processor<small>AMD Ryzen 7</small>
        </div>
        <div class="rounded-full bg-base-100 h-24 w-24 p-1.5 flex flex-col justify-center mask">
          $3<small>{$t("mo")}</small>
        </div>
        <div class="rounded-full bg-base-100 h-24 w-24 p-1.5 flex flex-col justify-center mask">
          Memory<small>~4GB</small>
        </div>
        <div class="rounded-full bg-base-100 h-24 w-48 p-1.5 flex flex-col justify-center">
         Thousands of free plugins from <a class="hover:link text-green-500" href="https://modrinth.com">Modrinth</a>
        </div>
       </div>
      </div>
    </div>
  </div>
</div>
