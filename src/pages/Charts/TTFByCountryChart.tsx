import { useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart } from "react-chartjs-2";
import OrderCount from "../../data/order_count.json";
import TTFBuyer from "../../data/ttf_row_buyer.json";
import TTFBuyerMedian from "../../data/ttf_row_buyer_median.json";
import OrderCountVendor from "../../data/order_count_vendor.json";
import TTFVendor from "../../data/ttf_row_vendor.json";
import TTFVendorMedian from "../../data/ttf_row_vendor_median.json";
import { useRef, useEffect } from "react";
import "./show.css";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ChartDataLabels,
  LineController,
  BarController
);

const buyerLabels = [
  "United Kingdom",
  "United States",
  "France",
  "Germany",
  "ROW",
];
const vendorLabels = [
  "Pakistan",
  "United Kingdom",
  "United States",
  "India",
  "ROW",
];

const options: any = {
  plugins: {
    legend: {
      position: "bottom",
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: false,
      position: "left" as const,
      grid: {
        drawBorder: false,
      },
    },
    y1: {
      type: "linear" as const,
      display: false,
      position: "right" as const,
      grid: {
        drawBorder: false,
      },
    },
    x: {
      grid: {
        drawBorder: false,
        drawOnChartArea: false,
      },
    },
  },
};

export default function TTFByCountryChart() {
  const [option, setOption] = useState<string>("buyer");
  const myRef = useRef<Array<HTMLDivElement>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });
    if (myRef.current) {
      myRef.current.forEach((el) => {
        observer.observe(el);
      });
    }
  }, []);

  function addToRef(el: any) {
    myRef.current.push(el);
  }

  const data: any = {
    labels: option === "buyer" ? buyerLabels : vendorLabels,
    datasets: [
      {
        type: "line" as const,
        label: "Total Orders",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data:
          option === "buyer"
            ? Object.values(OrderCount[1])
            : Object.values(OrderCountVendor[1]),
        yAxisID: "y1",
        datalabels: {
          color: "#36454F",
          align: "top",
          offset: option === "buyer" ? "-4" : 0,
        },
      },
      {
        type: "bar" as const,
        label: "Average Hours to Fulfill",
        backgroundColor: "rgb(75, 192, 192)",
        data:
          option === "buyer"
            ? Object.values(TTFBuyer[1])
            : Object.values(TTFVendor[1]),
        borderColor: "white",
        borderWidth: 2,
        yAxisID: "y",
        datalabels: {
          anchor: "end",
          color: "#36454F",
          align: "top",
          offset: "-8",
        },
      },
      {
        type: "bar" as const,
        label: "Median Hours to Fulfill",
        backgroundColor: "rgb(53, 162, 235)",
        data:
          option === "buyer"
            ? Object.values(TTFBuyerMedian[1])
            : Object.values(TTFVendorMedian[1]),
        yAxisID: "y",
        datalabels: {
          anchor: "end",
          color: "#36454F",
          align: "top",
          offset: "-6",
        },
      },
    ],
  };

  return (
    <div id="fulfillment-times">
      <div
        id="chart"
        ref={addToRef}
        className="opacity-0 transition-all translate-x-full duration-700 min-h-fit flex gap-4 bg-white justify-center border border-stone-200 rounded-xl"
      >
        <div
          id="top-left"
          className="pt-2 bg-white flex-1 rounded-xl basis-1/12"
        >
          <div className="text-stone-700 font-bold text-xl text-center mb-2">
            Hours to Fulfill by{" "}
            <select
              onChange={(e) => setOption(e.target.value)}
              className="text-black bg-white rounded-md border border-stone-200"
            >
              <option value="buyer">Buyer Country</option>
              <option value="vendor">Vendor Country</option>
            </select>
          </div>
          <Chart options={options} type="bar" data={data} />
        </div>
        {option === "buyer" ? (
          <div
            id="analysis-section"
            className="text-black flex-1 rounded-xl flex flex-col justify-center px-8 bg-white"
          >
            <div
              id="bullet"
              className="opacity-1 transition-all duration-1000 delay-200 text-black text-center mt-2 font-semibold italic text-lg basis-1/6"
            >
              Key Takeaways
            </div>
            <div
              id="bullet"
              className='opacity-1 transition-all duration-1000 delay-300 before:content-["⚡️"] before:text-2xl before:absolute before:-ml-7 before:mt-2.5 basis-1/3'
            >
              Quicker fulfillment times correlate with more orders for the top
              three markets
            </div>
            <div
              id="bullet"
              className='opacity-1 transition-all duration-1000 delay-500 before:content-["🐢"] before:text-2xl before:absolute before:-ml-7 before:-mt-1.5 basis-1/3'
            >
              France faces longest average and median fulfillment times
            </div>
          </div>
        ) : (
          <div
            id="analysis-section"
            className="text-black flex-1 rounded-xl flex flex-col justify-center px-8 bg-white"
          >
            <div
              id="bullet"
              className="opacity-1 transition-all duration-1000 delay-200 text-black text-center mt-2 font-semibold italic text-lg basis-1/6"
            >
              Key Takeaways
            </div>
            <div
              id="bullet"
              className='opacity-1 transition-all duration-1000 delay-300 before:content-["❓"] before:text-2xl before:absolute before:-ml-7 before:mt-2 basis-1/3'
            >
              Slower fulfillment times correlate with more orders for top three
              markets
            </div>
            <div
              id="bullet"
              className='opacity-1 transition-all duration-1000 delay-500 before:content-["💡"] before:text-2xl before:absolute before:-ml-7 before:mt-2 basis-1/3'
            >
              Factors such as pricing and marketing may outweigh delivery time
              for customers
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
