import React from 'react';
import { Routes , Route } from 'react-router-dom'; 
import Coding from './components/Coding';
import Data from './components/Data';

function App() {

  return (
    <div className="App">
      <Routes> 
          <Route path ="/" element= {<Coding />}/>  
          <Route path ="/data" element= {<Data />}/>
       </Routes> 
    </div>
  )
}

export default App