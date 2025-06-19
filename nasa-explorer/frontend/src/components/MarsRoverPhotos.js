import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ROVERS = ['Curiosity', 'Opportunity', 'Spirit'];

export default function MarsRoverPhotos() {
  const [photos, setPhotos] = useState([]);
  const [date, setDate] = useState('2021-06-03');
  const [rover, setRover] = useState('Curiosity');
  const [loading, setLoading] = useState(false);

  const fetchPhotos = () => {
    setLoading(true);
    axios.get(`https://nasa-backend-hfke.onrender.com/api/mars?date=${date}&rover=${rover.toLowerCase()}`)
      .then(res => setPhotos(res.data.photos || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(fetchPhotos, [date, rover]);

  return (
    <div className="card">
      <h2>Mars Rover Photos</h2>
      <div className="controls">
        <label>Date: <input type="date" value={date} onChange={e => setDate(e.target.value)} /></label>
        <label>Rover:
          <select value={rover} onChange={e => setRover(e.target.value)}>
            {ROVERS.map(r => <option key={r}>{r}</option>)}
          </select>
        </label>
      </div>
      {loading && <div className="loader">Loading...</div>}
      {!loading && photos.length === 0 && <div className="error">No photos for this date/rover</div>}
      <div className="grid">
        {photos.map(p => (
          <div key={p.id} className="photo-card">
            <img src={p.img_src} alt="Mars Rover" />
            <p><strong>Rover:</strong> {p.rover.name}</p>
            <p><strong>Camera:</strong> {p.camera.full_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
