<script>
	import {t} from "$lib/scripts/i18n"

	//{$t("")}
</script>
<div class="card shadow-2xl space-y-10 space-x-10">
  <div
    class="card-body bg-gradient-to-tl from-orange-500 to-pink-600 rounded-xl hero "
  >
    <div class="hero-content text-center">
      <div class="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-none">
        <h1
          class="font-title text-left md:text-center text-neutral-focus mb-2 text-4xl font-extrabold sm:text-5xl lg:text-7xl"
        >
          {$t("hosting.title")}
        </h1>
        <p class="py-7 text-left md:text-center text-neutral-focus">
          {$t("hosting.desc")} 
					{$t("hosting.desc2")}
        </p>
        <div class="overflow-x-auto">
  <table class="table w-full bg-base-100 rounded-xl text-sm">
    <!-- head -->
    <thead>
      <tr>
        <th>{$t("hosting.table.name")}</th>
        <th>{$t("hosting.table.price")}</th>
        <th>{$t("hosting.table.notes")}</th>
        <th>{$t("hosting.table.cp")}</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr>
        <th>{$t("hosting.table.name.arth")}</th>
        <td>$7/Month</td>
        <td>Plugins, Mods & More for free, easy-to-use panel.</td>
        <td>Yes, For free.</td>
      </tr>
      <!-- row 2 -->
      <tr>
        <th>{$t("hosting.table.name.apex")}g</th>
        <td>$9.99/Month</td>
        <td>You need to pay $15 for the 'Plugin Installation Addon'.</td>
        <td>Manually via plugins</td>
      </tr>
      <!-- row 3 -->
      <tr>
        <th>{$t("hosting.table.name.realms")}</th>
        <td>$7.99/Month</td>
        <td>No Mods/Plugins, Limited Amount of Players</td>
        <td>No</td>
      </tr>
    </tbody>
  </table>
</div>
<div class="divider"></div>
        <div class="btn glass text-neutral-focus">
          <a href="/hosting">{$t("badge.comingsoon")}</a>
        </div>
      </div>
    </div>
  </div>
</div>
