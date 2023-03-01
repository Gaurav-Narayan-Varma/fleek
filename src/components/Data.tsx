import React from 'react';
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
import { Link } from 'react-router-dom'; 
import TatData from '../data/tat.json'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['09-2022', '10-2022', '11-2022', '12-2022', '01-2023', '02-2023'];

const data = {
  labels,
  datasets: [
    {
      label: 'Customs',
      data: Object.values(TatData.customs),
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'CX confirmation',
      data: Object.values(TatData.cx_confirmation),
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Interal ops',
      data: Object.values(TatData['internal_/_ops']),
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Items unavailable',
      data: Object.values(TatData.items_unavailable),
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Other',
      data: Object.values(TatData.other),
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Product not as described',
      data: Object.values(TatData.product_not_as_described),
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Product quality',
      data: Object.values(TatData.product_quality),
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Test duplicate',
      data: Object.values(TatData['test_/_duplicate']),
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Vendor related',
      data: Object.values(TatData.vendor_related),
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};
// faker.datatype.number({ min: -1000, max: 1000 })
function Data() {
    return (
        <section id='page-container' className='flex'>
            <section id='nav-bar' className='px-5 w-48 shrink-0 h-screen bg-white text-black font-sans'>
                <ul className='mt-6'>
                    <li className='mb-4'>
                        <Link to='/'>🔨 Coding Task</Link>
                    </li>
                    <li className="font-bold">
                        <a>📈 Data Task</a>
                    </li>
                </ul>
            </section>
            <section id='data-assignment' className='w-full h-full'>
              <section className='m'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ducimus placeat libero optio dolore, dignissimos quisquam obcaecati tenetur reprehenderit consequatur. Laboriosam et fugiat quo velit ut illum, veniam reiciendis eum?
              </section>
              <Bar options={options} data={data} />
            </section>
        </section>
    )
}

export default Data