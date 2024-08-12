import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="main-page-container">
      <h1>Welcome to YU-ERP</h1>
      <p>Select a module to get started:</p>
      <div className="module-links">
        <Link to="/module1">Module 1</Link>
        <Link to="/module2">Module 2</Link>
        <Link to="/module3">Module 3</Link>
        {/* Dodaj više modula po potrebi */}
      </div>
    </div>
  );
}

export default MainPage;
