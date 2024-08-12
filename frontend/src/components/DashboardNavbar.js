// /Users/belmin/Desktop/yu-erp/frontend/src/components/DashboardNavbar.js

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './DashboardNavbar.css'; // Uključi stilove

const DashboardNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout clicked'); // Proveri da li se ovo ispisuje u konzoli
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <nav>
      <h2>YU-ERP</h2>
      <ul>
        <li><Link to="/main">Main Page</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li>
          <Link
            to="/"
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardNavbar;
