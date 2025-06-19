import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';

const ROVERS = ['curiosity', 'opportunity', 'spirit'];

export default function MarsRoverPhotos() {
  const [photos, setPhotos] = useState([]);
  const [date, setDate] = useState('2021-06-03');
  const [rover, setRover] = useState('curiosity');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    axios.get(`https://nasa-backend-hfke.onrender.com/api/mars`, { params: { date, rover } })
      .then(res => setPhotos(res.data.photos || []))
      .catch(() => setError('Error fetching Mars photos'))
      .finally(() => setLoading(false));
  }, [date, rover]);

  return (
    <div className="card">
      <h2>Mars Rover Photos</h2>
      <div className="controls">
        <label>Date: <input type="date" value={date} onChange={e => setDate(e.target.value)} /></label>
        <label>Rover:
          <select value={rover} onChange={e => setRover(e.target.value)}>
            {ROVERS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>
      </div>
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && photos.length === 0 && <div>No photos available.</div>}
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
