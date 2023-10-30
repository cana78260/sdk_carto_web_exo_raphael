import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/NavBar';
import Map from './Pages/Map';
import MarkerButtons from './Components/MarkerButtons';

function App() {
  return (
    <div>
     <Navbar/>
     <div className='sdk_container'>
      <Map/>
     </div>
     <MarkerButtons/>
    </div>
  );
}

export default App;
