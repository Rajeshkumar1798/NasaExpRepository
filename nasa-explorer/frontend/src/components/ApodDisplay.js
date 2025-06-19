import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Card.css';

const ApodDisplay = () => {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://nasa-backend-hfke.onrender.com')
      .then(res => {
        setApod(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading Astronomy Picture...</p>;
  if (!apod) return <p className="error">Failed to fetch APOD.</p>;

  return (
    <div className="card">
      <h2>{apod.title}</h2>
      <img src={apod.url} alt={apod.title} className="image" />
      <p>{apod.explanation}</p>
    </div>
  );
};

export default ApodDisplay;
