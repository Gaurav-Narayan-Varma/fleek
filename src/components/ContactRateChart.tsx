import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState } from 'react';
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

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    Legend,
    Tooltip,
  );

  const options: any = {
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Contact Rate MoM',
      },
      datalabels: {
        color: '#36454F',
        anchor: 'end',
        align: 'top',
        offset: '-6',
        font: {
          size: 10
        }
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
    },
  };


export default function ContactRateChart() {
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
        labels: ['2022-06','2022-07','2022-08','2022-09','2022-10','2022-11','2022-12','2023-01'],
        datasets: [{
            label: 'Contact Rate',
            data: [.59, 1.00, .43, .54, 1.02, .79, 1.09, 1.22],
            backgroundColor: 'rgb(255, 99, 132)',
          }]
    }
    return(
      <div id='contact-rate' >
        <div id='chart' ref={addToRef} className='opacity-0 transition-all -translate-x-full duration-1000 border bg-white border-stone-200 rounded-xl box-border pb-2 px-10'>
          <div className="mx-44">
            <Bar options={options} data={data} />
          </div>
          <div id='analysis-section' className='text-black flex-1 rounded-xl flex justify-center mx-6 my-6 gap-12'>
            <div ref={addToRef} id='bullet' className='opacity-0 transition-all -translate-x-full duration-1000 delay-200 text-black text-center mt-2 font-semibold italic text-lg basis-1/6'>
            Key Takeaways
            </div>
            <div ref={addToRef} id='bullet' className='opacity-0 transition-all -translate-x-full duration-1000 delay-300 before:content-["📈"] before:absolute before:-ml-7 before:mt-2.5 basis-1/3'>
            The contact rate has been trending upwards since August 2022
            </div>
            <div ref={addToRef} id='bullet' className='opacity-0 transition-all -translate-x-full duration-1000 delay-500 before:content-["🚫"] before:absolute before:-ml-7 before:mt-2.5 basis-1/3'>
            Contact rate difficult to break down at supplier level, only ~6% of tickets list vendor info.
            </div>
          </div> 
        </div>
      </div>
    )
}

{/* <li>⁍ With the exception of October the contact rate has been monotonically increasing since August</li>
<li>⁍ <span className='font-bold underline'>Breakdown at supplier level not possible</span>: 
only 2530 tickets in the dataset, but only 161 have vendors listed in custom_vendor column</li> */}
