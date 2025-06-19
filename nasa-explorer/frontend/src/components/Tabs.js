import React from 'react';

function Tabs({ active, setActive }) {
  return (
    <div className="tabs">
      {['APOD', 'Mars'].map(tab => (
        <button
          key={tab}
          className={active === tab ? 'active-tab' : ''}
          onClick={() => setActive(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
