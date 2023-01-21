import { browser } from "$app/environment";
let slug;

function load(type:string) {
    fetch("/"+type+"/" + slug + ".mdn")
    .then((response) => response.text())
    .then((text) => {
        




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
        '<img src="$2" class="pt-3"></img>'
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

      //appent text to the body
      document.getElementById("text").innerHTML = text;
    });
}

export function docs() {
//wait 10 milliseconds for the page to load
setTimeout(() => {

    if (browser) {
      slug = window.location.pathname.split("/").pop();
      console.log("loading doc: /" + slug);
        load("docs");
    }

}, 50);
  }
  