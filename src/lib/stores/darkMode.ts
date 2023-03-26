import { browser } from "$app/environment";
import { writable } from "svelte/store";

const defaultValue = true;
const initialValue = browser
  ? window.localStorage.getItem("darkMode") ?? defaultValue
  : defaultValue;

if (browser) {
  console.log(window.localStorage.getItem("theme"));
  if (window.localStorage.getItem("theme") == null) {
    window.localStorage.setItem("theme", "dark");
  }
}
const darkMode = writable(initialValue);

darkMode.subscribe((value) => {
  let newValue: string = value.toString();
  if (browser) {
    window.localStorage.setItem("darkMode", newValue);
  }
});

export default darkMode;
