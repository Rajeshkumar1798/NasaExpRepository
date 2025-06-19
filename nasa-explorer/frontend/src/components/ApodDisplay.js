import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ApodDisplay() {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://nasa-backend-hfke.onrender.com/api/apod')
      .then(response => {
        setApodData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch APOD data');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Astronomy Picture of the Day...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{apodData.title}</h2>
      <img src={apodData.url} alt={apodData.title} style={{ maxWidth: '100%' }} />
      <p>{apodData.explanation}</p>
      <p><small>Date: {apodData.date}</small></p>
    </div>
  );
}

export default ApodDisplay;
