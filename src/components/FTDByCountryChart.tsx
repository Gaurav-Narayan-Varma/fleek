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
import { useRef, useEffect } from "react";  
import './show.css'

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
      const myRef = useRef<Array<HTMLDivElement>>([])

      useEffect(()=>{
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show')
            } else {
              entry.target.classList.remove('show')
            }
          })
        })
        if (myRef.current) {
          myRef.current.forEach((el) => {
            observer.observe(el);
          })
        }
      },[])
    
      function addToRef(el: any) {
        myRef.current.push(el)
      }
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
    <div id='delivery-times'>
      <div id='chart' ref={addToRef} className='opacity-0 w-full transition-all translate-x-full duration-1000 mt-1 mb-52 flex gap-4 bg-white justify-center border border-stone-200 rounded-xl'>
        <div id='bottom-left' className='w-full pt-2 bg-white flex-1 rounded-xl basis-1/12'>
          <div className='text-stone-700 font-bold text-xl text-center'>
              Hours to Deliver by <select onChange={(e) => setOption(e.target.value)} className='text-black bg-white rounded-md border border-stone-200'>
                  <option value='buyer'>Buyer Country</option>
                  <option value='vendor'>Vendor Country</option>
              </select>
          </div>
          <Chart options={options} type='bar' data={data} />
        </div>
        {option === 'buyer' ? 
          <div id='analysis-section' className='text-black flex-1 rounded-xl flex flex-col justify-center px-8 bg-white'>
            <div id='bullet' className='opacity-1 transition-all duration-1000 delay-200 text-black text-center mt-2 font-semibold italic text-lg basis-1/6'>
              Key Takeaways
            </div>
            <div id='bullet' className='opacity-1 transition-all duration-1000 delay-300 before:content-["🚀"] before:text-2xl before:absolute before:-ml-7 before:mt-2.5 basis-1/3'>
              Quicker delivery times correlate with more orders across top four markets       
            </div>
            <div id='bullet' className='opacity-1 transition-all duration-1000 delay-500 before:content-["🐌"] before:text-2xl before:absolute before:-ml-7 before:-mt-1.5 basis-1/3'>
              France faces slowest average and median delivery times 
            </div>
        </div> 
        :
        <div id='analysis-section' className='text-black flex-1 rounded-xl flex flex-col justify-center px-8 bg-white'>
          <div id='bullet' className='opacity-1 transition-all duration-1000 delay-200 text-black text-center mt-2 font-semibold italic text-lg basis-1/6'>
            Key Takeaways
          </div>
          <div id='bullet' className='opacity-1 transition-all duration-1000 delay-300 before:content-["🤔"] before:text-2xl before:absolute before:-ml-7 before:mt-2 basis-1/3'>
            Slower delivery times correlate with more orders, similar to vendor fulfillment        
          </div>
          <div id='bullet' className='opacity-1 transition-all duration-1000 delay-500 before:content-["💡"] before:text-2xl before:absolute before:-ml-7 before:mt-2 basis-1/3'>
            Likewise, factors such as pricing and marketing may outweigh delivery time 
          </div>
        </div> 
        }
      </div>
    </div>
  )
}