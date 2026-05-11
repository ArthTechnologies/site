<script lang="ts">
  import { onMount } from "svelte";
  import {
    Settings,
    Search,
    User,
    Server,
    AlertTriangle,
    KeyRound,
    Clock,
    Mail,
    Shield,
    Loader2,
    Copy,
    Check,
  } from "lucide-svelte";
  import { decodeAccountId, instanceUrl } from "$lib/scripts/accountId";
  import credentials from "$lib/stores/lookupCredentials";
  import LookupCredentialsModal from "$lib/components/ui/LookupCredentialsModal.svelte";

  let input = "";
  let loading = false;
  let result: any = null;
  let errorMsg: string | null = null;
  let errorKind: "creds" | "auth" | "notfound" | "network" | "decode" | "other" | null =
    null;
  let copied = false;

  $: decoded = decodeAccountId(input);
  $: hasCredsForDecoded = decoded ? !!$credentials[decoded.nodeName] : false;

  function fmtTime(unixMs: number | null | undefined): string {
    if (!unixMs) return "—";
    try {
      const d = new Date(unixMs);
      return d.toLocaleString();
    } catch {
      return String(unixMs);
    }
  }

  function fmtRelative(unixMs: number | null | undefined): string {
    if (!unixMs) return "";
    const diff = Date.now() - unixMs;
    const s = Math.floor(diff / 1000);
    if (s < 60) return `${s}s ago`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
  }

  async function lookup() {
    errorMsg = null;
    errorKind = null;
    result = null;

    const id = input.trim();
    if (!id) return;

    const d = decodeAccountId(id);
    if (!d) {
      errorKind = "decode";
      errorMsg = "Couldn't decode that account ID.";
      return;
    }

    const creds = $credentials[d.nodeName];
    if (!creds) {
      errorKind = "creds";
      errorMsg = `No credentials stored for instance "${d.nodeName}".`;
      return;
    }

    loading = true;
    try {
      const res = await fetch(`${instanceUrl(d.nodeName)}/admin/lookup/${id}`, {
        headers: { username: creds.username, token: creds.token },
      });

      if (res.status === 403) {
        errorKind = "auth";
        errorMsg = `Quartz rejected the credentials for "${d.nodeName}" — confirm the account has adminAccess.`;
        return;
      }
      if (res.status === 404) {
        errorKind = "notfound";
        errorMsg = "No account on that instance matches this ID.";
        return;
      }
      if (!res.ok) {
        errorKind = "other";
        errorMsg = `Quartz responded with HTTP ${res.status}.`;
        return;
      }

      const body = await res.json();
      if (body.notFound) {
        errorKind = "notfound";
        errorMsg = "No account on that instance matches this ID.";
        return;
      }
      result = body;
    } catch (e: any) {
      errorKind = "network";
      errorMsg = `Network error: ${e?.message ?? "unknown"}`;
    } finally {
      loading = false;
    }
  }

  function copyId() {
    if (!input) return;
    navigator.clipboard.writeText(input.trim()).then(() => {
      copied = true;
      setTimeout(() => (copied = false), 1200);
    });
  }

  function softwareColor(s: string | null): string {
    if (!s) return "badge-ghost";
    const l = s.toLowerCase();
    if (l.includes("paper") || l.includes("spigot") || l.includes("bukkit"))
      return "badge-warning";
    if (l.includes("fabric")) return "badge-info";
    if (l.includes("forge") || l.includes("neoforge")) return "badge-error";
    if (l.includes("vanilla")) return "badge-success";
    return "badge-ghost";
  }
</script>

<svelte:head>
  <title>Lookup</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen px-4 pt-10 pb-32 max-w-5xl mx-auto">
  <!-- header -->
  <div class="flex items-center justify-between mb-8">
    <div>
      <h1
        class="text-4xl font-bold tracking-tight flex items-center gap-3"
      >
        <span
          class="inline-block w-2 h-8 rounded-full bg-primary"
          aria-hidden="true"
        />
        Lookup
      </h1>
      <p class="text-sm opacity-50 mt-1 ml-5">Admin account inspection across instances</p>
    </div>
    <a
      href="#lookupCreds"
      class="btn btn-ghost btn-sm gap-2"
      title="Manage credentials"
    >
      <Settings size="18" />
      <span class="hidden sm:inline">Credentials</span>
      <span class="badge badge-sm badge-primary">{Object.keys($credentials).length}</span>
    </a>
  </div>

  <!-- input card -->
  <div
    class="bg-base-200/60 backdrop-blur rounded-2xl p-5 border border-base-300 shadow-lg"
  >
    <form on:submit|preventDefault={lookup} class="flex flex-col gap-3">
      <label
        for="lookup-input"
        class="text-xs uppercase tracking-wider opacity-50 font-semibold"
        >Account ID</label
      >
      <div class="flex gap-2">
        <div class="relative flex-1">
          <input
            id="lookup-input"
            class="input input-bordered input-lg w-full font-mono text-base pr-10"
            placeholder="acc_…"
            bind:value={input}
            autocomplete="off"
            spellcheck="false"
            autofocus
          />
          {#if input}
            <button
              type="button"
              class="btn btn-ghost btn-xs btn-circle absolute right-2 top-1/2 -translate-y-1/2"
              on:click={copyId}
              title="Copy"
            >
              {#if copied}
                <Check size="14" class="text-success" />
              {:else}
                <Copy size="14" />
              {/if}
            </button>
          {/if}
        </div>
        <button
          type="submit"
          class="btn btn-primary btn-lg gap-2"
          disabled={loading || !input.trim()}
        >
          {#if loading}
            <Loader2 size="18" class="animate-spin" />
          {:else}
            <Search size="18" />
          {/if}
          Look up
        </button>
      </div>

      <!-- decoded preview -->
      {#if input.trim()}
        <div
          class="flex items-center gap-2 flex-wrap text-xs font-mono opacity-80 mt-1"
        >
          {#if decoded}
            <span class="badge badge-outline gap-1"
              ><Server size="11" />{decoded.nodeName}</span
            >
            <span class="opacity-40">→</span>
            <span class="badge badge-outline">{decoded.provider}:{decoded.username}…</span>
            {#if !hasCredsForDecoded}
              <a
                href="#lookupCreds"
                class="badge badge-warning gap-1 cursor-pointer no-underline"
                ><AlertTriangle size="11" />no credentials</a
              >
            {:else}
              <span class="badge badge-success gap-1"
                ><KeyRound size="11" />ready</span
              >
            {/if}
          {:else}
            <span class="badge badge-error">invalid format</span>
          {/if}
        </div>
      {/if}
    </form>
  </div>

  <!-- error -->
  {#if errorMsg && !result}
    <div
      class="mt-6 alert"
      class:alert-error={errorKind === "auth" || errorKind === "decode" || errorKind === "other"}
      class:alert-warning={errorKind === "creds" || errorKind === "notfound"}
      class:alert-info={errorKind === "network"}
    >
      <AlertTriangle size="18" />
      <span>{errorMsg}</span>
      {#if errorKind === "creds"}
        <a href="#lookupCreds" class="btn btn-sm btn-ghost">Add credentials</a>
      {/if}
    </div>
  {/if}

  <!-- loading -->
  {#if loading}
    <div class="mt-6 grid gap-4">
      <div class="skeleton h-40 w-full rounded-2xl"></div>
      <div class="skeleton h-56 w-full rounded-2xl"></div>
    </div>
  {/if}

  <!-- result -->
  {#if result && !loading}
    <!-- account card -->
    <div class="mt-6 relative">
      <div
        class="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/40 to-secondary/30 blur opacity-60"
        aria-hidden="true"
      ></div>
      <div
        class="relative bg-base-200 rounded-2xl p-6 border border-base-300"
      >
        <div class="flex items-start justify-between gap-4 flex-wrap">
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
            >
              <User size="22" class="text-primary" />
            </div>
            <div>
              <div class="font-bold text-xl break-all">
                {result.account.email || result.account.name}
              </div>
              <div class="text-xs opacity-60 font-mono break-all">
                {result.account.name}
              </div>
            </div>
          </div>
          {#if result.account.adminAccess}
            <span class="badge badge-secondary gap-1"
              ><Shield size="12" />admin</span
            >
          {/if}
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          <div class="bg-base-300/50 rounded-lg p-3">
            <div
              class="text-[10px] uppercase tracking-wider opacity-50 flex items-center gap-1"
            >
              <Mail size="10" />Type
            </div>
            <div class="font-semibold mt-1">{result.account.type ?? "—"}</div>
          </div>
          <div class="bg-base-300/50 rounded-lg p-3">
            <div
              class="text-[10px] uppercase tracking-wider opacity-50 flex items-center gap-1"
            >
              <Server size="10" />Servers
            </div>
            <div class="font-semibold mt-1">
              {result.servers.length}
              {#if result.account.freeServers}
                <span class="text-xs opacity-60 font-normal">
                  ({result.account.freeServers} free)
                </span>
              {/if}
            </div>
          </div>
          <div class="bg-base-300/50 rounded-lg p-3">
            <div
              class="text-[10px] uppercase tracking-wider opacity-50 flex items-center gap-1"
            >
              <Clock size="10" />Last sign-in
            </div>
            <div class="font-semibold mt-1 text-sm" title={fmtTime(result.account.lastSignIn)}>
              {fmtRelative(result.account.lastSignIn) || "—"}
            </div>
          </div>
          <div class="bg-base-300/50 rounded-lg p-3">
            <div
              class="text-[10px] uppercase tracking-wider opacity-50 flex items-center gap-1"
            >
              <KeyRound size="10" />Reset attempts
            </div>
            <div class="font-semibold mt-1">{result.account.resetAttempts}</div>
          </div>
        </div>

        <div class="mt-4 text-xs opacity-50 font-mono break-all">
          {result.account.accountId}
        </div>
      </div>
    </div>

    <!-- servers -->
    <div class="mt-6">
      <div class="flex items-center gap-2 mb-3 ml-1">
        <Server size="16" class="opacity-60" />
        <h2 class="font-semibold tracking-wide uppercase text-sm opacity-80">
          Servers
        </h2>
        <span class="text-xs opacity-50">({result.servers.length})</span>
      </div>

      {#if result.servers.length === 0}
        <div
          class="bg-base-200/50 rounded-2xl p-8 text-center text-sm opacity-60 border border-dashed border-base-300"
        >
          This account owns no servers.
        </div>
      {:else}
        <div class="grid gap-3 md:grid-cols-2">
          {#each result.servers as s (s.id)}
            <div
              class="bg-base-200 rounded-xl p-4 border border-base-300 hover:border-primary/40 transition"
              class:opacity-50={s.missing}
            >
              {#if s.missing}
                <div class="flex items-center gap-2 text-warning text-sm">
                  <AlertTriangle size="14" />
                  Server {s.id} missing on disk
                </div>
              {:else}
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0 flex-1">
                    <div class="font-semibold truncate">
                      {s.name || `Server ${s.id}`}
                    </div>
                    <div class="text-xs opacity-50 font-mono">#{s.id}</div>
                  </div>
                  <div class="flex items-center gap-1.5 flex-shrink-0">
                    <span
                      class="inline-block w-2 h-2 rounded-full"
                      class:bg-success={s.state === "true" || s.state === true}
                      class:bg-base-content={!(s.state === "true" || s.state === true)}
                      class:opacity-30={!(s.state === "true" || s.state === true)}
                    ></span>
                    <span class="text-xs opacity-70">
                      {s.state === "true" || s.state === true ? "running" : "stopped"}
                    </span>
                  </div>
                </div>
                <div class="mt-2 flex items-center gap-2 flex-wrap text-xs">
                  <span class="badge badge-sm {softwareColor(s.software)}">
                    {s.software || "unknown"}
                  </span>
                  {#if s.version}
                    <span class="opacity-60 font-mono">{s.version}</span>
                  {/if}
                  {#if s.adminServer}
                    <span class="badge badge-sm badge-secondary gap-1">
                      <Shield size="10" />admin
                    </span>
                  {/if}
                  {#if s.ownerMismatch}
                    <span
                      class="badge badge-sm badge-warning gap-1"
                      title="server.json accountId differs from this account"
                    >
                      <AlertTriangle size="10" />owner mismatch
                    </span>
                  {/if}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}

  <!-- empty state -->
  {#if !result && !errorMsg && !loading}
    <div class="mt-12 text-center opacity-40">
      <Search size="32" class="mx-auto mb-2" />
      <p class="text-sm">Paste an account ID to begin.</p>
      {#if Object.keys($credentials).length === 0}
        <p class="text-xs mt-2">
          First, <a href="#lookupCreds" class="link link-primary">add credentials</a>
          for at least one instance.
        </p>
      {/if}
    </div>
  {/if}
</div>

<LookupCredentialsModal />

<style lang="scss">
  :global(body) {
    background:
      radial-gradient(circle at 20% 0%, rgba(8, 131, 133, 0.08), transparent 40%),
      radial-gradient(circle at 80% 100%, rgba(204, 67, 4, 0.06), transparent 40%);
  }
</style>
