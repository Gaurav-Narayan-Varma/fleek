import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import styled from 'styled-components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Wrapper>
        <Title>
          Hello World!
        </Title>
      </Wrapper>
    </div>
  )
}

export default App

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;