import React, { useState, useEffect } from 'react';
import Tabs from './components/Tabs';
import ApodDisplay from './components/ApodDisplay';
import MarsRoverPhotos from './components/MarsRoverPhotos';
import EpicDisplay from './components/EpicDisplay';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App() {
  const [active, setActive] = useState('APOD');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [showSignup, setShowSignup] = useState(false);

  // When user logs in
  const handleLogin = (user) => {
    setUsername(user);
    localStorage.setItem('username', user);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
  };

  if (!username) {
    // Show login or signup if not logged in
    return (
      <div className="container">
        <h1>🌌 NASA Explorer</h1>
        {showSignup ? (
          <>
            <Signup />
            <p>
              Already have an account?{' '}
              <button onClick={() => setShowSignup(false)}>Login</button>
            </p>
          </>
        ) : (
          <>
            <Login onLogin={handleLogin} />
            <p>
              Don't have an account?{' '}
              <button onClick={() => setShowSignup(true)}>Signup</button>
            </p>
          </>
        )}
      </div>
    );
  }

  // If logged in, show the main app with tabs
  return (
    <div className="container">
      <h1>🌌 NASA Explorer</h1>
      <p>
        Welcome, {username}!{' '}
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
          Logout
        </button>
      </p>
      <Tabs active={active} setActive={setActive} />
      {active === 'APOD' && <ApodDisplay />}
      {active === 'Mars' && <MarsRoverPhotos />}
      {/* Pass token to EpicDisplay */}
      {active === 'EPIC' && (
        <EpicDisplay token={localStorage.getItem('token')} />
      )}
    </div>
  );
}

export default App;

