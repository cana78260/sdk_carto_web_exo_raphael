import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './NavBar';
import Map from './Map';

function App() {
  return (
    <div>
     <Navbar/>
     <div className='sdk_container'>
      <Map/>
     </div>
    </div>
  );
}

export default App;
