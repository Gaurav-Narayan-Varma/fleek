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
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
  ChartDataLabels,
  LineController,
  BarController,
);

const buyerLabels = ['United Kingdom', 'United States', 'France', 'Germany', 'ROW'];
const vendorLabels = ['Pakistan', 'United Kingdom', 'United States', 'India', 'ROW'];

const options: any = {
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawBorder: false,
        }
      },
      y1: {
        type: 'linear' as const,
        display: false,
        position: 'right' as const,
        grid: {
          drawBorder: false,
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

  export default function TTFByCountryChart() {
      const [option, setOption] = useState<string>('buyer')
      
      const data: any = {
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
              datalabels: {
                color: '#36454F',
                align: 'top',
                offset: option==='buyer' ? '-4' : 0,
              },
          },
          {
              type: 'bar' as const,
              label: 'Average Hours to Fulfill',
              backgroundColor: 'rgb(75, 192, 192)',
              data: option==='buyer' ? Object.values(TTFBuyer[1]) : Object.values(TTFVendor[1]),
              borderColor: 'white',
              borderWidth: 2,
              yAxisID: 'y',
              datalabels: {
                anchor: 'end',
                color: '#36454F',
                align: 'top',
                offset: '-8',
              },
          },
          {
              type: 'bar' as const,
              label: 'Median Hours to Fulfill',
              backgroundColor: 'rgb(53, 162, 235)',
              data: option==='buyer' ? Object.values(TTFBuyerMedian[1]) : Object.values(TTFVendorMedian[1]),
              yAxisID: 'y',
              datalabels: {
                anchor: 'end',
                color: '#36454F',
                align: 'top',
                offset: '-6',
              },
          },
        ],
      };

  return (
    <div id='a1q1' className='h-80 flex justify-center border border-stone-200 rounded-xl'>
      <div id='top-left' className='w-full pt-2 bg-white flex-1 rounded-xl'>
        <div className='text-black text-sm text-center mb-2'>
            Hours to Fulfill by <select onChange={(e) => setOption(e.target.value)} className='text-black bg-white rounded-md border border-stone-200'>
                <option value='buyer'>Buyer Country</option>
                <option value='vendor'>Vendor Country</option>
            </select>
        </div>
        <Chart options={options} type='bar' data={data} />
      </div>
      {option === 'buyer' ? 
      <div id='top-right' className='text-black bg-white flex-1 rounded-xl flex flex-col justify-center'>
        <div>The top three buyer markets for orders showed a positive correlation between shorter fulfillment times and higher demand, with lower fulfillment times associated with higher numbers of orders</div>
        <br></br>
        <div>France had the highest fulfillment time (both average and median), indicating potential challenges in fulfilling orders from that country</div>
      </div> 
      :
      <div id='top-right' className='text-black bg-white flex-1 rounded-xl flex flex-col justify-center'>
        <div>Interestingly, in the top three seller markets for orders lower fulfillment times correlated with lower numbers of orders</div>
        <br></br>
        <div>One possible explanation is that customers place greater weight on factors such as pricing, marketing, or product availability than on fulfillment times</div>
      </div> 
      }
    </div>
  )
}
