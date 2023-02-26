import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import styled from 'styled-components'

function App() {
  const [trackers, setTrackers] = useState([])

  // Fetching trackers
  useEffect(() => {
    fetch('https://api.ship24.com/public/v1/trackers', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer apik_Ou1osZfT04pF7mpyMiWDyGdFowtpIP',
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
  }, [])

  // // Fetching data from trackers
  // useEffect(() => {
  //   // fetch('https://api.ship24.com/public/v1/trackers/{trackerId}/results')
  // })

  return (
    <div className="App">
      <PageContainer>
        <TrackingBar>
          <Stage>All</Stage>
          <Stage>Pending</Stage>
          <Stage>Info Received</Stage>
          <Stage>In Transit</Stage>
          <Stage>Out for Delivery</Stage>
          <Stage>Failed Attempt</Stage>
          <Stage>Available for Pickup</Stage>
          <Stage>Delivered</Stage>
          <Stage>Exception</Stage>
        </TrackingBar>
        <ParcelStack>
          <Parcel>
            <TrackerID>Tracker ID</TrackerID>
            <StatusMilestone>Status</StatusMilestone>
            <OriginCountryCode>Origin</OriginCountryCode>
            <DestinationCountryCode>Destination</DestinationCountryCode>
            <RecipientName>Customer</RecipientName>
          </Parcel>
          <Parcel>Parcel 1</Parcel>
          <Parcel>Parcel 2</Parcel>
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

const Stage = styled.div`
  margin: 0;
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