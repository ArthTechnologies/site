<script lang="ts">
    import { marked } from "marked";
        import { browser } from "$app/environment";

let t;
        //make slug a dynamic variable
        $: slug = "";
        if (browser) {
          slug = window.location.pathname.split("/").pop();
          fetch("/docs/home.mdn")
    .then((response) => response.text())
    .then((text) => {

      t = marked(text);

      });
        }
        

     

</script>

<article class="prose max-w-screen text-lg pl-5 pt-5">
    {@html t}
</article>