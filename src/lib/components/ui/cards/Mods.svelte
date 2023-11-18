<script>
  import { t } from "$lib/scripts/i18n";

  //{$t("")}
</script>

<div class="card shadow-2xl">
  <div
    class="card-body bg-gradient-to-tl from-red-500 to-amber-600 rounded-xl hero"
  >
    <div class="hero-content text-center text-neutral-focus">
      <div class="max-w-lg lg:max-w-2xl">
        <h1
          class="font-title mb-2 text-4xl font-extrabold sm:text-5xl lg:text-7xl"
        >
          {$t("mods.title")}
        </h1>
        <p class="py-7 text-neutral-focus">
          {$t("mods.desc")}
        </p>
        <div class="space-x-3 space-y-3">
          <div class="btn btn-neutral btn-sm md:btn-md">
            <a
              href="https://www.curseforge.com/minecraft/modpacks/arthean-expansion"
              >{$t("b.aexpan")}</a
            >
          </div>
          <div class="btn btn-neutral btn-sm md:btn-md">
            <a href="https://modrinth.com/modpack/arthean-evolution"
              >{$t("b.aexped")}</a
            >
          </div>
          <div class="btn btn-neutral btn-sm md:btn-md">
            <a href="https://modrinth.com/modpack/arth-client">{$t("b.ac")}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
