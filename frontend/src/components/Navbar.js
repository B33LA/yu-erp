import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Assuming your CSS file is named Navbar.css

const Navbar = ({ isAuthenticated, isOnboarding }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  // Hide the navbar entirely if the user has completed onboarding
  if (isAuthenticated && !isOnboarding) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">YU-ERP</Link>
      </div>
      <ul className="navbar-links">
        {/* Display these links only if the user is not authenticated */}
        {!isAuthenticated && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
          </>
        )}
      </ul>
      <div className="navbar-buttons">
        {isAuthenticated ? (
          isOnboarding ? (
            // Show only the Logout button during onboarding
            <button className="btn login-btn" onClick={handleLogout}>Logout</button>
          ) : null
        ) : (
          <>
            <Link to="/login" className="btn login-btn">Login</Link>
            <Link to="/register" className="btn register-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
