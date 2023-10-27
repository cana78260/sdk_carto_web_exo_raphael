import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/NavBar';
import Map from './Pages/Map';
import Markers from './Components/Markers';

function App() {
  return (
    <div>
     <Navbar/>
     <div className='sdk_container'>
      <Map/>
     </div>
     <Markers/>
    </div>
  );
}

export default App;
