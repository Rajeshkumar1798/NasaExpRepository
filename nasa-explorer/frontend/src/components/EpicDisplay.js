import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';

export default function EpicDisplay({ token }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('You must be logged in to view EPIC data');
      return;
    }

    setLoading(true);
    axios
      .get('https://nasa-backend-hfke.onrender.com/api/epic', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setImages(res.data || []))
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 401) {
          setError('Unauthorized. Your session may have expired.');
        } else {
          setError('Failed to fetch EPIC images');
        }
      })
      .finally(() => setLoading(false));
  }, [token]);

  const buildUrl = (img) => {
    const date = img.date.split(' ')[0].replace(/-/g, '/');
    return `https://api.nasa.gov/EPIC/archive/natural/${date}/png/${img.image}.png?api_key=${process.env.REACT_APP_NASA_API_KEY}`;
  };

  return (
    <div className="card">
      <h2>EPIC (Earth Polychromatic)</h2>
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="grid">
        {images.map((img) => (
          <div key={img.identifier} className="photo-card">
            <img src={buildUrl(img)} alt="EPIC Earth" />
            <p><strong>Date:</strong> {img.date.split(' ')[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
