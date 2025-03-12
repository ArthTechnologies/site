<script lang="ts">
    import { browser } from "$app/environment";
    import ThreadCharts from "$lib/components/ui/ThreadCharts.svelte";

    import { t } from "$lib/scripts/i18n";
    import { HardDriveDownload } from "lucide-svelte";
        let performance = [];
        let performanceReq = null;
    if (browser) {
        performanceReq = fetch("https://eu-germany-1.arthmc.xyz/dashboard/snapshot", {
            method: "GET",

        })
            .then((res) => res.json())
            .then((res) => {
                performance = res;
                console.log(performance);
            });
    }
</script>
<div class="flex">
<div class="bg-base-300 rounded-lg p-4">
    {#await performanceReq}
    <p>Loading...</p>
{:then}
<ThreadCharts {performance} />{/await}
</div>
</div>