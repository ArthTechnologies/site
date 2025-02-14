<script lang="ts">
  import { browser } from "$app/environment";
  import { marked } from "marked";
  let t;
  let metadata;
  let version;
  let published;
  let effective;

  if (browser) {
    fetch("https://ocelot.arthmc.xyz/file/docs/privacy_old.md")
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
  This is version {version} of our privacy policy. It was published on {published}
  and went into effect on {effective} before being replaced by version {version +
    1}. You can see the current version
  <a class="link" href="/privacy/">here</a>.
</div>
<article class="prose p-5">
  {@html t}
</article>
