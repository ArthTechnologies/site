<script>
	import {t} from "$lib/scripts/i18n"

	//{$t("")}
</script>

<div class="card shadow-2xl">
  <div
    class="card-body bg-gradient-to-tl from-teal-500 to-indigo-600 rounded-xl hero"
  >
    <div class="hero-content text-left">
      <div class="max-w-lg lg:max-w-2xl">
        <h1
          class="font-title text-neutral-focus mb-2 text-4xl font-extrabold sm:text-5xl lg:text-7xl"
        >
          {$t("faq.title")}
        </h1>
    
        <ul class="py-7 text-neutral-focus">
        <li>{$t("faq.1")}</li>
        <li>{$t("faq.2")}</li>
        <li>{$t("faq.3")}</li>
        </ul>

      </div>
    </div>
  </div>
</div>
