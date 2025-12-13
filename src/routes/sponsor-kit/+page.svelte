<script lang="ts">
import { API_URL } from "$lib/scripts/config";
  import { browser } from "$app/environment";
  import { marked } from "marked";
  let t;
  let metadata;
  let version;
  let published;
  let effective;

  if (browser) {
    fetch(`${API_URL}/file/docs/sponsor-kit.md`)
      .then((response) => response.text())
      .then((text) => {
        t = marked(text);
        version = metadata.version;
        published = metadata.published;
        effective = metadata.effective;
      });
  }
</script>

<article class="prose p-5">
  {@html t}
</article>
