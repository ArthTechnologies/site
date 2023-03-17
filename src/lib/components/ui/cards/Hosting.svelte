<script>
  import { t } from "$lib/scripts/i18n";

  //{$t("")}
</script>

<div class="card shadow-2xl">
  <div
    class="card-body bg-gradient-to-tl from-sky-500 to-fuchsia-600 rounded-xl hero"
  >
    <div class="hero-content text-center">
      <div class="max-w-lg lg:max-w-2xl">
        <h1
          class="font-title text-neutral-focus mb-2 text-4xl font-extrabold sm:text-5xl lg:text-7xl"
        >
          {$t("hosting.title")}
        </h1>
        <p class="py-7 text-neutral-focus">
          {@html $t("hosting.desc")}
        </p>

        <a href="/hosting"
          ><div class="btn glass text-neutral-focus">
            {@html $t("b.learnmore")}
          </div></a
        >
      </div>
    </div>
  </div>
</div>
