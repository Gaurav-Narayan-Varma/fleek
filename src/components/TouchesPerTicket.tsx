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
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Touches per Ticket by Issue Type MoM',
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
            text: 'Turn Around Time (in hours)'
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
    return (
        <div id='turn-around-time' className='max-w-6xl mt-36 mb-52 h-80 flex justify-center border bg-white border-stone-200 rounded-xl'>
          <Bar options={options} data={data} />
          <div className='text-black flex-1 rounded-xl flex flex-col justify-center px-4'>
            <div>
              The top three buyer markets for orders show <span className='font-bold underline'>a positive correlation 
              between shorter delivery times and higher demand</span>
              , with lower delivery times associated with higher numbers of orders
            </div>
            <br></br>
            <div>
              Fleek's <span className='font-bold underline'>average TAT is higher than average</span>: 
              the industry standard is 5 hr according to a report by   
              <a className='text-blue-500' href='https://www.liveagent.com/research/customer-service-benchmarks/'> Live Agent</a>
              , a help desk software company
            </div>
          </div> 
        </div>
    )
}