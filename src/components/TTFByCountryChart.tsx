import { useState } from 'react';
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
import OrderCountVendor from '../data/order_count_vendor.json'
import TTFVendor from '../data/ttf_row_vendor.json'
import TTFVendorMedian from '../data/ttf_row_vendor_median.json'

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

const buyerLabels = ['United Kingdom', 'United States', 'France', 'Germany', 'ROW'];
const vendorLabels = ['Pakistan', 'United Kingdom', 'United States', 'India', 'ROW'];

const options = {
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

  export default function TTFByCountryChart() {
      const [option, setOption] = useState<string>('buyer')
      
      const data = {
        labels: option==='buyer' ? buyerLabels : vendorLabels,
        datasets: [
          {
              type: 'line' as const,
              label: 'Total Orders',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 2,
              fill: false,
              data: option==='buyer' ? Object.values(OrderCount[1]) : Object.values(OrderCountVendor[1]),
              yAxisID: 'y1',
          },
          {
              type: 'bar' as const,
              label: 'Average Time to Fulfill (Hours)',
              backgroundColor: 'rgb(75, 192, 192)',
              data: option==='buyer' ? Object.values(TTFBuyer[1]) : Object.values(TTFVendor[1]),
              borderColor: 'white',
              borderWidth: 2,
              yAxisID: 'y',
          },
          {
              type: 'bar' as const,
              label: 'Median Time to Fulfill (Hours)',
              backgroundColor: 'rgb(53, 162, 235)',
              data: option==='buyer' ? Object.values(TTFBuyerMedian[1]) : Object.values(TTFVendorMedian[1]),
              yAxisID: 'y',
          },
        ],
      };

  return (
    <div id='a1q1' className='max-h-72 w-auto'>
        <div className='text-black text-center mb-2'>
            Time to Fulfill by <select onChange={(e) => setOption(e.target.value)} className='text-black bg-white rounded-md border border-stone-200'>
                <option value='buyer'>Buyer Country</option>
                <option value='vendor'>Vendor Country</option>
            </select>
        </div>
        <Chart options={options} type='bar' data={data} />
    </div>
  )
}
