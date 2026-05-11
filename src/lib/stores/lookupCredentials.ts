import { browser } from "$app/environment";
import { writable } from "svelte/store";

export type Credential = {
  nodeName: string;
  username: string;
  token: string;
};

export type CredentialMap = Record<string, Credential>;

const STORAGE_KEY = "lookup_credentials";

function loadInitial(): CredentialMap {
  if (!browser) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as CredentialMap;
    return {};
  } catch {
    return {};
  }
}

const credentials = writable<CredentialMap>(loadInitial());

credentials.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }
});

export function addCredential(c: Credential) {
  credentials.update((map) => ({ ...map, [c.nodeName]: c }));
}

export function removeCredential(nodeName: string) {
  credentials.update((map) => {
    const next = { ...map };
    delete next[nodeName];
    return next;
  });
}

export function getCredentialFor(map: CredentialMap, nodeName: string): Credential | null {
  return map[nodeName] || null;
}

export default credentials;
