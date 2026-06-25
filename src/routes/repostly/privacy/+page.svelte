<script lang="ts">
  import { browser } from "$app/environment";
  import { marked } from "marked";
  let content;

  if (browser) {
    fetch(`/content/repostly/privacy.md`)
      .then((response) => response.text())
      .then((text) => {
        content = marked(text);
      });
  }
</script>

<article class="prose p-5 max-w-4xl mx-auto">
  {#if content}
    {@html content}
  {:else}
    <p>Loading privacy policy...</p>
  {/if}
</article>

<style>
  :global(.prose) {
    @apply max-w-none;
  }
</style>
