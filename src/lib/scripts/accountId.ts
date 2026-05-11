export type DecodedAccountId = {
  nodeName: string;
  provider: string;
  username: string;
};

export function decodeAccountId(id: string): DecodedAccountId | null {
  if (typeof id !== "string") return null;
  const trimmed = id.trim();
  if (!trimmed.startsWith("acc_")) return null;
  const payload = trimmed.slice(4);
  if (payload.length === 0) return null;

  let b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4 !== 0) b64 += "=";

  let decoded: string;
  try {
    decoded = atob(b64);
  } catch {
    return null;
  }

  const starIdx = decoded.indexOf("*");
  if (starIdx === -1) return null;
  // Strip .arthmc.xyz suffix if the full hostname was encoded instead of just the short name
  let nodeName = decoded.slice(0, starIdx);
  if (nodeName.endsWith(".arthmc.xyz")) nodeName = nodeName.slice(0, -".arthmc.xyz".length);
  const rest = decoded.slice(starIdx + 1);

  const colonIdx = rest.indexOf(":");
  if (colonIdx === -1) return null;
  const provider = rest.slice(0, colonIdx);
  const username = rest.slice(colonIdx + 1);

  if (!nodeName || !provider || !username) return null;
  return { nodeName, provider, username };
}

export function instanceUrl(nodeName: string): string {
  return `https://${nodeName}.arthmc.xyz`;
}
