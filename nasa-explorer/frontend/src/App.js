import React, { useState } from 'react';
import Tabs from './components/Tabs';
import ApodDisplay from './components/ApodDisplay';
import MarsRoverPhotos from './components/MarsRoverPhotos';
import EpicDisplay from './components/EpicDisplay';
import './App.css';

function App() {
  const [active, setActive] = useState('APOD');

  return (
    <div className="container">
      <h1>🌌 NASA Explorer</h1>
      <Tabs active={active} setActive={setActive} />
      {active === 'APOD' && <ApodDisplay />}
      {active === 'Mars' && <MarsRoverPhotos />}
      {active === 'EPIC' && <EpicDisplay />}
    </div>
  );
}

export default App;

