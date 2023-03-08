import React from "react";
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
import { useRef, useEffect } from "react";  
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
        text: 'Touches per Ticket by Issue Type MoM',
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
            text: 'Touches Per Ticket'
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
        data: [null, 3.5, 2.9, 3.9, 1.6, 1.0],
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'CX confirmation',
        data: [4.0, 3.0, 2.4, 1.6, null, null],
        backgroundColor: '#9a66ff',
      },
      {
        label: 'Order status',
        data: [3.1, 3.1, 3.2, 2.5, 2.1, 1.2],
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Interal ops',
        data: [null, 1.9, 2.0, 1.0, 2.0, null],
        backgroundColor: 'rgb(53, 162, 235)',
      },
      {
        label: 'Items unavailable',
        data: [null, null, null, null, null, 1.0],
        backgroundColor: '#ffcd56',
      },
      {
        label: 'Other',
        data: [null, 2.0, 1.3, 1.5, 1.9, 1.8],
        backgroundColor: '#c9cbce',
      },
      {
        label: 'Product not as described',
        data: [null, 2.9, 2.8, 1.7, null, null],
        backgroundColor: 'rgb(255, 105, 180)',
      },
      {
        label: 'Product quality',
        data: [2.0, 2.8, 2.5, 3.8, 3.4, 1.2],
        backgroundColor: '#73d443',
      },
      {
        label: 'Vendor related',
        data: [null, 1.9, 1.6, 1.5, null, null],
        backgroundColor: 'rgb(255, 128, 113)',
      },
    ],
  };
  
  export default function TouchesPerTicketChart() {
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
        <div id='touches-per-ticket'>
            <div id='chart' ref={addToRef} className='opacity-0 transition-all -translate-x-full duration-1000 max-w-6xl mt-36 mb-52 flex flex-col justify-center border bg-white border-stone-200 rounded-xl'>
                <div className="mx-44">
                    <Bar options={options} data={data} />
                </div>
                <div id='analysis-section' className='text-black flex-1 rounded-xl flex justify-center mx-6 my-6 gap-12'>
                    <div ref={addToRef} id='bullet' className='opacity-0 transition-all -translate-x-full duration-1000 delay-200 text-black text-center mt-2 font-semibold italic text-lg basis-1/6'>
                    Key Takeaways
                    </div>
                    <div ref={addToRef} id='bullet' className='opacity-0 transition-all -translate-x-full duration-1000 delay-300 before:content-["🗣️"] before:absolute before:-ml-7 before:mt-2.5 basis-1/3'>
                    Product quality & order status issues have higher average number of touches per ticket 
                    </div>
                    <div ref={addToRef} id='bullet' className='opacity-0 transition-all -translate-x-full duration-1000 delay-500 before:content-["❗"] before:absolute before:-ml-7 before:mt-2.5 basis-1/3'>
                    Product quality & order status issues are the only issues to persist across all 6 months 
                    </div>
                </div> 
            </div>
        </div>
    )
}