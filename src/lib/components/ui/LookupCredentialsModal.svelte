<script lang="ts">
  import { Trash2, Plus, Check, X, Loader2 } from "lucide-svelte";
  import credentials, {
    addCredential,
    removeCredential,
    type Credential,
  } from "$lib/stores/lookupCredentials";
  import { instanceUrl } from "$lib/scripts/accountId";

  let nodeName = "";
  let username = "";
  let token = "";

  type TestState = "idle" | "loading" | "ok" | "fail";
  let testStates: Record<string, TestState> = {};

  function mask(t: string): string {
    if (!t) return "";
    if (t.length <= 4) return "•".repeat(t.length);
    return "•".repeat(Math.min(t.length - 4, 8)) + t.slice(-4);
  }

  function submitAdd() {
    const n = nodeName.trim();
    const u = username.trim();
    const tk = token.trim();
    if (!n || !u || !tk) return;
    addCredential({ nodeName: n, username: u, token: tk });
    nodeName = "";
    username = "";
    token = "";
  }

  async function test(c: Credential) {
    testStates = { ...testStates, [c.nodeName]: "loading" };
    try {
      const res = await fetch(`${instanceUrl(c.nodeName)}/admin/system-tasks`, {
        headers: { username: c.username, token: c.token },
      });
      testStates = {
        ...testStates,
        [c.nodeName]: res.ok ? "ok" : "fail",
      };
    } catch {
      testStates = { ...testStates, [c.nodeName]: "fail" };
    }
  }

  $: entries = Object.values($credentials).sort((a, b) =>
    a.nodeName.localeCompare(b.nodeName)
  );
</script>

<div class="modal" id="lookupCreds">
  <div class="modal-box max-w-2xl">
    <a href="#" class="btn btn-neutral btn-sm btn-circle absolute right-2 top-2"
      >✕</a
    >
    <h3 class="font-bold text-lg mb-1">Instance credentials</h3>
    <p class="text-xs opacity-60 mb-4">
      Add an admin observer account for each Quartz instance you want to look up.
      Stored locally in your browser. URL is derived as
      <code class="bg-base-300 px-1 rounded">https://&lt;node&gt;.arthmc.xyz</code>.
    </p>

    {#if entries.length === 0}
      <div class="text-sm opacity-50 italic mb-4">No credentials yet.</div>
    {:else}
      <div class="flex flex-col gap-2 mb-4">
        {#each entries as c (c.nodeName)}
          <div
            class="flex items-center gap-2 bg-base-200 rounded-lg px-3 py-2"
          >
            <div class="flex-1 min-w-0">
              <div class="font-mono text-sm font-semibold truncate">
                {c.nodeName}
              </div>
              <div class="text-xs opacity-70 truncate">
                {c.username} · <span class="font-mono">{mask(c.token)}</span>
              </div>
            </div>
            <button
              class="btn btn-ghost btn-xs"
              on:click={() => test(c)}
              title="Test credential"
              disabled={testStates[c.nodeName] === "loading"}
            >
              {#if testStates[c.nodeName] === "loading"}
                <Loader2 size="14" class="animate-spin" />
              {:else if testStates[c.nodeName] === "ok"}
                <Check size="14" class="text-success" />
              {:else if testStates[c.nodeName] === "fail"}
                <X size="14" class="text-error" />
              {:else}
                Test
              {/if}
            </button>
            <button
              class="btn btn-ghost btn-xs text-error"
              on:click={() => removeCredential(c.nodeName)}
              title="Remove"
            >
              <Trash2 size="14" />
            </button>
          </div>
        {/each}
      </div>
    {/if}

    <div class="divider text-xs opacity-60">Add new</div>

    <form
      class="grid grid-cols-1 md:grid-cols-3 gap-2"
      on:submit|preventDefault={submitAdd}
    >
      <input
        class="input input-bordered input-sm"
        placeholder="node name (us-dallas-2)"
        bind:value={nodeName}
        autocomplete="off"
        spellcheck="false"
      />
      <input
        class="input input-bordered input-sm"
        placeholder="username (email:you@…)"
        bind:value={username}
        autocomplete="off"
        spellcheck="false"
      />
      <input
        class="input input-bordered input-sm font-mono"
        placeholder="token"
        bind:value={token}
        autocomplete="off"
        spellcheck="false"
        type="password"
      />
      <button
        class="btn btn-primary btn-sm md:col-span-3 mt-1"
        type="submit"
        disabled={!nodeName.trim() || !username.trim() || !token.trim()}
      >
        <Plus size="14" /> Add credential
      </button>
    </form>
  </div>
</div>
