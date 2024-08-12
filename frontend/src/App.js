// /Users/belmin/Desktop/yu-erp/frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardNavbar from './components/DashboardNavbar';
import Home from './pages/Home';
import Products from './pages/Products';
import AboutUs from './pages/AboutUs';
import Resources from './pages/Resources';
import Partners from './pages/Partners';
import Login from './pages/Login';
import Register from './pages/Register';
import MainPage from './pages/MainPage';
import Settings from './pages/Settings';

function App() {
  const isLoggedIn = !!localStorage.getItem('authToken');

  return (
    <Router>
      {isLoggedIn ? <DashboardNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isLoggedIn && (
          <>
            <Route path="/main" element={<MainPage />} />
            <Route path="/settings" element={<Settings />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
