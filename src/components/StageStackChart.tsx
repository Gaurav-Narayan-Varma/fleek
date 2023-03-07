import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LineController,
    BarController,
} from 'chart.js';

import { useState } from 'react';
import { Chart } from 'react-chartjs-2';
import OrderCount from '../data/order_count.json'
import OrderCountVendor from '../data/order_count_vendor.json'
import stageVendorData from '../data/stage_vendor.json'
import stageVendorDataTable from '../data/stage_vendor_table.json'
import stageBuyerData from '../data/stage_buyer.json'
import stageBuyerDataTable from '../data/stage_buyer_table.json'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    LineController,
    BarController,
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
        type: 'bar' as const,
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

const buyer_labels = ['United Kingdom', 'United States', 'France', 'Germany', 'ROW'];
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
        type: 'bar' as const,
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

    const dsets: any = [{
        type: 'line' as const,
        label: 'total orders',
        borderColor: '#c9cbce',
        borderWidth: 2,
        fill: false,
        data: option==='buyer' ? Object.values(OrderCount[1]) : Object.values(OrderCountVendor[1]),
        yAxisID: 'y1',
        datalabels: {
            color: '#36454F',
            align: 'top',
            offset: option==='buyer' ? '-4' : 0,
        }
    }]
    const dsetsf = option === 'buyer' ? dsets.concat(stageBuyerSets) : dsets.concat(stageVendorSets)

    const data: any = {
        labels: option === 'buyer' ? buyer_labels : vendor_labels,
        datasets: [ ...dsetsf]
    };

    const options: any = {
        plugins: {
            title: {
                display: false,
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
            y1: {
                type: 'linear' as const,
                display: false,
                position: 'right' as const,
                grid: {
                  drawBorder: false,
                },
              },
            
        },
    };

    return (
        <>
            <div id='a1q2' className='max-w-6xl flex justify-center border border-stone-200 rounded-xl'>
                <div id='top-left' className='w-full pt-2 bg-white basis-4/6 rounded-xl'>
                    <div className='text-black text-sm text-center mb-2'>
                        Average Hours Each Stage by <select onChange={(e) => setOption(e.target.value)} className='text-black bg-white rounded-md border border-stone-200'>
                            <option value='buyer'>Buyer Country</option>
                            <option value='vendor'>Vendor Country</option>
                        </select>
                    </div>
                    <Chart options={options} type='bar' data={data} />
                </div>
                {option === 'buyer' ? 
                    <div id='top-right' className='text-black bg-white flex-1 rounded-xl flex flex-col justify-center'>
                        <div>
                            The less time in the 'confirmed' stage seems to correlate with more orders, as the top two markets in terms of buying, the US and the UK, have the much lower times in that stage compared to the other markets (less than 70 versus over 95)
                        </div>
                    </div> 
                    :
                    <div id='top-right' className='text-black bg-white flex-1 rounded-xl flex flex-col justify-center'>
                        <div>
                            Pakistan's confirmed stage is the biggest area for improvement, with packages stalled out at
                            approximately 180 hours on average before moving the transit
                        </div>
                    </div> 
                }
            </div>
            <div id='table-view' className='mt-4 max-w-6xl flex justify-center border bg-white border-stone-200 rounded-xl'>
                {option==='buyer' ?
                    <table className='border-collapse text-sm text-black border border-stone-600 self-center my-2'>
                        <thead>
                            <tr >
                                <th className='border text-left border-stone-400 font-semibold'>Country</th>
                                <th className='border text-left border-stone-400 font-semibold'>Label purchased</th>
                                <th className='border text-left border-stone-400 font-semibold'>Label printed</th>
                                <th className='border text-left border-stone-400 font-semibold'>Confirmed</th>
                                <th className='border text-left border-stone-400 font-semibold'>In transit</th>
                                <th className='border text-left border-stone-400 font-semibold'>Out for delivery</th>
                                <th className='border text-left border-stone-400 font-semibold'>Attempted delivery</th>
                                <th className='border text-left border-stone-400 font-semibold'>Delivered</th>
                                <th className='border text-left border-stone-400 font-semibold'>Failure</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(stageBuyerDataTable).map((country) => {
                                return (
                                    <tr>
                                        <td className='border border-stone-400'>{country.cc}</td>
                                        <td className='border border-stone-400'>{country.label_purchased} hours</td>
                                        <td className='border border-stone-400'>{country.label_printed} hours</td>
                                        <td className='border border-stone-400'>{country.confirmed} hours</td>
                                        <td className='border border-stone-400'>{country.in_transit} hours</td>
                                        <td className='border border-stone-400'>{country.out_for_delivery} hours</td>
                                        <td className='border border-stone-400'>{country.attempted_delivery} hours</td>
                                        <td className='border border-stone-400'>{country.delivered} hours</td>
                                        <td className='border border-stone-400'>{country.failure} hours</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    :
                    <table className='border-collapse text-sm text-black border border-stone-600 self-center my-2'>
                        <thead className='font-thin'>
                            <tr >
                                <th className='border border-stone-400 font-semibold'>Country</th>
                                <th className='border border-stone-400 font-semibold'>Label purchased</th>
                                <th className='border border-stone-400 font-semibold'>Label printed</th>
                                <th className='border border-stone-400 font-semibold'>Confirmed</th>
                                <th className='border border-stone-400 font-semibold'>In transit</th>
                                <th className='border border-stone-400 font-semibold'>Out for delivery</th>
                                <th className='border border-stone-400 font-semibold'>Attempted delivery</th>
                                <th className='border border-stone-400 font-semibold'>Delivered</th>
                                <th className='border border-stone-400 font-semibold'>Failure</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(stageVendorDataTable).map((country) => {
                                return (
                                    <tr>
                                        <td className='border border-stone-400'>{country.origin}</td>
                                        <td className='border border-stone-400'>{country.label_purchased} hours</td>
                                        <td className='border border-stone-400'>{country.label_printed} hours</td>
                                        <td className='border border-stone-400'>{country.confirmed} hours</td>
                                        <td className='border border-stone-400'>{country.in_transit} hours</td>
                                        <td className='border border-stone-400'>{country.out_for_delivery} hours</td>
                                        <td className='border border-stone-400'>{country.attempted_delivery} hours</td>
                                        <td className='border border-stone-400'>{country.delivered} hours</td>
                                        <td className='border border-stone-400'>{country.failure} hours</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>
        </>
    )
}