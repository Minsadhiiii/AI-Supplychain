import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar shadow-md">
      <div className="navbar-brand">SupplyChainAI</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/regions">Regions</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/setting">Setting</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;