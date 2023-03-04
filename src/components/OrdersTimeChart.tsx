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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import OrdersTimeData from '../data/orders_time.json'

interface CountryData {
    [country: string]: {
      [date: string]: number | null
    }
  }

const myOrdersTimeData = OrdersTimeData as CountryData

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['2021-11', '"2021-12', '2022-01', '2022-02', '2022-03', 
                '2202-04', '2022-05', '2022-06', '2022-07', '2022-08',
                '2022-09', '2022-10', '2022-11', '2022-12', '2023-01',
                '2023-02'];

const sets = Object.keys(myOrdersTimeData).map((key) => {
    return ({
        label: key,
        data: Object.values(myOrdersTimeData[key]),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
    })
});

console.log(sets)

const data = {
  labels,
  datasets: sets,
};

export default function OrdersTimeChart() {
  return <Line options={options} data={data} />;
}
