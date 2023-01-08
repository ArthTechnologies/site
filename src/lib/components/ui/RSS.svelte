<script>
  import CopyClipboard from "$lib/components/ui/CopyClipboard.svelte";
  let link = "https://arthmc.xyz/rss.xml";

  const copy = () => {
    const app = new CopyClipboard({
      target: document.getElementById("clipboard"),
      props: { link },
    });
    app.$destroy();
  };
</script>

<a href="#rss" class="btn btn-ghost">
  Subscribe via rss  
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
    class="feather feather-rss"
    ><path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle
      cx="5"
      cy="19"
      r="1"
    /></svg
  >
</a>

<div class="modal" id="rss">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Subscribe to our RSS feed</h3>
    <p class="py-4">
      RSS is a way to get updates from websites all in one place. Download an
      RSS app to get started.
    </p>
    <div class="flex">
      <div class="modal-action">
        <a class="btn" on:click={copy}>Copy Link</a>
        <a class="btn" href="/arthblog.rss" download>Download .rss file</a>
        <a href="#" class="btn">Close</a>
      </div>
    </div>
  </div>
</div>

<div id="clipboard" />
