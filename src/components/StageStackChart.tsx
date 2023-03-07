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

import stageVendorData from '../data/stage_vendor.json'
// import stageBuyerDataTable from '../data/stage_buyer_table.json'

import stageBuyerData from '../data/stage_buyer.json'
import stageBuyerDataTable from '../data/stage_buyer_table.json'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const vendor_labels = ['Pakistan', 'United Kingdom', 'United States', 'India', 'ROW'];
const vendor_colors = ['#c9cbcf', '#37a2eb', '#ff9e40', '#4cc0c0', '#ffcd56', '#73d444', '#ff6384', '#9a66ff']

// Build vendor datasets
const stageVendorSets = Object.values(stageVendorData).map((stage) => {
    let nameStage
    for (let key in stageVendorData) {
        if (stageVendorData[key as keyof typeof stageVendorData] === stage) {
            nameStage = key
        }
    }
    return {
        label: nameStage,
        data: Object.values(stage).map(num => {
            if(num) {
                return Math.round(num * 10) / 10
            }
        }),
        backgroundColor: vendor_colors.pop(),
        datalabels: {
            color: '#36454F',
          },
    }
})

const buyer_labels = ['France', 'Germany', 'United Kingdom', 'United States', 'ROW'];
const buyer_colors = ['#c9cbcf', '#37a2eb', '#ff9e40', '#4cc0c0', '#ffcd56', '#73d444', '#ff6384', '#9a66ff']

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
        data: Object.values(stage).map(num => {
            if(num) {
                return Math.round(num * 10) / 10
            }
        }),
        backgroundColor: buyer_colors.pop(),
        datalabels: {
            color: '#36454F',
          },
    }
})

export default function StageStackChart() {
    const [option, setOption] = useState<string>('buyer')

    const data: any = {
        labels: option === 'buyer' ? buyer_labels : vendor_labels,
        datasets: option === 'buyer' ? stageBuyerSets : stageVendorSets
    };

    const options: any = {
        plugins: {
            title: {
                display: true,
                text: `Average hours in each stage by country / region`,
            },
            legend: {
                display: true,
                position: 'right'
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
                grid: {
                    drawBorder: false,
                    drawOnChartArea: false,
                  }
            },
            y: {
                display: false,
                stacked: true,
                grid: {
                    drawBorder: false,
                  },
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