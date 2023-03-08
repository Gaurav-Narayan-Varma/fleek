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
        color: 'black',
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Turn Around Time by Issue Type MoM',
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