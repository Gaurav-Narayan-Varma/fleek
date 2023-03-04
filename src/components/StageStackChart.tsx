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
import stageBuyerDataTable from '../data/stage_buyer_table.json'
import stageBuyerData from '../data/stage_buyer.json'

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

// Build buyer datasets
const stageBuyerSets = Object.values(stageBuyerData).map((stage) => {
    let nameStage
    for (let key in stageBuyerData) {
        if (stageBuyerData[key as keyof typeof stageBuyerData] === stage) {
            nameStage = key
        }
    }
    return {
        label: nameStage,
        data: Object.values(stage),
        backgroundColor: getRandomColor(),
    }
})

export default function StageStackChart() {
    const [option, setOption] = useState<string>('buyer')

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
        <div id='a1q2' className='mb-36 flex flex-col justify-center'>
            <select onChange={(e) => setOption(e.target.value)} className='text-black bg-white'>
                <option value='buyer'>Time to Fulfill by Buyer Country</option>
                <option value='vendor'>Time to Fulfill by Vendor Country</option>
            </select>
            <Bar options={options} data={data} />
            <table className='text-black border border-black self-center mt-9'>
                <thead>
                    <tr>
                        <th className='border border-black'>Country</th>
                        <th className='border border-black'>Label purchased</th>
                        <th className='border border-black'>Label printed</th>
                        <th className='border border-black'>Confirmed</th>
                        <th className='border border-black'>In transit</th>
                        <th className='border border-black'>Out for delivery</th>
                        <th className='border border-black'>Attempted delivery</th>
                        <th className='border border-black'>Delivered</th>
                        <th className='border border-black'>Failure</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(stageBuyerDataTable).map((country) => {
                        return (
                            <tr>
                                <td className='border border-black'>{country.cc}</td>
                                <td className='border border-black'>{country.label_purchased} hours</td>
                                <td className='border border-black'>{country.label_printed} hours</td>
                                <td className='border border-black'>{country.confirmed} hours</td>
                                <td className='border border-black'>{country.in_transit} hours</td>
                                <td className='border border-black'>{country.out_for_delivery} hours</td>
                                <td className='border border-black'>{country.attempted_delivery} hours</td>
                                <td className='border border-black'>{country.delivered} hours</td>
                                <td className='border border-black'>{country.failure} hours</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}