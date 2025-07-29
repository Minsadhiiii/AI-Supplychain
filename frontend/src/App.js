import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegionView from './pages/RegionView';
import ProductManagement from './pages/ProductManagement';
import Reports from './pages/Reports';
import Setting from './pages/Setting';
import NoFound from './pages/NoFound';
import Prediction from './pages/Prediction';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/regions" element={<RegionView />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/NoFound" element={<NoFound />} />
            <Route path="/prediction" element={<Prediction />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;