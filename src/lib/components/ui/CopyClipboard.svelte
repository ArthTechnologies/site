<script>
  import { onMount } from "svelte";

  export let link;

  let textarea;

  onMount(() => {
    textarea.select();
    document.execCommand("copy");
  });
</script>

<textarea bind:value={link} bind:this={textarea} />
