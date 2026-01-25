<script lang="ts">
  import { browser } from "$app/environment";
  import { marked } from "marked";
  let t;
  let metadata;
  let version;
  let published;
  let effective;

  if (browser) {
    fetch(`/content/docs/sponsor-kit.md`)
      .then((response) => response.text())
      .then((text) => {
        if (!text) return;
        t = marked(text);
      })
      .catch((err) => {
        console.error("Sponsor kit fetch failed:", err.message);
      });
  }
</script>

<article class="prose p-5">
  {@html t}
</article>
