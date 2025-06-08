// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import StockCard from '../components/StockCard';
import { getStocks } from '../utils/api'; // Example API call function

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      const stockData = await getStocks(); // Fetch stocks from the backend
      setStocks(stockData);
    };

    fetchStocks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {stocks.map((stock) => (
        <StockCard key={stock.symbol} stock={stock} />
      ))}
    </div>
  );
};

export default Dashboard;
