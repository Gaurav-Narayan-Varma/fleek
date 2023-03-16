import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import OrdersTimeData from "../../data/orders_time.json";

interface CountryData {
  [country: string]: {
    [date: string]: number | null;
  };
}

const myOrdersTimeData = OrdersTimeData as CountryData;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options: any = {
  responsive: true,
  plugins: {
    datalabels: {
      display: true,
      color: "#36454F",
      align: "top",
      offset: 0,
      font: {
        size: 10,
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Orders Over Time Granular View",
    },
  },
};

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

const labels = [
  "2021-11",
  '"2021-12',
  "2022-01",
  "2022-02",
  "2022-03",
  "2202-04",
  "2022-05",
  "2022-06",
  "2022-07",
  "2022-08",
  "2022-09",
  "2022-10",
  "2022-11",
  "2022-12",
  "2023-01",
  "2023-02",
];

const sets = Object.keys(myOrdersTimeData).map((key) => {
  const lineColor = getRandomColor();
  return {
    label: key,
    data: Object.values(myOrdersTimeData[key]),
    borderColor: `${lineColor}`,
    backgroundColor: `${lineColor}`,
  };
});

const data = {
  labels,
  datasets: sets,
};

export default function OrdersTimeChartGranular() {
  return (
    <div>
      <div className="text-stone-700 font-bold text-xl text-center mb-2">
        Orders Over Time Granular View
      </div>
      <Line options={options} data={data} />
    </div>
  );
}
