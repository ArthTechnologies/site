<script>
  import { browser } from "$app/environment";
  import { Check, Download, Link, QrCodeIcon } from "lucide-svelte";
  import { QRCodeImage } from "svelte-qrcode-image";
  import { t } from "$lib/scripts/i18n";
  let url;

  if (browser) {
    url = window.location.href;
    //cut everything after the # in the url off
    url = url.split("#")[0];
  }
  function copy() {
    navigator.clipboard.writeText(url);
    setTimeout(() => {
      //check the hidden checkbox
      document.getElementById("swapCheckbox").checked = false;
    }, 2500);
  }
</script>

<label class="swap swap-rotate btn btn-ghost btn-circle" on:click={copy}>
  <!-- this hidden checkbox controls the state -->
  <input id="swapCheckbox" type="checkbox" />

  <Link size="32" class="swap-off" />

  <!-- moon icon -->
  <Check size="32" class="swap-on" />
</label>
