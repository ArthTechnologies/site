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
    fetch(`${API_URL}/file/docs/terms-of-service.md`)
      .then((response) => response.text())
      .then((text) => {
        const lines = text.split("\n");
        metadata = JSON.parse(lines[0]);
        console.log(metadata);
        t = marked(lines.slice(1).join("\n"));
        version = metadata.version;
        published = metadata.published;
        effective = metadata.effective;
      });
  }
</script>

<div class="bg-base-200 w-1/2 h-13 ml-5 mt-5 rounded-xl p-2">
  This is version {version} of our ToS. It was published on {published}
  and will go into effect on {effective}. You can see the previous version
  <a class="link" href="/terms-of-service/old">here</a>.
</div>
<article class="prose p-5">
  {@html t}
</article>
