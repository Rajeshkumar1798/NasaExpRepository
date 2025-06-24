import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';

export default function EpicDisplay({ token }) {
  const [imagesByDate, setImagesByDate] = useState({});
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
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
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const grouped = res.data.reduce((acc, img) => {
          const date = img.date.split(' ')[0];
          if (!acc[date]) acc[date] = [];
          acc[date].push(img);
          return acc;
        }, {});
        const dateList = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
        setImagesByDate(grouped);
        setDates(dateList);
        setSelectedDate(dateList[0]);
      })
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
      <h2>🌍 EPIC (Earth Polychromatic Camera)</h2>
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {/* Date Selector */}
      <div className="chip-container">
        {dates.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDate(d)}
            className={`chip ${d === selectedDate ? 'active' : ''}`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Image Display */}
      <div className="grid">
        {imagesByDate[selectedDate]?.map((img) => (
          <div key={img.identifier} className="photo-card">
            <img src={buildUrl(img)} alt={img.caption} />
            <p><strong>{img.caption}</strong></p>
            <p>{new Date(img.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
