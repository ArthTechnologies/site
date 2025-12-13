<script type="ts">
  import { API_URL } from "$lib/scripts/config";
  import { browser } from "$app/environment";
  import ShareToMastodon from "$lib/components/ui/ShareToMastodon.svelte";
  import { onMount } from "svelte";
  import { marked } from "marked";
  import ShareToX from "$lib/components/ui/ShareToX.svelte";
  import QrCode from "$lib/components/ui/QRCode.svelte";
  import CopyLink from "$lib/components/ui/CopyLink.svelte";
  //set slug variable to the slug
  let slug;
  let title: string;
  let desc;
  let date;
  let author;
  let authorLink;
  let authorImage;
  let t;


  onMount(() => {
    //set text to the contents of "/posts" + slug + ".md"
    if (browser) {
      slug = window.location.pathname;
      //if last char is / remove it
      if (slug[slug.length - 1] == "/") {
        slug = slug.slice(0, -1);
      }
      slug = slug.split("/").pop();
      
      fetch(`${API_URL}/file/posts/` + slug + ".md")
        .then((response) => response.text())
        .then((text) => {
          //turn everything before line 7 into a variable and remove the from text
          title = text.split("\n")[0];
          desc = text.split("\n")[1];
          date = text.split("\n")[2];
          author = text.split("\n")[3];
          authorLink = text.split("\n")[4];
          authorImage = text.split("\n")[5];

          //remove the first 7 lines
          text = text.split("\n").slice(8).join("\n");

          t = marked(text);
        });
    }
  });
</script>

<div class="p-5 flex flex-col px-0 md:px-[150px] xl:px-[300px]">
  <p class="text-5xl text-center p-4 font-bold">{title}</p>
  <p class="text-xl text-center p-4">{desc}</p>
  <div class="flex space-x-2 ml-8 mt-4">
    <img
      alt="{author}'s Icon"
      src={authorImage}
      class="bg-slate-400 mask mask-squircle"
      width="50"
    />
    <div class="flex flex-col">
      <a class="text-primary hover:link" href={authorLink}>{author}</a>
      <p class="">{date}</p>
    </div>
    <div class="flex">
      <ShareToMastodon />
      <ShareToX />
      <CopyLink />
    </div>
  </div>
  <article class="space-y-1 mr-8 ml-8 text-lg prose max-w-none pb-36">
    {@html t}
  </article>
</div>
