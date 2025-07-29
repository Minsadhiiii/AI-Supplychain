import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Prediction.css';

const categories = ['Beverage', 'Icecream', 'Meat'];

const products = {
  Beverage: ['Tea', 'Coffee', 'Fruit Juice', 'Soft Drink', 'Water'],
  Icecream: ['Vanilla', 'Chocolate', 'Strawberry', 'Mango', 'Coconut'],
  Meat: ['Chicken', 'Beef', 'Pork', 'Fish', 'Mutton'],
};

const sizes = {
  Beverage: ['250ml', '500ml', '1L', '1.5L', '2L'],
  Icecream: ['100ml', '200ml', '500ml', '1L'],
  Meat: ['250g', '500g', '1kg', '2kg'],
};

const regions = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
  "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
  "Monaragala", "Ratnapura", "Kegalle"
];

const months = Array.from({ length: 12 }, (_, i) => i + 1);

function Prediction() {
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');
  const [size, setSize] = useState('');
  const [region, setRegion] = useState('');
  const [month, setMonth] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [currentStock, setCurrentStock] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setProduct('');
    setSize('');
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!category || !product || !size || !region || !month || !unitPrice || !currentStock) {
      setError('Please fill all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/predict', {
        Category: category,
        Product: product,
        Size: size,
        Region: region,
        Month: parseInt(month),
        Unit_Price_LKR: parseFloat(unitPrice),
        Current_Stock: parseInt(currentStock),
      });

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="prediction-container">
      <h2>Sales Quantity & Demand Prediction</h2>
      <form onSubmit={handleSubmit} className="prediction-form">

        <label>Category</label>
        <select value={category} onChange={e => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <label>Product</label>
        <select value={product} onChange={e => setProduct(e.target.value)} required disabled={!category}>
          <option value="">Select Product</option>
          {category && products[category].map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        <label>Size</label>
        <select value={size} onChange={e => setSize(e.target.value)} required disabled={!category}>
          <option value="">Select Size</option>
          {category && sizes[category].map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <label>Region</label>
        <select value={region} onChange={e => setRegion(e.target.value)} required>
          <option value="">Select Region</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <label>Month</label>
        <select value={month} onChange={e => setMonth(e.target.value)} required>
          <option value="">Select Month</option>
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <label>Unit Price (LKR)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={unitPrice}
          onChange={e => setUnitPrice(e.target.value)}
          required
        />

        <label>Current Stock</label>
        <input
          type="number"
          min="0"
          value={currentStock}
          onChange={e => setCurrentStock(e.target.value)}
          required
        />

        <button type="submit">Predict</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && !result.error && (
        <div className="result">
          <h3>Prediction Results:</h3>
          <p><b>Predicted Quantity:</b> {result.predicted_quantity}</p>
          <p><b>Demand Level:</b> {result.demand_level}</p>
          <p>
            <b>Overstock Risk:</b>{' '}
            <b className={result.overstock_risk ? "overstock-risk-yes" : "overstock-risk-no"}>
              {result.overstock_risk ? "Yes" : "No"}
            </b>
          </p>
          <p>
            <b>Shortage Risk:</b>{' '}
            <b className={result.shortage_risk ? "shortage-risk-yes" : "shortage-risk-no"}>
              {result.shortage_risk ? "Yes" : "No"}
            </b>
          </p>
          <p><b>Adjustment:</b> {result.adjustment}</p>
          <p><b>Suggested Action:</b> {result.action}</p>
        </div>
      )}

      {result && result.error && <p className="error">{result.error}</p>}
    </div>
  );
}

export default Prediction;
