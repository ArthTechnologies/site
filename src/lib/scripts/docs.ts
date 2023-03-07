import { browser } from "$app/environment";
import { marked } from "marked";
import { select_option } from "svelte/internal";

export function load(slug) {


setTimeout(() => {
    let t = "";
    if (browser) {
            
        if (slug != "home") {
            slug = window.location.pathname.split("/").pop();
        }
        fetch("https://backend.arthmc.xyz/file/docs/"+slug+".md")
  .then((response) => response.text())
  .then((text) => {

    t = marked(text);
        //append t to element "text"

        document.getElementById("text").innerHTML = t;
    });
      }
}, 50);
}