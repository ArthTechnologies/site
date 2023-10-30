<script>
  import { browser } from "$app/environment";
  import CopyClipboard from "$lib/components/ui/CopyClipboard.svelte";
  import { t } from "$lib/scripts/i18n";
  let link = "https://backend.arthmc.xyz/rss/";

  const copy = () => {
    if (browser) {
      document.getElementById("copyButton").innerHTML = $t("copied");
      const app = new CopyClipboard({
        target: document.getElementById("clipboard"),
        props: { link },
      });
      app.$destroy();
    }
  };
</script>

<a href="#rss" class="btn btn-outline">
  {$t("blog.button.RSS")}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
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
    <a href="#" class="btn btn-sm btn-circle absolute right-2 top-2">✕</a>
    <h3 class="font-bold text-lg">{$t("blog.RSS.title")}</h3>
    <p class="py-4">
      {$t("blog.RSS.desc")}
    </p>
    <div class="flex">
      <div class="modal-action">
        <a id="copyButton" class="btn" on:click={copy}
          >{$t("blog.RSS.button.copy")}</a
        >
        <a
          class="btn"
          href="https://backend.arthmc.xyz/rss/arthblog.rss"
          download="arthblog.rss">{$t("blog.RSS.button.download")}</a
        >
      </div>
    </div>
  </div>
</div>

<div id="clipboard" />
