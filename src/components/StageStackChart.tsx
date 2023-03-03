import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ftdVendorData from '../data/ftd_vendor.json'
import ftdBuyerData from '../data/ftd_buyer.json'
import stageBuyerData from '../data/stage_buyer.json'

console.log(Object.keys(stageBuyerData))

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const labels = ['France', 'Germany', 'United Kingdom', 'United States', 'ROW'];

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

// Vendor data
// Clean data: tranform into bucket list
for (let key in ftdVendorData) {

    // Bucket the data by 1 hour increments
    const max_value = Math.max(...ftdVendorData[key as keyof typeof ftdVendorData].time_to_deliver_list[0]);
    const bucket = Array(max_value + 1).fill(0);

    for (let i = 0; i < ftdVendorData[key as keyof typeof ftdVendorData].time_to_deliver_list[0].length; i++) {
        const index = ftdVendorData[key as keyof typeof ftdVendorData].time_to_deliver_list[0][i];
        bucket[index]++;
    }
    ftdVendorData[key as keyof typeof ftdVendorData].time_to_deliver_list[0] = bucket
}

// Build vendor datasets
const ftdVendorSets = Object.values(ftdVendorData).map((country) => {
    return {
        label: country.origin,
        data: Array.from({length: 300}, (_, index) => {
            return country.time_to_deliver_list[0][index] > 0 ? country.time_to_deliver_list[0][index] : 0
        }),
        backgroundColor: getRandomColor(),
    }
})


// Vendor data
// Clean data: tranform into bucket list
for (let key in ftdBuyerData) {

    // Bucket the data by 1 hour increments
    const max_value = Math.max(...ftdBuyerData[key as keyof typeof ftdBuyerData].time_to_deliver_list);
    const bucket = Array(max_value + 1).fill(0);

    for (let i = 0; i < ftdBuyerData[key as keyof typeof ftdBuyerData].time_to_deliver_list.length; i++) {
        const index = ftdBuyerData[key as keyof typeof ftdBuyerData].time_to_deliver_list[i];
        bucket[index]++;
    }
    ftdBuyerData[key as keyof typeof ftdBuyerData].time_to_deliver_list = bucket
}

// Build buyer datasets
const stageBuyerSets = Object.values(stageBuyerData).map((stage) => {
    let nameStage

    for (let key in stageBuyerData) {
        if (stageBuyerData[key as keyof typeof stageBuyerData] === stage) {
            nameStage = key
        }
    }

    // console.log(stageBuyerData[nameStage as keyof typeof stageBuyerData])
    return {
        label: nameStage,
        data: Object.values(stage),
        backgroundColor: getRandomColor(),
    }
})

export default function StageStackChart() {
    const [option, setOption] = useState<string>('buyer')

    console.log(stageBuyerSets)

    const data = {
        labels,
        datasets: stageBuyerSets
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: `Average hours in each stage by country / region`,
            },
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    afterBody: function () {
                        return "hours on average";
                    },
                }
            },      
        },
        responsive: true,
        scales: {
            x: {
            stacked: true,
            title: {
                display: true,
                text: 'Country / Region'
            }
            },
            y: {
            stacked: true,
            title: {
                display: true,
                text: 'Hours'
            }
            },
        },
    };

    return (
        <div className='mb-36'>
            <select onChange={(e) => setOption(e.target.value)} className='text-black bg-white'>
                <option value='buyer'>Time to Fulfill by Buyer Country</option>
                <option value='vendor'>Time to Fulfill by Vendor Country</option>
            </select>
            <Bar options={options} data={data} />
        </div>
    )
}