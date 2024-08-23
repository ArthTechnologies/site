<script>
  import RSS from "$lib/components/ui/RSS.svelte";
  import Email from "$lib/components/ui/Email.svelte";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { t } from "$lib/scripts/i18n";
  import { ExternalLink, Star, StarIcon } from "lucide-svelte";
  let lang = "en-US";
  let posts = [];
  let promise;
  let featuredpost = {};
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
            if (item.title.includes("Privacy")) {
              featuredpost = {
                title: item.title,
                desc: item.desc,
                slug: lang + "*" + item.slug,
                image: item.image,
                date: item.date,
                imageurl: item.imageurl,
                author: item.author,
              };
            }
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

<p class="text-center text-5xl font-bold my-10">
  {$t("footer.blog")}
</p>
<div class="flex w-full gap-16">
  <div
    class="items-center flex gap-5 shadow bg-base-300 bg-opacity-90 rounded-xl p-6 w-1/2 ml-5"
  >
    <div class="flex flex-col gap-2 w-96">
      <div class="h-64 overflow-hidden">
        <img
          src={featuredpost.image}
          class="h-full w-full object-cover object-top rounded-xl w-60 shadow-xl"
        />
      </div>

      <div class="flex space-x-2">
        <img
          alt="{featuredpost.author}'s Icon"
          class="bg-slate-400 mask mask-squircle"
          width="35"
          src="https://cdn.masto.host/floss/accounts/avatars/109/207/881/612/624/574/original/6516bdc6b0ff0203.jpeg"
        />
        <div class="flex flex-col">
          <a
            class=" hover:link text-sm font-bold"
            href={featuredpost.imageauthor}
            >{featuredpost.author}
          </a>
          <p class="text-xs">{featuredpost.date}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2 w-[18rem] justify-start h-[16rem]">
      <span class="flex gap-1 items-center font-bold mb-1"
        ><Star size="18" />Featured Blog Post</span
      >
      <p class="text-4xl font-bold">{featuredpost.title}</p>
      <p>{featuredpost.desc}</p>
      <a
        href="/blog/{featuredpost.slug}"
        rel="noopener noreferrer"
        target="_blank"
        class="w-fit"
        ><button class="btn btn-neutral mt-2 btn-sm flex"
          ><ExternalLink size="18" class="mr-1.5" />Read Article</button
        ></a
      >
    </div>
  </div>
  <div class="grid grid-cols-2">
    <ul class="list-disc">
      <li>rfr</li>
      <li>hi</li>
    </ul>
  </div>
</div>

<div class="ml-8 flex gap-3 items-center -mb-1 mt-16">
  <p class="text-2xl font-bold">All Posts</p>

  <RSS />
  <select
    class="select select-bordered select-sm"
    id="lang"
    on:change={toggleLang}
  >
    <option>English</option>
    <option>Español</option>
  </select>
</div>
<div id="posts" class="grid grid-cols-1 gap-6 md:grid-cols-2 p-5 mb-32">
  {#await promise}
    {#each Array(8) as _}
      <div class="flex gap-5 shadow bg-base-200 rounded-xl p-6 h-[15rem]">
        <div class="flex flex-col gap-2">
          <div class="bg-base-100 animate-pulse rounded-xl h-28 w-48"></div>
          <div class="flex gap-2">
            <div
              class="bg-base-100 animate-pulse mask mask-squircle h-10 w-10"
            ></div>
            <div class="flex flex-col gap-2 mt-0.5">
              <div class="bg-base-100 animate-pulse h-4 w-20 rounded"></div>
              <div class="bg-base-100 animate-pulse h-3 w-10 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  {:then}
    {#each posts as post}
      <a href="/blog/{post.slug}"
        ><div
          class="items-center flex gap-5 shadow bg-base-200 hover:bg-base-300 rounded-xl p-6 h-[15rem]"
        >
          <div class="flex flex-col gap-2 w-[11rem]">
            <div class="h-24 overflow-hidden">
              <img
                src={post.image}
                class="h-full w-full object-cover object-top rounded-xl w-60 shadow-xl border-solid border-[0.13rem] border-slate-500"
              />
            </div>

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
