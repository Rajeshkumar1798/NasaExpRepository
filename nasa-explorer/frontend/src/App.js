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
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [showSignup, setShowSignup] = useState(false);

  // Load user session on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedToken = localStorage.getItem('token');
    if (savedUsername && savedToken) {
      setUsername(savedUsername);
      setToken(savedToken);
    }
  }, []);

  // Handle login success
  const handleLogin = (user, jwtToken) => {
    setUsername(user);
    setToken(jwtToken);
    localStorage.setItem('username', user);
    localStorage.setItem('token', jwtToken);
  };

  // Logout function
  const handleLogout = () => {
    setUsername('');
    setToken('');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  // Show login/signup if not authenticated
  if (!token) {
    return (
      <div className="container">
        <h1>🌌 NASA Explorer</h1>
        {showSignup ? (
          <>
            <Signup onSignup={(user, jwtToken) => handleLogin(user, jwtToken)} />
            <p>
              Already have an account?{' '}
              <button onClick={() => setShowSignup(false)}>Login</button>
            </p>
          </>
        ) : (
          <>
            <Login onLogin={handleLogin} />
            <p>
              Don’t have an account?{' '}
              <button onClick={() => setShowSignup(true)}>Signup</button>
            </p>
          </>
        )}
      </div>
    );
  }

  // Authenticated view
  return (
    <div className="container">
      <h1>🌌 NASA Explorer</h1>
      <p>
        Welcome, <strong>{username}</strong>!
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
          Logout
        </button>
      </p>
      <Tabs active={active} setActive={setActive} />
      {active === 'APOD' && <ApodDisplay />}
      {active === 'Mars' && <MarsRoverPhotos />}
      {active === 'EPIC' && <EpicDisplay token={token} />}
    </div>
  );
}

export default App;


