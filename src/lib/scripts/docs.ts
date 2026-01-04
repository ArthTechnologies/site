import { browser } from "$app/environment";
import { marked } from "marked";
import { API_URL } from "$lib/scripts/config";


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

        let url = `${API_URL}/file/docs/`+slug+".md";
        console.log(slug)

        fetch(url)
  .then((response) => response.text())
  .then((text) => {

    t = marked(text);
        //append t to element "text"

        document.getElementById("text").innerHTML = t;
    });
      }
}, 50);
}