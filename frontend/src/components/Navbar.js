import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <h2>YU-ERP</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/partners">Partners</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
