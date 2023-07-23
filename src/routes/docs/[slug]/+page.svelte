<script lang="ts">
    import { marked } from "marked";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import { load } from "$lib/scripts/docs";
    load();
</script>

<article id="text" class="prose max-w-screen text-lg pl-5 pt-5 pb-36" />
