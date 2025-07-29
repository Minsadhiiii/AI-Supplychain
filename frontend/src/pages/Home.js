import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">AI-Powered Supply Chain Optimization</h1>
      <p className="home-subtitle">
        Predict demand, reduce food waste, and optimize distribution with smart AI insights.
      </p>

      <div className="home-buttons">
        <Link to="/login">
          <button className="home-button blue">Admin Login</button>
        </Link>
        <Link to="/dashboard">
          <button className="home-button gray">View Dashboard</button>
        </Link>
        <Link to="/reports">
          <button className="home-button green">AI Predictions</button>
        </Link>
      </div>

      <div className="cards-container">
        <div className="card">
          <h2 className="card-title">Total Stock</h2>
          <p className="card-value blue">12,340 Units</p>
        </div>
        <div className="card">
          <h2 className="card-title">Predicted Demand</h2>
          <p className="card-value green">+18% Next Week</p>
        </div>
        <div className="card">
          <h2 className="card-title">Wastage Rate</h2>
          <p className="card-value red">2.5%</p>
        </div>
      </div>
    </div>
  );
}

export default Home;