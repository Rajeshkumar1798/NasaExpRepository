import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Card.css';

const MarsRoverPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [date, setDate] = useState('2024-01-01');
  const [loading, setLoading] = useState(false);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://your-backend.onrender.com/api/mars?date=${date}`);
      setPhotos(res.data.photos);
    } catch (err) {
      console.error('Error fetching Mars data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [date]);

  return (
    <div className="card">
      <h2>Mars Rover Photos ({date})</h2>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      {loading ? <p className="loading">Loading...</p> : null}
      <div className="grid">
        {photos.map(photo => (
          <div key={photo.id}>
            <img src={photo.img_src} alt="Mars" className="image" />
            <p>Rover: {photo.rover.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarsRoverPhotos;
