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
import TtfBuyerData from '../data/ttf_buyer.json'
import TtfVendorData from '../data/ttf_vendor.json'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const labels = Array.from({ length: 100 }, (_, index) => index);

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

// Buyer data
// Clean data: Round Time to Fulfill, sort, then bucket them
for (let key in TtfBuyerData) {
    for (let i = 0; i < TtfBuyerData[key as keyof typeof TtfBuyerData].time_to_fulfill_list.length; i++) {
        TtfBuyerData[key as keyof typeof TtfBuyerData].time_to_fulfill_list[i] = Math.floor(TtfBuyerData[key as keyof typeof TtfBuyerData].time_to_fulfill_list[i])
    }

    // Bucket the data
    const max_value = Math.max(...TtfBuyerData[key as keyof typeof TtfBuyerData].time_to_fulfill_list);
    const bucket = Array(max_value + 1).fill(0);

    for (let i = 0; i < TtfBuyerData[key as keyof typeof TtfBuyerData].time_to_fulfill_list.length; i++) {
        const index = TtfBuyerData[key as keyof typeof TtfBuyerData].time_to_fulfill_list[i];
        bucket[index]++;
    }
    TtfBuyerData[key as keyof typeof TtfBuyerData].time_to_fulfill_list = bucket
}

// Build buyer datasets
const ttfBuyerSets = Object.values(TtfBuyerData).map((country) => {
    return {
        label: country.cc,
        data: Array.from({length: 100}, (_, index) => {
            return country.time_to_fulfill_list[index] > 0 ? country.time_to_fulfill_list[index] : 0
        }),
        backgroundColor: getRandomColor(),
    }
})

// Vendor data
// Clean data: Round Time to Fulfill, sort, then bucket them
for (let key in TtfVendorData) {
    for (let i = 0; i < TtfVendorData[key as keyof typeof TtfVendorData].time_to_fulfill_list.length; i++) {
        TtfVendorData[key as keyof typeof TtfVendorData].time_to_fulfill_list[i] = Math.floor(TtfVendorData[key as keyof typeof TtfVendorData].time_to_fulfill_list[i])
    }

    // Bucket the data
    const max_value = Math.max(...TtfVendorData[key as keyof typeof TtfVendorData].time_to_fulfill_list);
    const bucket = Array(max_value + 1).fill(0);

    for (let i = 0; i < TtfVendorData[key as keyof typeof TtfVendorData].time_to_fulfill_list.length; i++) {
        const index = TtfVendorData[key as keyof typeof TtfVendorData].time_to_fulfill_list[i];
        bucket[index]++;
    }
    TtfVendorData[key as keyof typeof TtfVendorData].time_to_fulfill_list = bucket
}

// Build buyer datasets
const ttfVendorSets = Object.values(TtfVendorData).map((country) => {
    return {
        label: country.origin,
        data: Array.from({length: 100}, (_, index) => {
            return country.time_to_fulfill_list[index] > 0 ? country.time_to_fulfill_list[index] : 0
        }),
        backgroundColor: getRandomColor(),
    }
})

export default function TTFChart() {
    const [option, setOption] = useState<string>('buyer')

    const data = {
        labels,
        datasets: option === 'buyer' ? ttfBuyerSets : ttfVendorSets
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: `Time to Fulfill by ${option === 'buyer' ? 'Buyer' : 'Vendor'} Country`,
            },
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    title: function (context: any) {
                        return `${context[0].label}-${Number(context[0].label)+1} hours`;
                    },
                    afterBody: function () {
                        return "orders";
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
                text: 'Hours to Fulfill'
            }
            },
            y: {
            stacked: true,
            title: {
                display: true,
                text: '# of Orders'
            }
            },
        },
    };

    return (
        <div id='a1q1' className='mb-36'>
            <select onChange={(e) => setOption(e.target.value)} className='text-black bg-white'>
                <option value='buyer'>Time to Fulfill by Buyer Country</option>
                <option value='vendor'>Time to Fulfill by Vendor Country</option>
            </select>
            <Bar options={options} data={data} />
        </div>
    )
}