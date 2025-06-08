// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tradex-node.onrender.com/api', // Adjust to your backend URL
});

export const loginUser = async (data) => {
  const response = await api.post('/login', data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await api.post('/register', data);
  return response.data;
};

export const getStocks = async () => {
  const response = await api.get('/stocks');
  return response.data;
};

export const buyStock = async (data) => {
  const response = await api.post('/portfolio/buy', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const sellStock = async (data) => {
  const response = await api.post('/portfolio/sell', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  
  return response.data;
};


export const getTradeHistory = async () => {
  const response = await api.get('/history');
  return response.data;
};
export const getStockDetails = async (symbol) => {
  try {
    const response = await axios.get(`https://tradex-node.onrender.com/api/tiingo/stock/${symbol}`);

    // Adjust below depending on what `response.data` actually contains
    const stock = response.data.data;

    return {
      name: stock.name,
      symbol: stock.symbol,
      price: stock.close,
      volume: stock.volume,
    };
  } catch (error) {
    console.error('Error fetching stock details', error);
    throw error;
  }
};



export const getUserStockQuantity = async (symbol) => {
  const res = await fetch(`https://tradex-node.onrender.com/api/portfolio/${symbol}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}` // Make sure the token is stored in localStorage after login
    }
  });
  const data = await res.json();
  return data.quantity || 0;
};
