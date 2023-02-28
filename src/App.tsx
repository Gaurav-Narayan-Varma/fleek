import { useState, useEffect } from 'react'
import './App.css'
import styled from 'styled-components'
import { MouseEvent } from 'react';
import React from 'react';
import { DetailedHTMLProps, TdHTMLAttributes } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      td: DetailedHTMLProps<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;
    }
  }
}

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

function App() {
  const [trackers, setTrackers] = useState<{ trackerId: string, trackingNumber: string }[]>([])
  const [parcels, setParcels] = useState<React.ReactNode[]>([])
  const [stage, setStage] = useState<string>('all')
  const [modal, setModal] = useState<boolean>(false)

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

  function handleParcelClick() {
    setModal(true)
  }

  function handleMouseEnter(e: MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.cursor = 'pointer';
  };

  function handleMouseLeave(e: MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.cursor = 'default';
  };

  function closeModal() {
    setModal(false)
  }

  function stageCount(currStage: string) {
    return parcels.filter((parcel) => {
      return (
        parcel != null &&
        React.isValidElement(parcel) &&
        parcel.props.children[1].props.children === currStage
      );
    }).length;
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
          <tr id='parcel' onClick={handleParcelClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} key={Math.random()}>
            <td className='border'>{data.data.trackings[0].tracker.trackingNumber}</td>
            <td className='border'>{data.data.trackings[0].shipment.statusMilestone}</td>
            <td className='border'>{data.data.trackings[0].shipment.originCountryCode}</td>
            <td className='border'>{data.data.trackings[0].shipment.destinationCountryCode}</td>
            <td className='border'>{data.data.trackings[0].recipient?.name ?? 'n/a'}</td>
          </tr>
        ])
      })
      .catch(error => console.error(error))
    })
  }, [trackers])

  return (
    <div className="App">
      <section id='page-container'>
        { modal && 
          <div id='modal-section'>
            <div id='overlay' onClick={closeModal} className="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-60"/>
            <div id='modal' className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/2 w-1/2 bg-white">
              <div id='close-button' onClick={closeModal} className='absolute top-1 right-2 cursor-pointer'>
                ❌
              </div>
            </div>
          </div>
        }
        <section id='stage-nav-bar' className="bg-yellow-200 text-black flex justify-around p-15 font-medium">
          <Stage onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} stage={stage} text={'All'}>All {`(${parcels.length})`}</Stage>
          <Stage onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} stage={stage} text={'Pending'}>Pending {`(${stageCount('pending')})`}</Stage>
          <Stage onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} stage={stage} text={'Info. Received'}>Info. Received {`(${stageCount('info_received')})`}</Stage>
          <Stage onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} stage={stage} text={'In Transit'}>In Transit {`(${stageCount('in_transit')})`}</Stage>
          <Stage onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} stage={stage} text={'Out for Delivery'}>Out for Delivery {`(${stageCount('out_for_delivery')})`}</Stage>
          <Stage onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} stage={stage} text={'Failed Attempt'}>Failed Attempt {`(${stageCount('failed_attempt')})`}</Stage>
          <Stage onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} stage={stage} text={'Available for Pickup'}>Available for Pickup {`(${stageCount('available_for_pickup')})`}</Stage>
          {/* <Stage onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} stage={stage} text={'Delivered'}>Delivered {`(${stageCount('delivered')})`}</Stage> */}
          { stage === 'delivered' ?
            <div id='stage-header' className='bg-neutral-300 rounded-lg' onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Delivered {`(${stageCount('delivered')})`}</div>
            : <div id='stage-header' className='rounded-lg' onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Delivered {`(${stageCount('delivered')})`}</div>
          }
          { stage === 'exception' ?
            <div id='stage-header' className='bg-neutral-300 rounded-lg' onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Exception {`(${stageCount('exception')})`}</div>
            : <div id='stage-header' className='rounded-lg' onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Exception {`(${stageCount('exception')})`}</div>
          }
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
    </div>
  )
}

export default App

interface StageProps {
  text: string;
  stage: string;
}

const Stage = styled.div<StageProps>`
  margin: 0;
  border-radius: 8px;
  background-color: ${(props) => stageMap[props.text] === props.stage ? '#D3D3D3' : 'inherit'};
`;

const ParcelStack = styled.section`
  margin: 2vw;
`;

const Parcel = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2em;
  padding-left: 32px;
  padding-right: 32px;
  background-color: white;
  color: black;
  border: 1px solid grey;

  &:first-child {
    background-color: grey;
  }
`;

const TrackerID = styled.div`
  margin: 0;
`;

const StatusMilestone = styled.div`
  margin: 0;
`;

const OriginCountryCode = styled.div`
  margin: 0;
`;

const DestinationCountryCode = styled.div`
  margin: 0;
`;

const RecipientName = styled.div`
  margin: 0;
`;

const ParcelHeader = styled.section`
  margin: 0;
  display: flex;
  height: 2em;
  background-color: grey;
  color: black;
  border: 1px solid grey;
  padding-left: 32px;
  padding-right: 32px;

  & > :first-child {
    margin-right: 275px;
    white-space: nowrap;
  }
`;

const ParcelSubHeader = styled.div`
  display: flex;
  height: 2em;
  background-color: grey;
  color: black;
  border: 1px solid grey;

  & > :first-child {
    margin-right: 270px;
  }
  
  & > :nth-child(2) {
    margin-right: 200px;
  }

  & > :nth-child(3) {
    margin-right: 200px;
  }
`