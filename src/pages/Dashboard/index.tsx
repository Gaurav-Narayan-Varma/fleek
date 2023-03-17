import React from "react";
import { useState, useEffect } from "react";
import { MouseEvent } from "react";
import ModalData from "../../@types/ModalData";
import Filter from "./Filter";
import Login from "./Login";
import Updates from "./Updates";

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

export default function ParcelDashboard() {
  const [trackers, setTrackers] = useState<
    { trackerId: string; trackingNumber: string }[]
  >([]);
  const [parcels, setParcels] = useState<React.ReactNode[]>([]);
  const [stage, setStage] = useState<string>("all");
  const [isParcelClicked, setIsParcelClicked] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [nextBatch, setNextBatch] = useState<number>(3);

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
    setNextBatch((old) => old + 3);
  }

  // Fetching all trackers
  useEffect(() => {
    let myPromise: any;

    for (let i = 1; i < 2; i++) {
      const promise = fetch(
        `https://api.ship24.com/public/v1/trackers?page=${i}&limit=${nextBatch}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer apik_Ou1osZfT04pF7mpyMiWDyGdFowtpIP",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => data.data.trackers)
        .catch((error) => console.error(error));

      myPromise = promise;
    }

    myPromise
      .then((trackersArrays: any) => {
        // console.log(trackersArrays);
        setTrackers([]);
        const trackers = trackersArrays.flat();
        setTrackers(trackers);
      })
      .catch((error: any) => console.error(error));
  }, [nextBatch]);

  // Fetch data for each TrackerId and create parcel component
  useEffect(() => {
    const batchSize = 3;
    let currentIndex = nextBatch - 3;

    // creating a new list of trackers
    const trackersBatch = trackers.slice(
      currentIndex,
      currentIndex + batchSize
    );

    function fetchTrackers() {
      // creating list of promises, each one representing a tracker
      const trackerPromiseList = trackersBatch.map((tracker) => {
        return fetch(
          `https://api.ship24.com/public/v1/trackers/${tracker.trackerId}/results`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer apik_Ou1osZfT04pF7mpyMiWDyGdFowtpIP",
            },
          }
        ).then((response) => response.json());
      });

      // iterating through the list of trackers
      Promise.all(trackerPromiseList)
        .then((results) => {
          results.forEach((data) => {
            setParcels((parcels) => [
              ...parcels,
              <tr
                id="parcel"
                className="cursor-pointer"
                onClick={() => handleParcelClick(data)}
                key={Math.random()}
              >
                <td id="tracking-number" className="border">
                  {data.data.trackings[0].tracker.trackingNumber}
                </td>
                <td id="status-milestone" className="border">
                  {data.data.trackings[0].shipment.statusMilestone}
                </td>
                <td id="origin-country" className="border">
                  {data.data.trackings[0].shipment.originCountryCode}
                </td>
                <td id="destination-country" className="border">
                  {data.data.trackings[0].shipment.destinationCountryCode}
                </td>
                <td id="courier" className="border">
                  {data.data.trackings[0].events.length > 0
                    ? data.data.trackings[0].events[0].courierCode
                    : "n/a"}
                </td>
              </tr>,
            ]);
          });

          currentIndex += batchSize;
          if (currentIndex < trackers.length) {
            setTimeout(fetchTrackers, 1000); // delay for 1 second before fetching the next batch
          }
        })
        .catch((error) => console.error(error));
    }

    fetchTrackers();
  }, [trackers]);

  function checkPassword(e: any) {
    if (e.currentTarget.value === "87sd!@43w8*(oihr") {
      setIsLoggedIn(true);
    }
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
      <table id="parcel-stack" className="w-11/12 mx-auto mt-5">
        <thead id="parcel-stack-header" className="text-black">
          <tr>
            <th className="border">Tracking Number</th>
            <th className="border">Status</th>
            <th className="border">Origin</th>
            <th className="border">Destination</th>
            <th className="border">Courier</th>
          </tr>
        </thead>
        <tbody className="text-black">
          {stage === "all"
            ? parcels
            : parcels.filter((parcel) => {
                if (parcel != null) {
                  if (React.isValidElement(parcel)) {
                    return parcel.props.children[1].props.children === stage;
                  }
                }
              })}
        </tbody>
      </table>
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
