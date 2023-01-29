<script lang="ts">
    import { browser } from "$app/environment";
    import { marked } from "marked";
let t;


if (browser) {
    fetch("/docs/privacy.md")
    .then((response) => response.text())
    .then((text) => {

      t = marked(text);

      });
}
    </script>

<article class="prose p-5">

    {@html t}
</article>