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
        setParcels(parcels => [...parcels, <Parcel onClick={handleParcelClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} key={Math.random()}>
          <TrackerID>{data.data.trackings[0].tracker.trackingNumber}</TrackerID>
          <StatusMilestone>{data.data.trackings[0].shipment.statusMilestone}</StatusMilestone>
          <OriginCountryCode>{data.data.trackings[0].shipment.originCountryCode}</OriginCountryCode>
          <DestinationCountryCode>{data.data.trackings[0].shipment.destinationCountryCode}</DestinationCountryCode>
          <RecipientName>{data.data.trackings[0].recipient?.name ?? 'n/a'}</RecipientName>
        </Parcel>])
      })
      .catch(error => console.error(error))
    })
  }, [trackers])

  return (
    <div className="App">
      <section>
        { modal && 
          <Modal>
            <Overlay onClick={closeModal}/>
            <ModalContent>
              <CloseButton onClick={closeModal}>
                X
              </CloseButton>
            </ModalContent>
          </Modal>
        }
        <section className="bg-yellow-200 text-black flex justify-around p-15 font-medium">
          <Stage onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} stage={stage} text={'All'}>All {`(${parcels.length})`}</Stage>
          <Stage onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} stage={stage} text={'Pending'}>Pending {`(${parcels.filter((parcel) => {if (parcel != null) {if (React.isValidElement(parcel)) {return parcel.props.children[1].props.children === 'pending'}}}).length})`}</Stage>
          <Stage onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} stage={stage} text={'Info. Received'}>Info. Received {`(${parcels.filter((parcel) => {if (parcel != null) {if (React.isValidElement(parcel)) {return parcel.props.children[1].props.children === 'info_received'}}}).length})`}</Stage>
          <Stage onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} stage={stage} text={'In Transit'}>In Transit {`(${parcels.filter((parcel) => {if (parcel != null) {if (React.isValidElement(parcel)) {return parcel.props.children[1].props.children === 'in_transit'}}}).length})`}</Stage>
          <Stage onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} stage={stage} text={'Out for Delivery'}>Out for Delivery {`(${parcels.filter((parcel) => {if (parcel != null) {if (React.isValidElement(parcel)) {return parcel.props.children[1].props.children === 'out_for_delivery'}}}).length})`}</Stage>
          <Stage onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} stage={stage} text={'Failed Attempt'}>Failed Attempt {`(${parcels.filter((parcel) => {if (parcel != null) {if (React.isValidElement(parcel)) {return parcel.props.children[1].props.children === 'failed_attempt'}}}).length})`}</Stage>
          <Stage onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} stage={stage} text={'Available for Pickup'}>Available for Pickup {`(${parcels.filter((parcel) => {if (parcel != null) {if (React.isValidElement(parcel)) {return parcel.props.children[1].props.children === 'available_for_pickup'}}}).length})`}</Stage>
          <Stage onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} stage={stage} text={'Delivered'}>Delivered {`(${parcels.filter((parcel) => {if (parcel != null) {if (React.isValidElement(parcel)) {return parcel.props.children[1].props.children === 'delivered'}}}).length})`}</Stage>
          <Stage onClick={handleStageClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} stage={stage} text={'Exception'}>Exception {`(${parcels.filter((parcel) => {if (parcel != null) {if (React.isValidElement(parcel)) {return parcel.props.children[1].props.children === 'exception'}}}).length})`}</Stage>
        </section>
        <ParcelStack>
          <ParcelHeader>
            <TrackerID>Tracking Number</TrackerID>
            <ParcelSubHeader>
              <StatusMilestone>Status</StatusMilestone>
              <OriginCountryCode>Origin</OriginCountryCode>
              <DestinationCountryCode>Destination</DestinationCountryCode>
              <RecipientName>Customer</RecipientName>
            </ParcelSubHeader>
          </ParcelHeader>
          {stage === 'all' ? parcels : parcels.filter((parcel) => {
            if (parcel != null) {
              if (React.isValidElement(parcel)) {
                return parcel.props.children[1].props.children === stage
              }
            }
          })}
        </ParcelStack>

        <table className='w-full'>
          <thead className='text-red-500'>
            <tr className=''>
              <th className='border'>Name</th>
              <th className='border'>Age</th>
              <th className='border'>Gender</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border'>
              <td>Anom</td>
              <td>19</td>
              <td>Male</td>
            </tr>
            <tr className='border'>
              <td>Megha</td>
              <td>19</td>
              <td>Female</td>
            </tr>
            <tr className='border'>
              <td>Subham</td>
              <td>25</td>
              <td>Male</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default App

const Modal = styled.div`
`;

const Overlay = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
`

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50%;
  width: 50%;
  background-color: white;
`
const CloseButton = styled.div`
  position: absolute;
  top: -10px;
  right: 0;
  font-size: 1.2rem;
  font-weight: 500;
  color: red;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
`

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