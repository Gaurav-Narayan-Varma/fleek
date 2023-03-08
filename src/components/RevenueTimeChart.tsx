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
import { useRef, useEffect } from "react";  
import './show.css'

interface CountryData {
    [country: string]: {
      [date: string]: number | null
    }
  }

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
    datalabels: {
        display: true,
        formatter: function(value: any, context: any) {
            value = value/1000
            return Math.round(value);
          }
          
    },
    legend: {
      display: true,
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Market Size by Revenue',
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

const labels = ['2021-11', '2021-12', '2022-01', '2022-02', '2022-03', 
                '2202-04', '2022-05', '2022-06', '2022-07', '2022-08',
                '2022-09', '2022-10', '2022-11', '2022-12', '2023-01'];

const sets = [{
    label: 'United Kingdom',
    data: [275.1, 2619.00, 5410.50, 43215.98, 28147.26, 26381.88, 52278.75, 62849.73, 45012.79, 126615.56, 157402.23, 195920.85, 307054.81, 292134.53, 391887.52, 13688.41],
    borderColor: `#9a66ff`,
    backgroundColor: `#9a66ff`,
    yAxisID: 'y',
    datalabels: {
      color: '#36454F',
      align: 'top',
      offset: '-4',
      font: {
        size: 10
      }
    },
},
{
    label: 'United States',
    data: [0, 7593.41, 20779.88, 26051.42, 51681.25, 50507.26, 45201.22, 63936.45, 66707.24, 66929.21, 74750.33, 108065.74, 88656.92, 94602.56, 108419.02, 6296.83],
    borderColor: `#ff9e40`,
    backgroundColor: `#ff9e40`,
    yAxisID: 'y',
    datalabels: {
      color: '#36454F',
      align: 'top',
      offset: '-4',
      font: {
        size: 10
      }
    },
},
{
    label: 'France',
    data: [0, 0, 12488.00, 1260.00, 3278.00, 6654.00, 7867.81, 6768.70, 5046.92, 7374.49, 18560.50, 23165.57, 29660.57, 39441.72, 64912.14, 4057.25],
    borderColor: `#4cc0c0`,
    backgroundColor: `#4cc0c0`,
    yAxisID: 'y',
    datalabels: {
      color: '#36454F',
      align: 'top',
      offset: '-4',
      font: {
        size: 10
      }
    },
},
{
    label: 'Germany',
    data: [0, 0, 2981.00, 700.00, 834.00, 1004.00, 1833.00, 7131.07, 6266.19, 8428.47, 6511.27, 15646.69, 13164.98, 18875.97, 14606.21, 1155.56],
    borderColor: `#ff6384`,
    backgroundColor: `#ff6384`,
    yAxisID: 'y',
    datalabels: {
      color: '#36454F',
      align: 'top',
      offset: '-4',
      font: {
        size: 10
      }
    },
},
{
    label: 'ROW',
    data: [265.0, 300.00, 835.00, 7516.87, 6367.51, 14152.43, 28939.04, 21413.68, 21571.98, 27277.62, 51125.91, 36245.42, 67766.29, 58668.87, 37489.74, 8212.25],
    borderColor: `#37a2eb`,
    backgroundColor: `#37a2eb`,
    yAxisID: 'y',
    datalabels: {
      color: '#36454F',
      align: 'top',
      offset: '-4',
      font: {
        size: 10
      }
    },
},

]

console.log(sets)

const data: any = {
  labels,
  datasets: sets,
};

export default function RevenueTimeChart() {
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
      <div id='chart' ref={addToRef} className='opacity-0 transition-all translate-x-full duration-1000 max-w-6xl mt-1 mb-52 h-80 flex justify-center border border-stone-200 rounded-xl bg-white'>
        <Line options={options} data={data} />
        <div id='analysis-section' className='text-black flex-1 rounded-xl flex flex-col justify-center px-8'>
          <div ref={addToRef} id='bullet' className='opacity-0 transition-all translate-x-full duration-1000 delay-200 text-black text-center mt-2 font-semibold italic text-lg basis-1/6'>
          Key Takeaways
          </div>
          <div ref={addToRef} id='bullet' className='opacity-0 transition-all translate-x-full duration-1000 delay-300 before:content-["🏆"] before:absolute before:-ml-5 before:mt-2.5 basis-1/3'>
          UK market is the largest, fastest growing market, and market share dominates       
          </div>
          <div ref={addToRef} id='bullet' className='opacity-0 transition-all translate-x-full duration-1000 delay-500 before:content-["🏎️"] before:absolute before:-ml-5 before:mt-2.5 basis-1/3'>
          Outside of UK, Frances shows fastest growth rate multiplying at 8x over past 6 months 
          </div>
        </div> 
      </div>
    </div>
  )
}
