<script lang="ts">
import { API_URL } from "$lib/scripts/config";
    import { browser } from "$app/environment";
    import CpuChart from "$lib/components/ui/CpuChart.svelte";
    import MemoryChart from "$lib/components/ui/MemoryChart.svelte";
    import ThreadCharts from "$lib/components/ui/ThreadCharts.svelte";

    import { t } from "$lib/scripts/i18n";
    import { CpuIcon, HardDriveDownload, Hash, InfoIcon, MemoryStick, MinusIcon } from "lucide-svelte";

        let performance = [];
        let performanceReq = 1;


    let nodeInfo = [];
    let selectedNode = "";

    if (browser) {
        selectedNode = "us-dallas-1";
      
       
        getPerformance();
        fetch(`${API_URL}/nodeInfo`
            .then(response => response.json())
            .then(data => {
                nodeInfo = data;
                document.getElementById("https://us-dallas-1.arthmc.xyz/").checked = true;
            });

    }

    function getPerformance() {
        performanceReq = 2;
         fetch("https://"+selectedNode+ ".arthmc.xyz/dashboard/snapshot", {
            method: "GET",

        })
            .then((res) => res.json())
            .then((res) => {
                performance = res;
                console.log(performance);
                performanceReq = 3;
            });
    }
</script>

<div class="flex max-lg:flex-col gap-5 p-5 mt-5">
    <div class="bg-base-200 w-full p-2 rounded-lg">
        <p class="font-poppins-bold text-2xl px-4 py-3">All Nodes</p>
        <div class="flex flex-col gap-2">
            {#each nodeInfo as node}
            <div class="flex gap-2.5 bg-neutral bg-opacity-75 px-2 p-1 rounded-xl items-center">
         
                <input type="radio" name="radio-2" class="radio"  id={node[0]} value={node[0]} on:change={() => {
                  let nodeurl = node[0];
                  //add the / to the end of the url
                  if (!nodeurl.endsWith("/")) {
                      nodeurl += "/";
                  }
                    localStorage.setItem("userNode", nodeurl);
                      selectedNode = node[0].split("https://")[1].split(".")[0];
                        getPerformance();
                }} />
  <span class="text-4xl max-md:hidden">
    {#if node[0].includes("us")}
  &#127482;&#127480;
  {:else if node[0].includes("germany")}
  &#127465;&#127466;
  {/if}
  </span>
                <div class="flex flex-col mb-1">
                
                 <p class="font-bold">     <span class="md:hidden"> {#if node[0].includes("us")}
                  &#127482;&#127480;
                  {:else if node[0].includes("germany")}
                  &#127465;&#127466;
                  {/if}</span>  {node[0].split("https://")[1].split(".")[0]}</p>
                 <div class="flex gap-2">
                    
                    {#if parseInt(node[1]) >= parseInt(node[2])}
                    <div class="bg-warning text-black border border-black rounded-lg md:rounded-full text-xs px-1.5 flex items-center gap-1"><InfoIcon  size=12/>At Capacity</div>
                    {:else if parseInt(node[2]) - parseInt(node[1]) < 5 }
                    <div class="bg-warning text-black border border-black rounded-lg md:rounded-full text-xs px-1.5">Only {parseInt(node[2]) - parseInt(node[1]) } Servers Left</div>
                    {:else}
                    <div class="bg-success
                    text-black border border-black rounded-full text-xs px-1.5">Available</div>
                    {/if}
                
                 </div>
                </div>
                
                </div>
            {/each}
        </div>
    </div>

<div class="flex flex-col gap-5">
    {#if performanceReq == 1}
    <div class="bg-base-300 rounded-lg p-2 pt-4 w-[50rem] h-[15rem]">
        <p class="pl-4 font-poppins-bold text-xl">Node</p>
    </div>
    <div class="bg-base-300 rounded-lg p-2 pt-4 w-[50rem] h-[30rem]">
        <p class="pl-4 font-poppins-bold text-xl">CPU Threads</p>
    </div>
    {:else if performanceReq == 2}
    <div class="bg-base-300 rounded-lg p-2 pt-4 w-[50rem] h-[15rem]">
        <p class="pl-4 font-poppins-bold text-xl">Node</p>
        <div class="pl-4 bg-base-200 rounded-lg animate-pulse w-full h-[84%]">
            
        </div>
    </div>
    <div class="bg-base-300 rounded-lg p-2 pt-4 w-[50rem] h-[30rem]">
        <p class="pl-4 font-poppins-bold text-xl">CPU Threads</p>
        <div class="pl-4 bg-base-200 rounded-lg animate-pulse w-full h-[94%]">
            
        </div>
    </div>
    {:else if performanceReq == 3}
    
    <div class="bg-base-300 rounded-lg p-2 pt-4 w-[50rem] ">

        <p class="pl-4 font-poppins-bold text-xl">Node</p>
    
       
<div class="flex max-lg:flex-col pl-4 items-center w-fit">
    <div class="flex lg:flex-col gap-2 ">
        <div class="bg-[#152036] rounded-xl lg:w-[15rem] p-2 pb-3 flex flex-col items-center text-center">
            <b class="flex items-center gap-1"><CpuIcon size=18 class="mt-0.5"/>CPU Model</b>
           <p class="text-sm">{performance[0].cpuName}
    
           </p>
    
    
        </div>
        <div class="bg-[#152036] rounded-xl lg:w-[15rem] p-2  pb-3 flex flex-col items-center text-center">
        <b class="flex items-center gap-1"><MemoryStick size=18 class="mt-0.5"/>Total Memory</b>
        <p class="text-sm"> {(performance[0].memory.total/1024).toFixed(1)}GB</p>
    
        
        </div>
    </div>
    <MemoryChart {performance} />
    <CpuChart {performance} />
</div>
    </div>
<div class="bg-base-300 rounded-lg p-2 pt-4 w-fit">

    <p class="pl-4 font-poppins-bold text-xl">CPU Threads</p>

   

<div class="max-lg:scale-95 max-lg:-ml-6">
    <ThreadCharts {performance} />
</div>
</div>
{/if}
</div>
</div>