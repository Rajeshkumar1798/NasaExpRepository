import React from 'react';
import ApodDisplay from './components/ApodDisplay';
import MarsRoverPhotos from './components/MarsRoverPhotos';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>🚀 NASA Explorer</h1>
      <ApodDisplay />
      <MarsRoverPhotos />
    </div>
  );
}

export default App;
