<script lang="ts">
    import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
    import { onMount } from 'svelte';
    export let performance = [];
    export let type = 1;

    // Register the required components
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

    let chartLabels = Array(60).fill("");
    let total;
    let lowest;
    let highest;
    let percentOfAverage;
    onMount(() => {
        console.log(performance);

        // Extract CPU usage data for thread 0
        let threadValues = performance.map(perf => perf.cpuUsage);
        total = 100;
        console.log("total" + total);

        //find lowest and highest

        lowest = Math.min(...threadValues);
        highest = Math.max(...threadValues);

        // Create a parent container div
        let container = document.createElement('div');
        if(type == 1) {
            container.classList.add('chart-container', 'relative', 'w-[15rem]');
        } else {
            container.classList.add('chart-container', 'relative', 'w-[10rem]');
        }

        // Create the canvas element
        let canvas = document.createElement('canvas');
        canvas.classList.add('chart-item', 'rounded-xl', 'shadow-lg', 'p-2');
        canvas.classList.add('bg-gradient-to-t');
        canvas.classList.add('from-[#152036]');
        canvas.classList.add('to-[#152436]');

        // Create the text element for thread label
        let text = document.createElement('p');
        text.classList.add('text-white', 'text-center', 'font-bold', 'text-lg', 'absolute', 'top-2', 'left-3');
         percentOfAverage = (threadValues[threadValues.length - 1]/total*100).toFixed(1);
        text.innerHTML = `CPU Usage`;
        // Create the text element for the most recent CPU usage value
        let text2 = document.createElement('p');
        text2.classList.add('text-center', 'absolute', 'top-1.5', 'right-4');
        if (type == 1) text2.innerHTML = `${threadValues[threadValues.length - 1]}%`;
        else if (type ==2) text2.innerHTML = `${(threadValues[threadValues.length - 1]/1024).toFixed(1)}/${(total/1024).toFixed(1)}GB`;

        //append a bar at the top behind the text that bulurs whats behind it.
        let bar = document.createElement('div');
        bar.classList.add('absolute', 'top-0', 'left-0', 'w-[92%]', 'h-12', 'bg-gradient-to-t', 'from-[#142134]', 'to-[#152436]' ,'rounded-t-xl');
        bar.style.opacity = '0.6';
        bar.style.filter = 'blur(3px)';
        container.appendChild(bar);


        // Append the canvas and text elements to the container
        container.appendChild(canvas);
        container.appendChild(text);
        container.appendChild(text2);

        // Append the container to the chartsContainer2
        document.getElementById('chartsContainer2').appendChild(container);

        // Initialize the chart
        let ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
    label: 'Thread 0',
    backgroundColor: 'rgba(245, 105, 34, 0.3)', // Adjust transparency
    borderColor: '#088385',
    data: threadValues,
    fill: false, // Enables filling under the line
    borderWidth: 3,
    pointRadius: 0,
    hitRadius: 0,
}]
            },
            options: {
                scales: {
                    y: {
                        min: 0,
                        max: total,
                        ticks: {
                            display: false,
                            font: {
                                size: 16
                            }
                        }
                    },
                    x: {
                        ticks: {
                            display: false,
                            font: {
                                size: 16
                            },
                        },
                        grid: {
                            display: false, // Hides the y-axis grid lines
                        }
                    }
                },
                aspectRatio: 1.53,
            }
        });
    });
</script>

<style>
    #chartsContainer2 {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
    }
</style>

