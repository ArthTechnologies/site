<script>
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";

  if (browser) {
    goto("terms-of-service");
  }
</script>
