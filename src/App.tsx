import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import styled from 'styled-components'
import { MouseEvent } from 'react';
import React from 'react';

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
  const [trackers, setTrackers] = useState<{ trackerId: string }[]>([])
  const [parcels, setParcels] = useState<React.ReactNode[]>([])
  const [stage, setStage] = useState<string>('all')

  
  function handleClick(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if (target.textContent != null) {
      setStage(stageMap[target.textContent])
    }
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
        setParcels(parcels => [...parcels, <Parcel key={Math.random()}>
          <TrackerID>{data.data.trackings[0].tracker.trackerId}</TrackerID>
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
      <PageContainer>
        <TrackingBar>
          <Stage onClick={(e) => handleClick(e)} stage={stage} text={'All'}>All {stage}</Stage>
          <Stage onClick={(e) => handleClick(e)} stage={stage} text={'Pending'}>Pending</Stage>
          <Stage onClick={(e) => handleClick(e)} stage={stage} text={'Info. Received'}>Info. Received</Stage>
          <Stage onClick={(e) => handleClick(e)} stage={stage} text={'In Transit'}>In Transit</Stage>
          <Stage onClick={(e) => handleClick(e)} stage={stage} text={'Out for Delivery'}>Out for Delivery</Stage>
          <Stage onClick={(e) => handleClick(e)} stage={stage} text={'Failed Attempt'}>Failed Attempt</Stage>
          <Stage onClick={(e) => handleClick(e)} stage={stage} text={'Available for Pickup'}>Available for Pickup</Stage>
          <Stage onClick={(e) => handleClick(e)} stage={stage} text={'Delivered'}>Delivered</Stage>
          <Stage onClick={(e) => handleClick(e)} stage={stage} text={'Exception'}>Exception</Stage>
        </TrackingBar>
        <ParcelStack>
          <ParcelHeader>
            <TrackerID>Tracker ID</TrackerID>
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
      </PageContainer>
    </div>
  )
}

export default App

const PageContainer = styled.section`
  height: 100vh;
  width: 100vw;
`;

const TrackingBar = styled.section`
  background-color: yellow;
  color: black;
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 15px;
  font-weight: 450;
`;

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
    margin-right: 465px;
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
    margin-right: 220px;
  }
  
  & > :nth-child(2) {
    margin-right: 200px;
  }

  & > :nth-child(3) {
    margin-right: 125px;
  }
`