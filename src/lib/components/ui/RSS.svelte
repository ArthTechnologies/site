<script>
  import { browser } from "$app/environment";
  import CopyClipboard from "$lib/components/ui/CopyClipboard.svelte";
  import { t } from "$lib/scripts/i18n";

  let lang = "en-US";
  let link = "https://backend.arthmc.xyz/rss/" + lang;
  if (browser) {
    lang = navigator.language;
    if (localStorage.getItem("lang") != null) {
      lang = localStorage.getItem("lang");
    }
    link = "https://backend.arthmc.xyz/rss/arthblog.rss?lang=" + lang;
  }
  const copy = () => {
    if (browser) {
      document.getElementById("copyButton").innerHTML = $t("misc.copied");
      const app = new CopyClipboard({
        target: document.getElementById("clipboard"),
        props: { link },
      });
      app.$destroy();
    }
  };
</script>

<a href="#rss" class="btn btn-outline btn-sm ml-5">
  {$t("modal.rss.button")}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-rss ml-1.5"
    ><path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle
      cx="5"
      cy="19"
      r="1"
    /></svg
  >
</a>

<div class="modal" id="rss">
  <div class="modal-box">
    <a href="#" class="btn btn-neutral btn-sm btn-circle absolute right-2 top-2"
      >✕</a
    >
    <h3 class="font-bold text-lg">{$t("modal.rss.button")}</h3>
    <p class="py-4">
      {$t("modal.rss.desc")}
    </p>
    <div class="flex">
      <div class="modal-action">
        <a id="copyButton" class="btn btn-neutral" on:click={copy}
          >{$t("modal.rss.copyLink")}</a
        >
        <a class="btn btn-neutral" href={link} download
          >{$t("modal.rss.downloadFile")}
        </a>
      </div>
    </div>
  </div>
</div>

<div id="clipboard" class="hidden" />
