import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ApodDisplay() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    axios.get('https://nasa-backend-hfke.onrender.com/api/apod')
      .then(res => setApod(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loader">Loading...</div>;
  if (!apod) return <div className="error">Failed to load APOD</div>;

  const desc = expanded ? apod.explanation : apod.explanation.slice(0, 150) + '...';

  return (
    <div className="card">
      <h2>{apod.title}</h2>
      {apod.media_type === 'video' ? (
        <iframe src={apod.url} title="APOD video" className="apod-media" />
      ) : (
        <img src={apod.url} alt={apod.title} className="apod-media" />
      )}
      <p className="apod-desc">{desc}</p>
      <button className="read-more" onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Show Less' : 'Read More'}
      </button>
    </div>
  );
}
