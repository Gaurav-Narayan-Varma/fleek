import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import OrdersTimeGroupedData from '../data/orders_time_grouped.json'

interface CountryData {
    [country: string]: {
      [date: string]: number | null
    }
  }

const myOrdersTimeGroupedData = OrdersTimeGroupedData as CountryData

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options: any = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Market Size by Orders',
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
      },
      x: {
        grid: {
          drawBorder: false,
          drawOnChartArea: false,
        }
      }
    },
  },
};

const colors = ['#37a2eb', '#ff6384', '#4cc0c0', '#ff9e40', '#9a66ff']

const labels = ['2021-11', '2021-12', '2022-01', '2022-02', '2022-03', 
                '2202-04', '2022-05', '2022-06', '2022-07', '2022-08',
                '2022-09', '2022-10', '2022-11', '2022-12', '2023-01'];

const sets = Object.keys(myOrdersTimeGroupedData).map((key) => {
    const lineColor = colors.pop()
    return ({
        label: key,
        data: Object.values(myOrdersTimeGroupedData[key]),
        borderColor: `${lineColor}`,
        backgroundColor: `${lineColor}`,
        datalabels: {
          color: '#36454F',
          align: 'top',
          offset: '-4',
          font: {
            size: 10
          }
        },
        yAxisID: 'y',
    })
});

console.log(sets)

const data: any = {
  labels,
  datasets: sets,
};

export default function OrdersTimeChart() {
  return (
    <div id='market-size' className='max-w-6xl mt-36 mb-52 h-80 flex justify-center border border-stone-200 rounded-xl bg-white'>
      <Line options={options} data={data} />
      <div className='text-black flex-1 rounded-xl flex flex-col justify-center px-4'>
        <div>The top three buyer markets for orders showed a positive correlation between shorter delivery times and higher demand, with lower delivery times associated with higher numbers of orders</div>
      </div> 
    </div>
  )
}
