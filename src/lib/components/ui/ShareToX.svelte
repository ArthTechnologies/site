<script lang="ts">
  import { browser } from "$app/environment";
  import { t } from "$lib/scripts/i18n";
  import { onMount } from "svelte";
  let url: string;
  let link = "";
  let instance = "";
  if (browser) {
    url = window.location.href;
    //cut everything after the # in the url off
    url = url.split("#")[0];
  }

  function share() {
    if (browser) {
      instance = document.getElementById("instance").value;
      link = "https://" + instance + "/share?text=" + encodeURIComponent(url);
    }
  }

  onMount(() => {
    if (browser) {
      //set the instance to the one in local storage
      instance = document.getElementById("instance").value = instance;
    }
  });
</script>

<a
  href="https://x.com/intent?text={url}"
  class="btn btn-circle btn-ghost"
  target="_blank"
  rel="noopener noreferrer"
>
  <svg
    fill="currentColor"
    viewBox="0 0 1668.56 1221.19"
    style="enable-background:new 0 0 1668.56 1221.19;"
    xml:space="preserve"
  >
    <g id="layer1" transform="translate(52.390088,-25.058597)">
      <path
        id="path1009"
        d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99
		h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
      />
    </g>
  </svg>
</a>
