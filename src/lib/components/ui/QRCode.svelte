<script>
  import { browser } from "$app/environment";
  import { Download, QrCodeIcon } from "lucide-svelte";
  import { QRCodeImage } from "svelte-qrcode-image";
  import { t } from "$lib/scripts/i18n";
  let url;

  if (browser) {
    url = window.location.href;
    //cut everything after the # in the url off
    url = url.split("#")[0];
  }
  function download() {
    const canvas = document.querySelector("canvas");
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvas.toDataURL();
    link.click();
  }
</script>

<a href="#qrCode" class="btn btn-circle btn-ghost">
  <QrCodeIcon size="34" />
</a>

<div class="modal" id="qrCode">
  <div class="modal-box">
    <a href="#" class="btn btn-neutral btn-sm btn-circle absolute right-2 top-2"
      >✕</a
    >
    <h3 class="font-bold text-lg mb-1.5">QR Code</h3>

    <div class="flex flex-col items-center">
      <QRCodeImage
        text={url}
        displayClass="rounded-xl"
        scale="8"
        displayType="canvas"
      />

      <button class="btn btn-primary btn-xs gap-2 mt-3" on:click={download}
        ><Download size="16" />Download Image</button
      >
    </div>
  </div>
</div>
