<script>
  import RSS from "$lib/components/ui/RSS.svelte";
  import Email from "$lib/components/ui/Email.svelte";
  import { browser } from "$app/environment";

  //get the top 10 posts
  let posts = [];
  if (browser) {
    fetch("/posts/posts.json")
      .then((response) => response.json())
      .then((json) => {
        //take each item in the array, take the title and desc, and put them in posts
        json.forEach((item) => {
          posts.push({
            title: item.title,
            desc: item.desc,
            slug: item.slug,
          });
        });

        document.getElementById("posts").innerHTML = posts
          .map((post) => {
            return `<a href="/blog/${post.slug}"><div class="card shadow-xl bg-base-200 hover:bg-base-300 rounded-xl mb-10"><p class="text-4xl font-bold card-title text-left ml-5 md:text-center md:justify-center md:ml-0 mt-10">${post.title}</p><div class="card-body  hero"><p class="text-xl">${post.desc}</p></div></div></a>`;
          })
          .join("");
      });
  }
</script>

<p class="text-center text-5xl font-bold mt-10 mb-5">Blog</p>
<div class="flex place-content-center">
  <RSS />
  <Email />
</div>
<div id="posts" class="sm:text-left p-5 space-y-5 pr-20 pl-20 h-screen" />
