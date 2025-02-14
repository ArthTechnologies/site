<script>
  import { browser } from "$app/environment";
  import { t } from "$lib/scripts/i18n";

  let network = $t("status.offline");
  let hosting = $t("status.offline");
  let quartz = $t("status.offline");
  let observer = $t("status.offline");
  let frontend = $t("status.online");
  let backend = $t("status.offline");
  let website = $t("status.offline");

  const response = fetch("https://ocelot.arthmc.xyz/status")
    .then((response) => response.json())
    .then((json) => {
      if (json != undefined) {
        backend = $t("status.online");
      } else {
        backend = $t("status.offline");
      }
      if (json.observer == "Online") observer = $t("status.online");
      if (json.quartz == "Online") quartz = $t("status.online");
      if (quartz == $t("status.online") && observer == $t("status.online")) {
        hosting = $t("status.online");
      } else {
        hosting = $t("status.offline");
      }

      if (backend == $t("status.online") && frontend == $t("status.online")) {
        website = $t("status.online");
      } else {
        website = $t("status.offline");
      }
    });
</script>

<p class="text-center text-5xl font-bold mt-10">{$t("status.title")}</p>
<div class="p-4 space-y-5 pb-36">
  <div class="h-22 w-80 bg-base-200 rounded-xl p-2">
    <p class="font-bold text-2xl">Arth Hosting</p>
    <div class="flex items-center mb-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="38"
        height="38"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-power mr-1"
        ><path d="M18.36 6.64a9 9 0 1 1-12.73 0" /><line
          x1="12"
          y1="2"
          x2="12"
          y2="12"
        /></svg
      >
      <p class="text-4xl">{hosting}</p>
    </div>
    {$t("status.advancedInfo")}
    <div class="space-y-2 mt-2">
      <p class="bg-base-300 p-1 pl-1.5 rounded-lg">Frontend: {observer}</p>
      <p class="bg-base-300 p-1 pl-1.5 rounded-lg">Backend: {quartz}</p>
    </div>
  </div>
  <div class="h-22 w-80 bg-base-200 rounded-xl p-2">
    <p class="font-bold text-2xl">Arth Website</p>
    <div class="flex items-center mb-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="38"
        height="38"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-power mr-1"
        ><path d="M18.36 6.64a9 9 0 1 1-12.73 0" /><line
          x1="12"
          y1="2"
          x2="12"
          y2="12"
        /></svg
      >
      <p class="text-4xl">{website}</p>
    </div>
    Advanced Info:
    <div class="space-y-2 mt-2">
      <p class="bg-base-300 p-1 pl-1.5 rounded-lg">Frontend: {frontend}</p>
      <p class="bg-base-300 p-1 pl-1.5 ounded-lg">Backend: {backend}</p>
    </div>
  </div>
</div>
