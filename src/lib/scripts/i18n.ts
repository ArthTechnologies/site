import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

export const locale = writable('en-US');
export const loadedLocales: Record<string, Record<string, string>> = {};
const translationCache: Record<string, string> = {};

// core loader
async function loadLocale(lang: string): Promise<Record<string, string>> {
  if (loadedLocales[lang]) return loadedLocales[lang];
  try {
    const module = await import(`./locales/${lang}.json`);
    loadedLocales[lang] = module.default || {};
  } catch {
    if (lang !== 'en-US') {
      return loadLocale('en-US');
    }
    loadedLocales[lang] = {};
  }
  return loadedLocales[lang];
}

// internal async lookup
async function fetchTranslation(lang: string, key: string, vars: Record<string, string>) {
  const msgs = await loadLocale(lang);
  let text = msgs[key] || '';
  // fallback by short code
  if (!text) {
    const short = lang.split('-')[0];
    const fallback = Object.keys(loadedLocales).find((k) => k.startsWith(short));
    text = fallback ? loadedLocales[fallback][key] : '';
  }
  // last fallback
  if (!text) {
    const en = await loadLocale('en-US');
    text = en[key] || key;
  }
  // variable substitution
  Object.entries(vars).forEach(([k, v]) => {
    text = text.replace(`{{${k}}}`, v);
  });
  return text;
}

// factory to produce the translator fn
function makeTranslator() {
  return (key: string, vars: Record<string,string> = {}) => {
    // if we’ve already fetched it, return cached
    if (translationCache[key]) {
      return translationCache[key];
    }
    // otherwise, kick off loading...
    const lang = browser && localStorage.getItem('lang')
      ? localStorage.getItem('lang')!
      : get(locale);
    fetchTranslation(lang, key, vars)
      .then((txt) => {
        translationCache[key] = txt;
        // trigger store update so Svelte re-runs {$t("key")}
        t.set(makeTranslator());
      })
      .catch(() => {
        translationCache[key] = key;
        t.set(makeTranslator());
      });
    // in the meantime, render the key itself
    return key;
  };
}

// the store holds _our_ translator function
export const t = writable<(key:string,vars?:Record<string,string>)=>string>(
  makeTranslator()
);
