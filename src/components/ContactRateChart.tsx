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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    Legend,
    Tooltip,
  );

  const options: any = {
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Contact Rate MoM',
      },
      datalabels: {
        color: '#36454F',
        anchor: 'end',
        align: 'top',
        offset: '-6',
        font: {
          size: 10
        }
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
      },
      y1: {
        type: 'linear' as const,
        display: false,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        grid: {
          drawBorder: false,
          drawOnChartArea: false,
        }
      }
    },
  };


export default function ContactRateChart() {
    const data: any = {
        labels: ['2022-06','2022-07','2022-08','2022-09','2022-10','2022-11','2022-12','2023-01'],
        datasets: [{
            label: 'Contact Rate',
            data: [.59, 1.00, .43, .54, 1.02, .79, 1.09, 1.22],
            backgroundColor: 'rgb(255, 99, 132)',
          }]
    }
    return(
        <div className='border bg-white border-stone-200 rounded-xl box-border pb-2 px-10'>
            <Bar options={options} data={data} />
            <div className='text-black text-center mt-2 font-semibold'>Key Takeaways</div>
            <ul className='text-black'>
                <li>⁍ With the exception of October the contact rate has been monotonically increasing since August</li>
                <li>⁍ <span className='font-bold underline'>Breakdown at supplier level not possible</span>: 
                only 2530 tickets in the dataset, but only 161 have vendors listed in custom_vendor column</li>
            </ul>
        </div>
    )
}