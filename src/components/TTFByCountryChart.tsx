import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import OrderCount from '../data/order_count.json'
import TTFBuyer from '../data/ttf_row_buyer.json'
import TTFBuyerMedian from '../data/ttf_row_buyer_median.json'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const labels = ['United Kingdom', 'United States', 'France', 'Germany', 'ROW'];

const options = {
    plugins: {
      title: {
        display: true,
        text: 'Understanding Time to Fulfill',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

const data = {
  labels,
  datasets: [
    {
        type: 'line' as const,
        label: 'Total Orders',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        data: Object.values(OrderCount[1]),
        yAxisID: 'y',
    },
    {
        type: 'bar' as const,
        label: 'Average Time to Fulfill (Hours)',
        backgroundColor: 'rgb(75, 192, 192)',
        data: Object.values(TTFBuyer[1]),
        borderColor: 'white',
        borderWidth: 2,
        yAxisID: 'y1',
    },
    {
        type: 'bar' as const,
        label: 'Median Time to Fulfill (Hours)',
        backgroundColor: 'rgb(53, 162, 235)',
        data: Object.values(TTFBuyerMedian[1]),
        yAxisID: 'y1',
    },
  ],
};

export default function TTFByCountryChart() {
  return <Chart options={options} type='bar' data={data} />;
}
