import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import AboutUs from './pages/AboutUs';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import WelcomePage from './pages/WelcomePage';
import ProfileSetup from './pages/ProfileSetup';
import ModuleSelection from './pages/ModuleSelection';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(true);
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState('welcome'); // Track onboarding step
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      fetch('http://localhost:5001/api/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to authenticate');
          }
          return res.json();
        })
        .then(data => {
          setIsAuthenticated(true);
          setIsOnboardingCompleted(data.onboardingCompleted);
          setIsLoading(false);

          // Set the initial onboarding step based on completion status
          if (!data.onboardingCompleted) {
            setCurrentOnboardingStep('welcome');
            navigate('/welcome');
          }
        })
        .catch(err => {
          console.error(err);
          setIsAuthenticated(false);
          setIsLoading(false);
        });
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Pass both isAuthenticated and currentOnboardingStep to Navbar */}
      <Navbar isAuthenticated={isAuthenticated} isOnboarding={!isOnboardingCompleted} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Onboarding Routes */}
        {isAuthenticated && currentOnboardingStep === 'welcome' && (
          <Route
            path="/welcome"
            element={<WelcomePage onGetStarted={() => setCurrentOnboardingStep('profile-setup')} />}
          />
        )}
        {isAuthenticated && currentOnboardingStep === 'profile-setup' && (
          <Route
            path="/profile-setup"
            element={<ProfileSetup onProfileComplete={() => setCurrentOnboardingStep('module-selection')} />}
          />
        )}
        {isAuthenticated && currentOnboardingStep === 'module-selection' && (
          <Route
            path="/module-selection"
            element={<ModuleSelection onCompleteOnboarding={() => {
              setCurrentOnboardingStep('');
              setIsOnboardingCompleted(true); // Mark onboarding as complete
              navigate('/dashboard'); // Navigate to dashboard after onboarding
            }} />}
          />
        )}

        {/* Dashboard Route */}
        {isAuthenticated && isOnboardingCompleted && currentOnboardingStep === '' && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}

        {!isAuthenticated && <Route path="*" element={<Login />} />}
      </Routes>
    </>
  );
}

export default App;
