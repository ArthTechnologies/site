<script type="ts">
  import { browser } from "$app/environment";
  import ShareToMastodon from "$lib/components/ui/ShareToMastodon.svelte";
  import { onMount } from "svelte";
  //set slug variable to the slug
  let slug;
  let title: string;
  let desc;
  let date;
  let author;
  let authorLink;
  let authorImage;

  if (browser) {
    slug = window.location.pathname.split("/").pop();
  }

  onMount(() => {
    //set text to the contents of "/posts" + slug + ".md"
    if (browser) {
      fetch("/posts/" + slug + ".mdn")
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

          //line changes

          //if a line starts with a #, put it inside <p class="hi"> </p>
          text = text.replace(
            /^(# )(.*)/gm,
            '<p class="text-3xl font-bold py-3">$2</p>'
          );

          text = text.replace(
            /^(## )(.*)/gm,
            '<p class="text-2xl font-bold py-3">$2</p>'
          );

          //if a line starts with ![image], put what's inside the parentheses inside <img src="..."> </img>
          text = text.replace(
            /!\[(.*)\]\((.*)\)/gm,
            '<img src="$2" class="py-3"></img>'
          );

          //if a line starts with ![image-bordered], put what's inside the parentheses inside <img src="..." class="border-2 border-base-300"> </img>
          text = text.replace(
            /!\[(.*)-bordered\]\((.*)\)/gm,
            '<img src="$2" class="border-solid border-2 border-base-300 mt-3"></img>'
          );

          //replace [text](link) with <a href="link">text</a>
          text = text.replace(
            /\[(.*)\]\((.*)\)/gm,
            '<a href="$2" class="link">$1</a>'
          );
          //turn 2 spaces into \n
          text = text.replace(/  /gm, "<br>");

          //turn ** into <b> </b>
          text = text.replace(/\*\*(.*)\*\*/gm, "<b>$1</b>");
          console.log(text);
          //appent text to the body
          document.getElementById("text").innerHTML = text;
        });
    }
  });
</script>

<div class="p-5 flex flex-col px-[300px]">
  <p class="text-5xl text-center p-4 font-bold">{title}</p>
  <p class="text-xl text-center p-4 ">{desc}</p>
  <div class="flex space-x-2 pb-5">
    <img
      alt="{author}'s Icon"
      src={authorImage}
      class="mask mask-squircle"
      width="50"
    />
    <div class="flex flex-col">
      <a class="link" href={authorLink}>{author}</a>
      <p class="">{date}</p>
    </div>
    <div class="flex-row-reverse">
      <ShareToMastodon />
    </div>
  </div>
  <div id="text" class="space-y-1 mr-8 ml-8 text-lg" />
</div>
