// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const StockCard = () => {
//   const { symbol } = useParams();
//   const [stock, setStock] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate(); // Initialize the useNavigate hook

//   useEffect(() => {
//     const fetchStockDetails = async () => {
//       try {
//         const res = await axios.post('http://localhost:5000/api/tiingo/stocks', {
//           symbols: [symbol]
//         });
//         setStock(res.data.data[0]); // Assuming this data contains symbol and name
//       } catch (err) {
//         setError('Failed to load stock details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStockDetails();
//   }, [symbol]);

//   if (loading) return <div className="pt-24 p-4 text-white">Loading...</div>;
//   if (error) return <div className="pt-24 p-4 text-red-500">{error}</div>;
//   if (!stock) return <div className="pt-24 p-4 text-white">Stock not found.</div>;

//   // Navigate to Trade page with symbol as a URL parameter
//   const handleTradeNavigation = (action) => {
//     navigate(`/trade/${action}/${symbol}`);
//   };
//   const handlePredictNavigation = () => {
//     navigate(`/predict/${symbol}`);

//   };
  
//   return (
//     <div className="pt-24 p-4 text-white bg-purple-900 min-h-screen px-64">
//       <h1 className="text-4xl font-bold mb-6">
//         {stock.name} ({stock.symbol}) Details
//       </h1>
//       <div className="bg-purple-950 rounded-lg p-6 shadow-lg">
//         <div className="grid grid-cols-2 gap-4 text-lg">
//           <p><strong>Open:</strong> ${stock.open}</p>
//           <p><strong>Close:</strong> ${stock.close}</p>
//           <p><strong>High:</strong> ${stock.high}</p>
//           <p><strong>Low:</strong> ${stock.low}</p>
//           <p><strong>Volume:</strong> {stock.volume}</p>
//         </div>
//         {/* Buy and Sell Buttons */}
//         <div className="flex justify-between mt-6">
//           <button
//             onClick={() => handleTradeNavigation('buy')}
//             className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded text-white transition duration-300"
//           >
//             Buy
//           </button>
//           <button
//             onClick={handlePredictNavigation}
//             className="px-6 py-2 bg-amber-400 hover:bg-amber-400 rounded text-white transition duration-300"
//           >
//             Predict
//           </button>
//           <button
//             onClick={() => handleTradeNavigation('sell')}
//             className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded text-white transition duration-300"
//           >
//             Sell
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StockCard;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StockCard = () => {
  const { symbol } = useParams(); // Get symbol from URL
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const res = await axios.post('https://tradex-node.onrender.com/api/tiingo/stocks', {
          symbols: [symbol]
        });
        setStock(res.data.data[0]); // Assuming this data contains symbol and name
      } catch (err) {
        setError('Failed to load stock details');
      } finally {
        setLoading(false);
      }
    };

    fetchStockDetails();
  }, [symbol]);

  if (loading) return <div className="pt-24 p-4 text-white">Loading...</div>;
  if (error) return <div className="pt-24 p-4 text-red-500">{error}</div>;
  if (!stock) return <div className="pt-24 p-4 text-white">Stock not found.</div>;

  // Navigate to Trade page with symbol as a URL parameter
  const handleTradeNavigation = (action) => {
    navigate(`/trade/${action}/${symbol}`);
  };

  // Navigate to Prediction page with symbol as a URL parameter
  const handlePredictNavigation = () => {
    navigate(`/predict/${symbol}`);
  };

  return (
    <div className="pt-24 p-4 text-white bg-purple-900 min-h-screen px-64">
      <h1 className="text-4xl font-bold mb-6">
        {stock.name} ({stock.symbol}) Details
      </h1>
      <div className="bg-purple-950 rounded-lg p-6 shadow-lg">
        <div className="grid grid-cols-2 gap-4 text-lg">
          <p><strong>Open:</strong> ${stock.open}</p>
          <p><strong>Close:</strong> ${stock.close}</p>
          <p><strong>High:</strong> ${stock.high}</p>
          <p><strong>Low:</strong> ${stock.low}</p>
          <p><strong>Volume:</strong> {stock.volume}</p>
        </div>
        {/* Buy, Predict and Sell Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => handleTradeNavigation('buy')}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded text-white transition duration-300"
          >
            Buy
          </button>
          <button
            onClick={handlePredictNavigation}
            className="px-6 py-2 bg-amber-400 hover:bg-amber-400 rounded text-white transition duration-300"
          >
            Predict
          </button>
          <button
            onClick={() => handleTradeNavigation('sell')}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded text-white transition duration-300"
          >
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
