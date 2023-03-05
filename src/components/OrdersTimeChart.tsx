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
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: 'Orders Over Time',
    },
  },
};

const colors = ['#37a2eb', '#ff6384', '#4cc0c0', '#ff9e40', '#9a66ff']

const labels = ['2021-11', '"2021-12', '2022-01', '2022-02', '2022-03', 
                '2202-04', '2022-05', '2022-06', '2022-07', '2022-08',
                '2022-09', '2022-10', '2022-11', '2022-12', '2023-01'];

const sets = Object.keys(myOrdersTimeGroupedData).map((key) => {
    const lineColor = colors.pop()
    return ({
        label: key,
        data: Object.values(myOrdersTimeGroupedData[key]),
        borderColor: `${lineColor}`,
        backgroundColor: `${lineColor}`,
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
