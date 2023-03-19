import React from "react";
import { useState, useEffect } from "react";
import { MouseEvent } from "react";
import ModalData from "../../@types/ModalData";
import Filter from "./Filter";
import Login from "./Login";
import Updates from "./Updates";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Table from "./Table";

const stageMap: { [key: string]: string } = {
  All: "all",
  Pending: "pending",
  "Info. Received": "info_received",
  "In Transit": "in_transit",
  "Out for Delivery": "out_for_delivery",
  "Failed Attempt": "failed_attempt",
  "Available for Pickup": "available_for_pickup",
  Delivered: "delivered",
  Exception: "exception",
};

export default function Dashboard() {
  const [parcels, setParcels] = useState<React.ReactNode[]>([]);
  const [stage, setStage] = useState<string>("all");
  const [isParcelClicked, setIsParcelClicked] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [batchSize, setBatchSize] = useState<number>(3);
  const [searchText, setSearchText] = useState<string>("");

  function handleStageClick(e: MouseEvent<HTMLDivElement>) {
    if (e.currentTarget.textContent != null) {
      let s = e.currentTarget.textContent;

      // Remove number tag if it's present
      if (e.currentTarget.textContent.includes("(")) {
        const w = s.split(" ").slice(0, -1);
        s = w.join(" ");
      }
      setStage(stageMap[s]);
    }
  }

  function handleParcelClick(data: ModalData) {
    setModalData(data);
    setIsParcelClicked(true);
  }

  function closeUpdates() {
    setIsParcelClicked(false);
  }

  function stageCount(currStage: string) {
    return currStage === "all"
      ? parcels.length
      : parcels.filter((parcel) => {
          return (
            parcel != null &&
            React.isValidElement(parcel) &&
            parcel.props.children[1].props.children === currStage
          );
        }).length;
  }

  function getClassName(currentStage: string) {
    const defaultClassName = "rounded-lg cursor-pointer px-1";
    return currentStage === stage
      ? "bg-neutral-300 " + defaultClassName
      : defaultClassName;
  }

  function getStageHeaderText(currentStage: string) {
    function getKeyByValue(currentStage: string) {
      for (const key in stageMap) {
        if (stageMap[key] === currentStage) {
          return key;
        }
      }
    }
    return `${getKeyByValue(currentStage)} (${stageCount(currentStage)})`;
  }

  function loadThreeMore() {
    setBatchSize((old) => old + 3);
  }

  useEffect(() => {
    let myPromise: any;

    for (let i = 1; i < Math.ceil(batchSize / 40) + 1; i++) {
      let limit = batchSize - (i - 1) * 40;
      if (limit > 40) {
        limit = 40;
      }

      const promise = fetch(
        `https://api.ship24.com/public/v1/trackers?page=${i}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer apik_Ou1osZfT04pF7mpyMiWDyGdFowtpIP",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          return data.data.trackers;
        })
        .catch((error) => console.error(error));

      myPromise = promise;
    }

    myPromise
      .then((trackersArrays: any) => {
        // for the last 3 trackers render them as rows in the table
        const latestTrackers = trackersArrays
          .flat()
          .slice(batchSize - 3, batchSize);

        latestTrackers.forEach((tracker: any) => {
          fetch(
            `https://api.ship24.com/public/v1/trackers/${tracker.trackerId}/results`,
            {
              method: "GET",
              headers: {
                Authorization: "Bearer apik_Ou1osZfT04pF7mpyMiWDyGdFowtpIP",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              setParcels((parcels) => [
                ...parcels,
                <tr
                  id="parcel"
                  className="cursor-pointer"
                  onClick={() => handleParcelClick(data)}
                  key={Math.random()}
                >
                  <td id="tracking-number" className="border border-stone-300">
                    {data.data.trackings[0].tracker.trackingNumber}
                  </td>
                  <td id="status-milestone" className="border border-stone-300">
                    {data.data.trackings[0].shipment.statusMilestone}
                  </td>
                  <td id="origin-country" className="border border-stone-300">
                    {data.data.trackings[0].shipment.originCountryCode}
                  </td>
                  <td
                    id="destination-country"
                    className="border border-stone-300"
                  >
                    {data.data.trackings[0].shipment.destinationCountryCode}
                  </td>
                  <td id="courier" className="border border-stone-300">
                    {data.data.trackings[0].events.length > 0
                      ? data.data.trackings[0].events[0].courierCode
                      : "n/a"}
                  </td>
                </tr>,
              ]);
            });
        });
      })
      .catch((error: any) => console.error(error));
  }, [batchSize]);

  function checkPassword(e: any) {
    if (e.currentTarget.value === "87sd!@43w8*(oihr") {
      setIsLoggedIn(true);
    }
  }

  function updateParcels(e: any) {
    setSearchText(e.target.value);
  }

  return (
    <section
      id="parcel-dashboard"
      className="flex flex-col w-screen min-h-screen bg-gray-50"
    >
      {!isLoggedIn && <Login checkPassword={checkPassword} />}
      {isParcelClicked && (
        <Updates closeUpdates={closeUpdates} modalData={modalData} />
      )}
      <Filter
        getClassName={getClassName}
        getStageHeaderText={getStageHeaderText}
        handleStageClick={handleStageClick}
      />
      <label
        onChange={updateParcels}
        htmlFor="text"
        className="relative text-black bg-white block mt-4 w-4/5 mx-auto"
      >
        <MagnifyingGlassIcon className="text-stone-400 pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 right-2" />
        <input
          type="text"
          placeholder="Search by Tracking Number"
          className="border border-stone-400 rounded-md form-input w-full text-black bg-white"
        ></input>
      </label>
      <Table stage={stage} parcels={parcels} searchText={searchText} />
      <div className="mt-2 m-auto flex justify-center">
        <span
          onClick={loadThreeMore}
          className="text-black border border-black px-2 py-1 rounded-md bg-white cursor-pointer"
        >
          Load 3 More
        </span>
      </div>
    </section>
  );
}
