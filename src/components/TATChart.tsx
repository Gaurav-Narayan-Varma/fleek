import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TatData from '../data/tat.json'
import { useRef, useEffect, RefObject } from 'react';  
import './show.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
  
  const options: any = {
    plugins: {
      legend: {
        color: 'black',
        position: 'right'
      },
      title: {
        display: true,
        text: 'Turn Around Time by Issue Type MoM',
        font: {
          size: 24
        }
      },
      datalabels: {
        color: '#36454F',
        font: {
          size: 10
        }
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
            display: false,
            text: 'Month-Year'
        }
      },
      y: {
        stacked: true,
        title: {
            display: true,
            text: 'Turn Around Time (Hours)'
        }
      },
    },
  };
  
  const labels = ['09-2022', '10-2022', '11-2022', '12-2022', '01-2023', '02-2023'];
  
  const data: any = {
    labels,
    datasets: [
      {
        label: 'Customs',
        data: Object.values(TatData.customs).map(num => {if(num){return Number(num.toFixed(1))}}),
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'CX confirmation',
        data: Object.values(TatData.cx_confirmation).map(num => {if(num){return Number(num.toFixed(1))}}),
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Interal ops',
        data: Object.values(TatData['internal_/_ops']).map(num => {if(num){return Number(num.toFixed(1))}}),
        backgroundColor: 'rgb(53, 162, 235)',
      },
      {
        label: 'Items unavailable',
        data: Object.values(TatData.items_unavailable).map(num => {if(num){return Number(num.toFixed(1))}}),
        backgroundColor: '#ffcd56',
      },
      {
        label: 'Other',
        data: Object.values(TatData.other).map(num => {if(num){return Number(num.toFixed(1))}}),
        backgroundColor: '#c9cbce',
      },
      {
        label: 'Product not as described',
        data: Object.values(TatData.product_not_as_described).map(num => {if(num){return Number(num.toFixed(1))}}),
        backgroundColor: 'rgb(255, 105, 180)',
      },
      {
        label: 'Product quality',
        data: Object.values(TatData.product_quality).map(num => {if(num){return Number(num.toFixed(1))}}),
        backgroundColor: '#73d443',
      },
      {
        label: 'Vendor related',
        data: Object.values(TatData.vendor_related).map(num => {if(num){return Number(num.toFixed(1))}}),
        backgroundColor: 'rgb(255, 128, 113)',
      },
    ],
  };
  
  export default function TATChart() {
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
      <div id='tat'>
        <div id='chart' ref={addToRef} className='opacity-0 transition-all -translate-x-full duration-1000 max-w-6xl mb-52 flex flex-col justify-center border bg-white border-stone-200 rounded-xl'>
          <div className='mx-44'>
            <Bar options={options} data={data} />
          </div>
          <div id='analysis-section' className='text-black flex-1 rounded-xl flex justify-center mx-6 my-6 gap-12'>
            <div ref={addToRef} id='bullet' className='opacity-0 transition-all -translate-x-full duration-1000 delay-200 text-black text-center mt-2 font-semibold italic text-lg basis-1/6'>
              Key Takeaways
            </div>
            <div ref={addToRef} id='bullet' className='opacity-0 transition-all -translate-x-full duration-1000 delay-300 before:content-["🚚💨"] before:absolute before:-ml-10 before:mt-2.5 basis-1/3'>
              Lower delivery times are correlated with order size for the top three buyer markets
            </div>
            <div ref={addToRef} id='bullet' className='opacity-0 transition-all -translate-x-full duration-1000 delay-500 before:content-["⏰"] before:absolute before:-ml-7 before:mt-2.5 basis-1/3'>
              Average TAT is higher than the industry average of 5 hours 
              (<a className='text-blue-500' href='https://www.liveagent.com/research/customer-service-benchmarks/'>Live Agent 2023 Report</a>)
            </div>
          </div> 
        </div>
      </div>
    )
}