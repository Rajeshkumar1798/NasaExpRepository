import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';

export default function EpicDisplay() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false), [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('https://nasa-backend-hfke.onrender.com/api/epic')
      .then(res => setImages(res.data || []))
      .catch(() => setError('Failed to fetch EPIC images'))
      .finally(() => setLoading(false));
  }, []);

  const buildUrl = (img) => {
    const date = img.date.split(' ')[0].replace(/-/g, '/');
    return `https://api.nasa.gov/EPIC/archive/natural/${date}/png/${img.image}?api_key=${process.env.REACT_APP_NASA_API_KEY}`;
  };

  return (
    <div className="card">
      <h2>EPIC (Earth Polychromatic)</h2>
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="grid">
        {images.map(img => (
          <div key={img.identifier} className="photo-card">
            <img src={buildUrl(img)} alt="EPIC Earth" />
            <p><strong>Date:</strong> {img.date.split(' ')[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
