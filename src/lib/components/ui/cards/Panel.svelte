<script>
	import {t} from "$lib/scripts/i18n"

	//{$t("")}
</script>
<div class="card shadow-2xl">
  <div
    class="card-body bg-gradient-to-tr from-indigo-500 to-teal-200 rounded-xl hero "
  >
    <div class="hero-content text-center">
      <div class="max-w-lg lg:max-w-2xl">
        <h1
          class="font-title mb
          2 text-4xl font-extrabold sm:text-5xl lg:text-7xl text-neutral-focus"
        >
          {$t("panel.title")}
        </h1>
        <p class="py-7 text-lg font-semibold text-neutral-focus">

          {$t("panel.desc")}

        </p>
        <div class="space-y-5">
          <div class="btn btn-sm md:btn-md">
            <a href="https://github.com/arthmc/observer"
              >{$t("panel.frontend")}</a
            >
          </div>

				<div class="btn btn-sm md:btn-md">
            <a href="https://github.com/arthmc/quartz"
              >{$t("panel.backend")}</a

            >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
