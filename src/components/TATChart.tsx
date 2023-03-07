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
        color: 'black'
      },
      title: {
        display: true,
        text: 'Monthly Turn Around Time by Issue Type Stacked Bar Chart',
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
            display: true,
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
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Customs',
        data: Object.values(TatData.customs).map(num => Number(num.toFixed(1))),
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'CX confirmation',
        data: Object.values(TatData.cx_confirmation).map(num => Number(num.toFixed(1))),
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Interal ops',
        data: Object.values(TatData['internal_/_ops']).map(num => Number(num.toFixed(1))),
        backgroundColor: 'rgb(53, 162, 235)',
      },
      {
        label: 'Items unavailable',
        data: Object.values(TatData.items_unavailable).map(num => Number(num.toFixed(1))),
        backgroundColor: 'rgb(128, 0, 128)',
      },
      {
        label: 'Other',
        data: Object.values(TatData.other).map(num => Number(num.toFixed(1))),
        backgroundColor: 'rgb(30, 144, 255)',
      },
      {
        label: 'Product not as described',
        data: Object.values(TatData.product_not_as_described).map(num => Number(num.toFixed(1))),
        backgroundColor: 'rgb(255, 105, 180)',
      },
      {
        label: 'Product quality',
        data: Object.values(TatData.product_quality).map(num => Number(num.toFixed(1))),
        backgroundColor: 'rgb(0, 0, 205)',
      },
      {
        label: 'Test duplicate',
        data: Object.values(TatData['test_/_duplicate']).map(num => Number(num.toFixed(1))),
        backgroundColor: 'rgb(0, 128, 128)',
      },
      {
        label: 'Vendor related',
        data: Object.values(TatData.vendor_related).map(num => Number(num.toFixed(1))),
        backgroundColor: 'rgb(255, 128, 113)',
      },
    ],
  };
  
  export default function TATChart() {
    return (
        <div id='turn-around-time' className='max-w-6xl mt-36 mb-52 h-80 flex justify-center border border-stone-200 rounded-xl'>
          <Bar options={options} data={data} />
          <div className='text-black bg-white flex-1 rounded-xl flex flex-col justify-center px-4'>
            <div>The top three buyer markets for orders showed a positive correlation between shorter delivery times and higher demand, with lower delivery times associated with higher numbers of orders</div>
          </div> 
        </div>
    )
}