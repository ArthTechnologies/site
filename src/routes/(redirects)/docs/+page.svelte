<script>
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";

  if (browser) {
    let slug = window.location.pathname.split("/")[2];
    goto("software" + slug);
  }
</script>
