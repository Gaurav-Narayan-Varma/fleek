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
import OrderCountVendor from '../data/order_count_vendor.json'

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

  export default function FTDByCountryChart() {
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
                align: 'bottom',
                offset: '-2'
              },
          },
          {
              type: 'bar' as const,
              label: 'Average Hours to Deliver',
              backgroundColor: '#9a66ff',
              data: option==='buyer' ? ['154.2', '156.4', '254.2', '228.1', 230.4]
                    : ['247.7', '138.9', '157.1', '127.4', '172.7'],
              borderColor: '#9a66ff',
              borderWidth: 2,
              yAxisID: 'y',
              datalabels: {
                anchor: 'end',
                color: '#36454F',
                align: 'top',
                offset: '-6',
              },
          },
          {
              type: 'bar' as const,
              label: 'Median Hours to Deliver',
              backgroundColor: '#c7cbce',
              data: option==='buyer' ? ['122.0', '149.0', '170.5', '177.0', '178.0'] 
                    : ['220.5', '142.0', '140.0', '112.0', '93.0'],
              borderColor: '#c7cbce',
              borderWidth: 2,
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
    <div id='a1q1' className='mt-1 mb-52 h-80 flex justify-center border border-stone-200 rounded-xl'>
      <div id='bottom-left' className='w-full pt-2 bg-white flex-1 rounded-xl'>
        <div className='text-black text-center text-sm'>
            Hours to Deliver by <select onChange={(e) => setOption(e.target.value)} className='text-black bg-white rounded-md border border-stone-200'>
                <option value='buyer'>Buyer Country</option>
                <option value='vendor'>Vendor Country</option>
            </select>
        </div>
        <Chart options={options} type='bar' data={data} />
      </div>
      {option === 'buyer' ? 
      <div id='top-right' className='text-black bg-white flex-1 rounded-xl flex flex-col justify-center'>
        <div>The top three buyer markets for orders showed a positive correlation between shorter delivery times and higher demand, with lower delivery times associated with higher numbers of orders</div>
      </div> 
      :
      <div id='top-right' className='text-black bg-white flex-1 rounded-xl flex flex-col justify-center'>
        <div>Similar to fulfillment times, in the top three seller markets for orders lower delivery times correlated with lower numbers of orders</div>
        <br></br>
        <div>As said before, this could mean customers place greater weight on factors such as pricing, marketing, or product availability than on fulfillment times</div>
      </div> 
      }
    </div>
  )
}
