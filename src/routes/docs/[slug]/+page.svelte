<script lang="ts">
    import { onMount } from "svelte";
        import { browser } from "$app/environment";
        import {docs} from "$lib/scripts/load";

        //make slug a dynamic variable
        $: slug = "";
        if (browser) {
          slug = window.location.pathname.split("/").pop();
        }
        //run load(); everytime slug changes
        $slug: {
          console.log("hi")
        }



    onMount(() => {
       docs();
     
      });

     

    </script>
    <div id="text">

    </div>