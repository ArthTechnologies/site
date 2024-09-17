<script lang="ts">
  import { marked } from "marked";
  import { load } from "$lib/scripts/docs";
  import { ExternalLink } from "lucide-svelte";
  import { t } from "$lib/scripts/i18n";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  load("how-to-join-servers");
</script>

<article id="text" class="prose max-w-screen text-lg px-1 md:px-5 pt-5 pb-36" />
<div
  class="w-full h-full bg-gradient-to-b from-base-300 to-[#542d25] absolute z-[-1] top-0 -left-3"
></div>
