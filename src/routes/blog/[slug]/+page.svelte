<script type="ts">
  import { browser } from "$app/environment";
  import ShareToMastodon from "$lib/components/ui/ShareToMastodon.svelte";
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

  //set text to the contents of "/posts" + slug + ".md"
  if (browser) {
    fetch("../src/posts/" + slug + ".mdn")
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
          '<p class="text-3xl font-bold">$2</p>'
        );

        text = text.replace(
          /^(## )(.*)/gm,
          '<p class="text-xl font-bold ">$2</p>'
        );

        //if a line starts with ![image], put what's inside the parentheses inside <img src="..."> </img>
        text = text.replace(/!\[(.*)\]\((.*)\)/gm, '<img src="$2"></img>');
        console.log(text);
        //appent text to the body
        document.getElementById("text").innerHTML = text;
      });
  }
</script>

<div class="p-5 flex flex-col">
  <p class="text-5xl text-center p-4 font-bold">{title}</p>
  <p class="text-xl text-center p-4 ">{desc}</p>
  <div class="flex space-x-2">
    <img alt="{author}'s Icon" src={authorImage} class="" width="50" />
    <div class="flex flex-col">
      <a class="link" href={authorLink}>{author}</a>
      <p class="">{date}</p>
    </div>
    <div class="flex-row-reverse">
      <ShareToMastodon />
    </div>
  </div>
  <div id="text" class="space-y-5 text-center" />
</div>
