
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { buyStock, sellStock, getStockDetails, getUserStockQuantity } from '../utils/api';

const Trade = () => {
  const { action, symbol } = useParams();
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [stockDetails, setStockDetails] = useState(null);
  const [userQuantity, setUserQuantity] = useState(0);

  useEffect(() => {
    const fetchStockDetails = async () => {
      if (symbol) {
        try {
          const data = await getStockDetails(symbol);
          setStockDetails(data);
          setPrice(data.close); // Set initial price using 'close'
        } catch (err) {
          console.error('Error fetching stock details:', err);
        }
      }
    };
  
    const fetchUserStockQuantity = async () => {
      if (symbol) {
        const quantity = await getUserStockQuantity(symbol);
        setUserQuantity(quantity || 0);
      }
    };
  
    fetchStockDetails();
    fetchUserStockQuantity();
  }, [symbol]);
  
  // Update quantity based on the price entered
  const handlePriceChange = (e) => {
    const enteredPrice = e.target.value;
    setPrice(enteredPrice);

    if (enteredPrice && stockDetails) {
      const calculatedQuantity = (enteredPrice / stockDetails.price).toFixed(2); // Use 'close' here
      // Prevent invalid quantity values
      if (!isNaN(calculatedQuantity) && calculatedQuantity !== 'Infinity' && calculatedQuantity !== 'NaN') {
        setQuantity(calculatedQuantity);
      }
    }
  };

  // Update price based on the quantity entered
  const handleQuantityChange = (e) => {
    const enteredQuantity = e.target.value;
    setQuantity(enteredQuantity);

    if (enteredQuantity && stockDetails) {
      const calculatedPrice = (enteredQuantity * stockDetails.price).toFixed(2); // Use 'close' here
      // Prevent invalid price values
      if (!isNaN(calculatedPrice) && calculatedPrice !== 'Infinity' && calculatedPrice !== 'NaN') {
        setPrice(calculatedPrice);
      }
    }
  };

  // const handleTrade = async () => {
  //   // Check for sell action and if user has enough stock
  //   if (action === 'sell' && userQuantity < quantity) {
  //     alert('You do not have enough stock to sell. Your current stock quantity is ' + userQuantity);
  //     return;
  //   }

  //   try {
  //     if (action === 'buy') {
  //       console.log("Buying stock with:", { symbol, quantity, price });

  //       await buyStock({ symbol,
  //         quantity: parseFloat(quantity),
  //         price: parseFloat(price) });
  //       alert('Stock bought successfully');
  //     } else if (action === 'sell') {
  //       await sellStock({ symbol, quantity, price });
  //       alert('Stock sold successfully');
  //     }
  //   } catch (err) {
  //     console.error('Trade failed:', err);
  //     alert('Trade failed. See console for details.');
  //   }
  // };
  const handleTrade = async () => {
    if (action === 'sell' && userQuantity < quantity) {
      alert('You do not have enough stock to sell. Your current stock quantity is ' + userQuantity);
      return;
    }
  
    const tradeData = {
      symbol,
      quantity: parseFloat(quantity), // Ensure it's a valid number
      price: parseFloat(price) // Ensure it's a valid number
    };
  
    console.log("Sending trade data:", tradeData);  // Log the data
  
    try {
      if (action === 'buy') {
        await buyStock(tradeData);
        alert('Stock bought successfully');
      } else if (action === 'sell') {
        await sellStock(tradeData);
        alert('Stock sold successfully');
      }
    } catch (err) {
      console.error('Trade failed:', err);
      alert('Trade failed. See console for details.');
    }
  };
  
  
  return (
    <div className="bg-purple-800 p-4 text-white pt-24 min-h-screen px-64">
      <h2 className="text-3xl font-bold mb-6">
        {action === 'buy' ? 'Buy' : 'Sell'} Stock
      </h2>

      {stockDetails ? (
        <div className="bg-purple-700 p-4 rounded mb-6 space-y-2">
          <p><strong>Company:</strong> {stockDetails.name}</p>
          <p><strong>Symbol:</strong> {stockDetails.symbol}</p>
          <p><strong>Current Price:</strong> ${stockDetails.price}</p> {/* Use 'close' here */}
          {stockDetails.volume && (
            <p><strong>Volume:</strong> {stockDetails.volume.toLocaleString()}</p>
          )}
        </div>
      ) : (
        <p className="mb-6">Loading stock details...</p>
      )}

      <div className="bg-purple-700 p-4 rounded mb-6">
        <p><strong>Your Quantity:</strong> {userQuantity}</p>
      </div>

      <div className="space-y-4">
        <input
          type="number"
          value={quantity || ''}
          onChange={handleQuantityChange}
          placeholder="Enter Quantity"
          className="p-2 w-full text-black rounded"
          required
        />
        <input
          type="number"
          value={price || ''}
          onChange={handlePriceChange}
          placeholder="Enter Price"
          className="p-2 w-full text-black rounded"
          required
        />
        <div className="space-y-4">
          {action === 'buy' ? (
            <button
              onClick={handleTrade}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded text-white transition duration-300 w-full"
            >
              Buy Stock
            </button>
          ) : (
            <button
              onClick={handleTrade}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded text-white transition duration-300 w-full"
            >
              Sell Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trade;
