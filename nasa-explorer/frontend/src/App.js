import React, { useState } from 'react';
import Tabs from './components/Tabs';
import ApodDisplay from './components/ApodDisplay';
import MarsRoverPhotos from './components/MarsRoverPhotos';
import './App.css';

function App() {
  const [active, setActive] = useState('APOD');

  return (
    <div className="container">
      <h1>🌌 NASA Explorer</h1>
      <Tabs active={active} setActive={setActive} />
      {active === 'APOD' ? <ApodDisplay /> : <MarsRoverPhotos />}
    </div>
  );
}

export default App;

