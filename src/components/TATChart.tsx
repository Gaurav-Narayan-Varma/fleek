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
  
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Monthly Turn Around Time by Issue Type Stacked Bar Chart',
      },
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
        backgroundColor: 'rgb(128, 0, 128)',
      },
      {
        label: 'Other',
        data: Object.values(TatData.other),
        backgroundColor: 'rgb(30, 144, 255)',
      },
      {
        label: 'Product not as described',
        data: Object.values(TatData.product_not_as_described),
        backgroundColor: 'rgb(255, 105, 180)',
      },
      {
        label: 'Product quality',
        data: Object.values(TatData.product_quality),
        backgroundColor: 'rgb(0, 0, 205)',
      },
      {
        label: 'Test duplicate',
        data: Object.values(TatData['test_/_duplicate']),
        backgroundColor: 'rgb(0, 128, 128)',
      },
      {
        label: 'Vendor related',
        data: Object.values(TatData.vendor_related),
        backgroundColor: 'rgb(255, 128, 113)',
      },
    ],
  };
  
  export default function TATChart() {
    return (
        <>
            <div className='text-black text-center mb-10'>Turn around Time</div>
            <Bar options={options} data={data} />
        </>
    )
}