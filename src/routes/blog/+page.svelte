<script>
  import RSS from "$lib/components/ui/RSS.svelte";
  import Email from "$lib/components/ui/Email.svelte";
  import { browser } from "$app/environment";
  let lang = "en-US";
  if (browser) {
    lang = navigator.language;
    if (localStorage.getItem("lang") != null) {
      lang = localStorage.getItem("lang");
    }
    if (lang == "en-US") {
      document.getElementById("lang").value = "English";
    } else if (lang == "es-ES") {
      document.getElementById("lang").value = "Español";
    }
  }
  function get() {
    //get the top 10 posts
    let posts = [];
    if (browser) {
      fetch("https://backend.arthmc.xyz/index/posts")
        .then((response) => response.json())
        .then((json) => {
          //take each item in the array, take the title and desc, and put them in posts
          json[lang].forEach((item) => {
            posts.push({
              title: item.title,
              desc: item.desc,
              slug: item.slug,
            });
          });
          document.getElementById("posts").innerHTML = posts
            .map((post) => {
              return `<a href="/blog/${post.slug}"><div class="card shadow-lg bg-base-200 hover:bg-base-300 rounded-xl mb-10"><p class="text-4xl font-bold card-title text-left ml-8 md:text-center md:justify-center lg:ml-0 mt-10">${post.title}</p><div class="card-body  hero"><p class="text-xl">${post.desc}</p></div></div></a>`;
            })
            .join("");
        });
    }
  }
  get();

  function toggleLang() {
    if (browser) {
      document.getElementById("posts").innerHTML = "";
      if (document.getElementById("lang").value == "English") {
        lang = "en-US";
      } else if (document.getElementById("lang").value == "Español") {
        lang = "es-ES";
      }
      get();
    }
  }
</script>

<p class="text-center text-5xl font-bold mt-10 mb-5">Blog</p>
<div class="flex place-content-center gap-1.5">
  <RSS />
  <select class="select select-bordered" id="lang" on:change={toggleLang}>
    <option>English</option>
    <option>Español</option>
  </select>
</div>
<div
  id="posts"
  class="sm:text-left p-5 space-y-5 md:px-20 min-h-screen mb-24"
/>
