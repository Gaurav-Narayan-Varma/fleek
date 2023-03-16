import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import ftdVendorData from "../../data/ftd_vendor.json";
import ftdBuyerData from "../../data/ftd_buyer.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = Array.from({ length: 300 }, (_, index) => index);

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

// Vendor data
// Clean data: tranform into bucket list
for (let key in ftdVendorData) {
  // Bucket the data by 1 hour increments
  const max_value = Math.max(
    ...ftdVendorData[key as keyof typeof ftdVendorData].time_to_deliver_list[0]
  );
  const bucket = Array(max_value + 1).fill(0);

  for (
    let i = 0;
    i <
    ftdVendorData[key as keyof typeof ftdVendorData].time_to_deliver_list[0]
      .length;
    i++
  ) {
    const index =
      ftdVendorData[key as keyof typeof ftdVendorData].time_to_deliver_list[0][
        i
      ];
    bucket[index]++;
  }
  ftdVendorData[key as keyof typeof ftdVendorData].time_to_deliver_list[0] =
    bucket;
}

// Build vendor datasets
const ftdVendorSets = Object.values(ftdVendorData).map((country) => {
  return {
    label: country.origin,
    data: Array.from({ length: 300 }, (_, index) => {
      return country.time_to_deliver_list[0][index] > 0
        ? country.time_to_deliver_list[0][index]
        : 0;
    }),
    backgroundColor: getRandomColor(),
  };
});

// Vendor data
// Clean data: tranform into bucket list
for (let key in ftdBuyerData) {
  // Bucket the data by 1 hour increments
  const max_value = Math.max(
    ...ftdBuyerData[key as keyof typeof ftdBuyerData].time_to_deliver_list
  );
  const bucket = Array(max_value + 1).fill(0);

  for (
    let i = 0;
    i <
    ftdBuyerData[key as keyof typeof ftdBuyerData].time_to_deliver_list.length;
    i++
  ) {
    const index =
      ftdBuyerData[key as keyof typeof ftdBuyerData].time_to_deliver_list[i];
    bucket[index]++;
  }
  ftdBuyerData[key as keyof typeof ftdBuyerData].time_to_deliver_list = bucket;
}

// Build buyer datasets
const ftdBuyerSets = Object.values(ftdBuyerData).map((country) => {
  return {
    label: country.cc,
    data: Array.from({ length: 300 }, (_, index) => {
      return country.time_to_deliver_list[index] > 0
        ? country.time_to_deliver_list[index]
        : 0;
    }),
    backgroundColor: getRandomColor(),
  };
});

export default function FTDChart() {
  const [option, setOption] = useState<string>("buyer");

  const data = {
    labels,
    datasets: option == "buyer" ? ftdBuyerSets : ftdVendorSets,
  };

  const options = {
    plugins: {
      datalabels: {
        display: false,
        color: "#36454F",
        font: {
          size: 10,
        },
      },
      title: {
        display: false,
        text: `Time to Deliver by ${
          option === "buyer" ? "Buyer" : "Vendor"
        } Country`,
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (context: any) {
            return `${context[0].label}-${Number(context[0].label) + 1} hours`;
          },
          afterBody: function () {
            return "orders";
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Hours to Deliver",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "# of Orders",
        },
      },
    },
  };

  return (
    <div className="text-stone-700 font-bold text-xl text-center mb-2">
      Appendix B: Time to Deliver by{" "}
      <select
        onChange={(e) => setOption(e.target.value)}
        className="text-black bg-white"
      >
        <option value="buyer">Buyer Country</option>
        <option value="vendor">Vendor Country</option>
      </select>
      <div className="w-5/6 m-auto">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
