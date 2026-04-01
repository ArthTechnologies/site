// Analytics are now handled by SvelteKit server routes (/api/analytics/*)
// API_URL is kept only for legacy pages (status, RSS, infrastructure) that
// previously pointed to the old ocelot backend — those endpoints are offline.
export const API_URL = "https://ocelot.arthmc.xyz";
