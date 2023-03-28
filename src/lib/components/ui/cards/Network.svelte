<script>
	import {t} from "$lib/scripts/i18n"

	//{$t("")}
</script>


<div class="card shadow-2xl">
  <div class="card-body bg-[url('/images/card1bg.webp')] rounded-xl md:hero">
    <div class="hero-content text-center">
      <div class="max-w-lg lg:max-w-2xl">
        <h1
          class="font-title mb
          2 text-4xl font-extrabold text-3xl  md:text-5xl lg:text-7xl text-neutral-focus"
        >
          {$t("network.title")}
        </h1>
        <p class="py-7 md:text-lg font-semibold text-neutral-focus">
          {$t("network.desc")}
        </p>

        <div
          class="stats shadow-xl  bg-base-300 border-base-400 border md:w-1/1"
        >
          <div class="stat">
            <div class="stat-title">{$t("network.iptext")}</div>
            <div class="stat-value">{$t("network.address")}</div>
            <div class="stat-desc">{$t("network.editions")}<div /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
