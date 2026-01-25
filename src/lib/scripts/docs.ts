import { browser } from "$app/environment";
import { marked } from "marked";


export function load(slug) {


setTimeout(() => {
    let t = "";
    if (browser) {

        if (slug != "home" && (typeof slug != "string" || slug == "")) {
            slug = window.location.pathname;
            //remove any /s at the start or end
            if (slug[0] == "/") {
                slug = slug.slice(1);
            }
            if (slug[slug.length-1] == "/") {
                slug = slug.slice(0,slug.length-1);
            }
            slug = slug.split("/")[slug.split("/").length-1];
        }

        let url = `/content/docs/`+slug+".md";
        console.log(slug)

        fetch(url)
  .then((response) => response.text())
  .then((text) => {
    if (!text) return;
    t = marked(text);
        //append t to element "text"

        const el = document.getElementById("text");
        if (el) el.innerHTML = t;
    })
  .catch((err) => {
    console.error("Docs fetch failed:", err.message);
  });
      }
}, 50);
}