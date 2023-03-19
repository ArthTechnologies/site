<script>
  import { browser } from "$app/environment";
  import { t } from "$lib/scripts/i18n";
  //fetch pb.arthmc.xyz/status
  let network;
  let hosting;
  let quartz;
  let observer;
  let frontend = "Online";
  let backend;
  let website;

  const response = fetch("https://pb.arthmc.xyz/status")
    .then((response) => response.json())
    .then((json) => {
      if (json != undefined) {
        backend = "Online";
      } else {
        backend = "Offline";
      }
      network = json.arthnetwork;
      observer = json.observer;
      quartz = json.quartz;
      if (quartz == "Online" && observer == "Online") {
        hosting = "Online";
      } else {
        hosting = "Offline";
      }

      if (backend == "Online" && frontend == "Online") {
        website = "Online";
      } else {
        website = "Offline";
      }
    });
</script>

<p class="text-center text-5xl font-bold mt-10">{$t("status")}</p>
<div class="p-4 space-y-5 ">
  <div class="h-24 w-80 bg-base-200 rounded-xl p-2">
    <p class="font-bold text-2xl">Arth Network</p>
    <div class="flex">
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
      <p class="text-4xl">{network}</p>
    </div>
  </div>
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
    Advanced Info:
    <div class="space-y-2 mt-2">
      <p class="bg-base-300 p-1 rounded-lg">Frontend: {observer}</p>
      <p class="bg-base-300 p-1 rounded-lg">Backend: {quartz}</p>
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
      <p class="bg-base-300 p-1 rounded-lg">Frontend: {frontend}</p>
      <p class="bg-base-300 p-1 rounded-lg">Backend: {backend}</p>
    </div>
  </div>
</div>
