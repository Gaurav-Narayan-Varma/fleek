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
import { useRef, useEffect } from "react";  
import './show.css'

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
      font: {
        size: 24
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        position: 'left' as const,
        display: false,
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
        yAxisID: 'y',
        datalabels: {
          color: '#36454F',
          align: 'top',
          offset: '-4',
          font: {
            size: 10
          }
        },
    })
});

console.log(sets)

const data: any = {
  labels,
  datasets: sets,
};

export default function OrdersTimeChart() {
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

  return (
    <div id='market-size-orders'>
      <div id='chart' ref={addToRef} className='opacity-0 transition-all translate-x-full duration-1000 max-w-6xl h-80 flex justify-center border border-stone-200 rounded-xl bg-white'>
        <Line options={options} data={data} />
        <div id='analysis-section' className='text-black flex-1 rounded-xl flex flex-col justify-center px-8'>
          <div ref={addToRef} id='bullet' className='opacity-0 transition-all translate-x-full duration-1000 delay-200 text-black text-center mt-2 font-semibold italic text-lg basis-1/6'>
          Key Takeaways
          </div>
          <div ref={addToRef} id='bullet' className='opacity-0 transition-all translate-x-full duration-1000 delay-300 before:content-["💪"] before:absolute before:-ml-5 before:mt-3 basis-1/3'>
          Despite drops in US, German, UK, and ROW markets in Nov. and Dec., France remained the most robust   
          </div>
          <div ref={addToRef} id='bullet' className='opacity-0 transition-all translate-x-full duration-1000 delay-500 before:content-["☯️"] before:absolute before:-ml-5 before:mt-2.5 basis-1/3'>
          UK is the biggest and most volatile market, with significant drops in Jul. and Dec., but sharp increases in Jan. and May
          </div>
        </div> 
      </div>
    </div>
  )
}
