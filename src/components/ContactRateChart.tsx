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
        font: {
          size: 24
        }
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
            <div ref={addToRef} id='bullet' className='opacity-0 transition-all -translate-x-full duration-1000 delay-300 before:content-["📈"] before:absolute before:-ml-7 before:mt-2.5 basis-3/12'>
            The contact rate trending upwards since Aug.
            </div>
            <div ref={addToRef} id='bullet' className='opacity-0 transition-all -translate-x-full duration-1000 delay-500 before:content-["🚫"] before:absolute before:-ml-7 before:mt-2.5 basis-1/3'>
            Difficult to break down by supplier ({`>`} 161 tickets list vendor) 
            </div>
            <div ref={addToRef} id='bullet' className='opacity-0 transition-all -translate-x-full duration-1000 delay-700 before:content-["🔨"] before:absolute before:-ml-7 before:mt-2.5 basis-5/12'>
            Syed is biggest opportunity: represents over 1/3 of tickets listing vendor
            </div>
          </div> 
        </div>
      </div>
    )
}