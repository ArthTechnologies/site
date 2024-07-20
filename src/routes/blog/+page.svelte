<script>
  import RSS from "$lib/components/ui/RSS.svelte";
  import Email from "$lib/components/ui/Email.svelte";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  let lang = "en-US";
  let posts = [];
  let promise;
  if (browser) {
    lang = navigator.language;
    if (localStorage.getItem("lang") != null) {
      lang = localStorage.getItem("lang");
    }
    onMount(() => {
      if (lang == "en-US") {
        document.getElementById("lang").value = "English";
      } else if (lang == "es-ES") {
        document.getElementById("lang").value = "Español";
      }
      get();
    });
  }
  function get() {
    //get the top 10 posts

    if (browser) {
      promise = fetch("https://backend.arthmc.xyz/index/posts")
        .then((response) => response.json())
        .then((json) => {
          //take each item in the array, take the title and desc, and put them in posts
          json[lang].forEach((item) => {
            posts.push({
              title: item.title,
              desc: item.desc,
              slug: lang + "*" + item.slug,
              image: item.image,
              date: item.date,
              imageurl: item.imageurl,
              author: item.author,
            });
          });
        });
    }
  }

  function toggleLang() {
    if (browser) {
      posts = [];
      if (document.getElementById("lang").value == "English") {
        lang = "en-US";
      } else if (document.getElementById("lang").value == "Español") {
        lang = "es-ES";
      }
      get();
    }
  }

  /*function insufficientContrast(imageData) {
    //get a color from the right of the image and see if it is too cloes to #242933
    let color = imageData.data.slice(0, 4);
    let color2 = [36, 41, 51, 255];
    let diff = 0;
    for (let i = 0; i < color.length; i++) {
      diff += Math.abs(color[i] - color2[i]);
    }
  }*/
</script>

<p class="text-center text-5xl font-bold mt-10 mb-5">Blog</p>
<div class="flex place-content-center gap-1.5">
  <RSS />
  <select class="select select-bordered" id="lang" on:change={toggleLang}>
    <option>English</option>
    <option>Español</option>
  </select>
</div>
<div id="posts" class="grid grid-cols-1 gap-6 md:grid-cols-2 p-5 mb-24">
  {#await promise then}
    {#each posts as post}
      <a href="/blog/{post.slug}"
        ><div
          class=" flex gap-5 shadow bg-base-200 hover:bg-base-300 rounded-xl p-6"
        >
          <div class="flex flex-col gap-2 w-[11rem]">
            <img
              src={post.image}
              class="rounded-xl w-60 shadow-xl border-solid border-[0.13rem] border-slate-500"
            />
            <div class="flex space-x-2">
              <img
                alt="{post.author}'s Icon"
                class="bg-slate-400 mask mask-squircle"
                width="35"
                src="https://cdn.masto.host/floss/accounts/avatars/109/207/881/612/624/574/original/6516bdc6b0ff0203.jpeg"
              />
              <div class="flex flex-col">
                <a class=" hover:link text-sm font-bold" href={post.imageauthor}
                  >{post.author}
                </a>
                <p class="text-xs">{post.date}</p>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2 w-[18rem]">
            <p class="text-4xl font-bold">{post.title}</p>
            <p>{post.desc}</p>
          </div>
        </div>
      </a>
    {/each}
  {/await}
</div>
