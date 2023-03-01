import React from "react";
import { useState, useEffect } from 'react'
import { MouseEvent } from 'react';
import { DetailedHTMLProps, TdHTMLAttributes } from 'react';
import ModalData from '../types/ModalData'
import { Link } from 'react-router-dom'

declare global {
    namespace JSX {
      interface IntrinsicElements {
        td: DetailedHTMLProps<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;
      }
    }
  }
  
  const stages = ['all', 'pending', 'info_received', 'in_transit', 'out_for_delivery', 'failed_attempt', 'available_for_pickup', 'delivered', 'exception'];
  
  const stageMap: {[key: string]: string} = {
    'All': 'all',
    'Pending': 'pending',
    'Info. Received': 'info_received',
    'In Transit': 'in_transit',
    'Out for Delivery': 'out_for_delivery',
    'Failed Attempt': 'failed_attempt',
    'Available for Pickup': 'available_for_pickup',
    'Delivered': 'delivered',
    'Exception': 'exception',
  };

function Coding() {
    const [trackers, setTrackers] = useState<{ trackerId: string, trackingNumber: string }[]>([])
    const [parcels, setParcels] = useState<React.ReactNode[]>([])
    const [stage, setStage] = useState<string>('all')
    const [modal, setModal] = useState<boolean>(false)
    const [modalData, setModalData] = useState<ModalData | null>(null)
  
    function handleStageClick(e: MouseEvent<HTMLDivElement>) {
      if (e.currentTarget.textContent != null) {
        let s = e.currentTarget.textContent
  
        // Remove number tag if it's present
        if (e.currentTarget.textContent.includes('(')) {
          const w = s.split(' ').slice(0, -1)
          s = w.join(' ')
        }
        setStage(stageMap[s])
      }
    }
  
    function handleParcelClick(data: ModalData) {
      setModalData(data)
      setModal(true)
    }
  
    function closeModal() {
      setModal(false)
    }
  
    function stageCount(currStage: string) {
      return currStage === 'all' ? parcels.length :
      parcels.filter((parcel) => {
        return (
          parcel != null &&
          React.isValidElement(parcel) &&
          parcel.props.children[1].props.children === currStage
        );
      }).length;
    }
  
    function getClassName(currentStage: string) {
      const defaultClassName = 'rounded-lg cursor-pointer';
      return currentStage === stage ? 'bg-neutral-300 ' + defaultClassName : defaultClassName;
    };
  
    function getStageHeaderText(currentStage: string){
      function getKeyByValue(currentStage: string) {
        for (const key in stageMap) {
          if (stageMap[key] === currentStage) {
            return key;
          }
        }
      }
      return `${getKeyByValue(currentStage)} (${stageCount(currentStage)})`;
    }
  
    // Fetching all trackers
    useEffect(() => {
      fetch('https://api.ship24.com/public/v1/trackers', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer apik_Ou1osZfT04pF7mpyMiWDyGdFowtpIP',
        }
      })
      .then(response => response.json())
      .then(data => setTrackers(data.data.trackers))
      .catch(error => console.error(error))
    }, [])
  
    // Fetch data for each TrackerId and create parcel component
    useEffect(() => {
      trackers.forEach(tracker => {
        fetch(`https://api.ship24.com/public/v1/trackers/${tracker.trackerId}/results`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer apik_Ou1osZfT04pF7mpyMiWDyGdFowtpIP',
          }
        })
        .then(response => response.json())
        .then(data => {
          setParcels(parcels => [
            ...parcels, 
            <tr id='parcel' className='cursor-pointer' onClick={() => handleParcelClick(data)} key={Math.random()}>
              <td id='tracking-number' className='border'>{data.data.trackings[0].tracker.trackingNumber}</td>
              <td id='status-milestone' className='border'>{data.data.trackings[0].shipment.statusMilestone}</td>
              <td id='origin-country' className='border'>{data.data.trackings[0].shipment.originCountryCode}</td>
              <td id='destination-country' className='border'>{data.data.trackings[0].shipment.destinationCountryCode}</td>
              <td id='courier' className='border'>{data.data.trackings[0].events.length > 0 ? data.data.trackings[0].events[0].courierCode : 'n/a'}</td>
            </tr>
          ])
        })
        .catch(error => console.error(error))
      })
    }, [trackers])

    return(
        <section id='page-container' className='flex'>
            <section id='nav-bar' className='px-5 w-48 shrink-0 h-screen bg-white text-black font-sans'>
                <ul className='mt-6'>
                    <li className='mb-4 font-bold'>
                    <a>🔨 Coding Task</a>
                    </li>
                    <li>
                    <Link to='/data'>📈 Data Task</Link>
                    </li>
                </ul>
            </section>
            <section id='coding-assignment' className='w-full'>
            { modal && 
            <div id='modal-section'>
                <div id='overlay' onClick={closeModal} className="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-60"/>
                <div id='modal' className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/2 w-1/2 bg-white'>
                <div id='updates' className="overflow-auto w-full h-full">
                    {modalData?.data?.trackings[0]?.events?.length! > 0 ? 
                    <table>
                        <thead>
                        <tr className='text-black'>
                            <th className='border border-black'>Date</th>
                            <th className='border border-black'>Location</th>
                            <th className='border border-black'>Status</th>
                            <th className='border border-black'>Courier</th>
                        </tr>
                        </thead>
                        <tbody>
                        {modalData?.data?.trackings[0]?.events.map((update) => {
                            return <tr className='text-black'>
                            <td className='border border-black'>{update.datetime}</td>
                            <td className='border border-black'>{update.location}</td>
                            <td className='border border-black'>{update.status}</td>
                            <td className='border border-black'>{update.courierCode}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                    : <div className='text-black'>No updates found</div>
                    }
                </div>
                <div className='bg-white h-7 relative border'>
                    <div id='close-btn' onClick={closeModal} className='absolute right-2 rounded-lg cursor-pointer bg-neutral-300 inline-block text-red-600'>❌ Close</div>
                </div>
                </div>
            </div>
            }
            <section id='stage-nav-bar' className="bg-yellow-200 text-black flex justify-around p-15 font-medium">
            {stages.map((currentStage) => (
                <div
                id='stage-header'
                className={getClassName(currentStage)}
                onClick={handleStageClick}
                key={currentStage}
                >
                {getStageHeaderText(currentStage)}
                </div>
            ))}
            </section>
            <table id='parcel-stack' className='w-11/12 mx-auto mt-5'>
            <thead id='parcel-stack-header' className='text-red-500'>
                <tr>
                <th className='border'>Tracking Number</th>
                <th className='border'>Status</th>
                <th className='border'>Origin</th>
                <th className='border'>Destination</th>
                <th className='border'>Courier</th>
                </tr>
            </thead>
            <tbody>
                {stage === 'all' ? parcels : parcels.filter((parcel) => {
                if (parcel != null) {
                    if (React.isValidElement(parcel)) {
                    return parcel.props.children[1].props.children === stage
                    }
                }
                })}
            </tbody>
            </table>
            </section>
      </section>
    )

}

export default Coding