import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = ({ onGetStarted }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log('Navigating to profile setup');
    onGetStarted(); // Update onboarding step in App.js
    navigate('/profile-setup'); // Ensure this is the correct route to ProfileSetup
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the authentication token
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to YU-ERP</h1>
        <p>Let's start setting up your profile and customize your experience.</p>
        <div className="welcome-buttons">
          <button className="btn get-started-btn" onClick={handleGetStarted}>Get Started</button>
          <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
