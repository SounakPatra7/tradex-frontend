// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import formImage from '../assets/form-bg.avif';
// import { useParams } from 'react-router-dom';
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// function StockPredictor() {
//   const { symbol: incomingSymbol } = useParams();
//   const [symbol, setSymbol] = useState(incomingSymbol);
//   const [numDays, setNumDays] = useState(5);
//   const [predictions, setPredictions] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const predictStock = async () => {
//     setLoading(true);
//     setError('');
//     setPredictions({});

//     try {
//       const res = await fetch('http://127.0.0.1:5000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ symbol, num_days: numDays }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setPredictions(data);
//       } else {
//         setError(data.error || 'Prediction failed');
//       }
//     } catch (err) {
//       setError('Server not reachable');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Prepare chart data
//   const chartData = {
//     labels: Object.keys(predictions),
//     datasets: [
//       {
//         label: 'Predicted Price',
//         data: Object.values(predictions),
//         borderColor: '#6366f1',
//         backgroundColor: 'rgba(99, 102, 241, 0.2)',
//         tension: 0.4,
//       },
//     ],
//   };

//   // Prepare price color logic
//   const priceList = Object.entries(predictions).map(([date, price], index, arr) => {
//     const prevPrice = arr[index - 1] ? arr[index - 1][1] : null;
//     let color = 'text-gray-700'; // Default color

//     if (prevPrice !== null) {
//       color = price > prevPrice ? 'text-green-500' : 'text-red-500';
//     }

//     return { date, price, color };
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center px-4 mt-16">
//       <div
//         className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 md:p-12 space-y-6"
//         style={{
//           backgroundImage: `url(${formImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
//           Stock Price Predictor
//         </h2>

//         {/* Stock Symbol Dropdown */}
//         <div>
//           <label className="block mb-2 text-lg font-semibold text-black">
//             Select Stock Symbol:
//           </label>
//           <select
//             value={symbol}
//             onChange={(e) => setSymbol(e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="AAPL">AAPL</option>
//             <option value="TSLA">TSLA</option>
//             <option value="MSFT">MSFT</option>
//             <option value="AMZN">AMZN</option>
//           </select>
//         </div>

//         {/* Number of Days Input */}
//         <div>
//           <label className="block mb-2 text-lg font-semibold text-black">
//             Number of Days:
//           </label>
//           <input
//             type="number"
//             min="1"
//             max="30"
//             value={numDays}
//             onChange={(e) => setNumDays(Number(e.target.value))}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Predict Button */}
//         <button
//           onClick={predictStock}
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-3 rounded-lg transition duration-300"
//           disabled={loading}
//         >
//           {loading ? 'Predicting...' : 'Predict Stock Prices'}
//         </button>

//         {/* Prediction Output */}
//         {Object.keys(predictions).length > 0 && (
//         <div className="mt-6 space-y-3">
//             <h3 className="text-xl font-semibold text-center text-gray-800">Predicted Prices:</h3>
//             <ul className="divide-y divide-gray-200">
//             {priceList.map(({ date, price, color }) => (
//                 <li key={date} className={`flex justify-between py-2 px-2 ${color}`}>
//                 <span className='font-bold'>{date}</span>
//                 <span className="font-bold">${price.toFixed(2)}</span> {/* Changed to font-bold */}
//                 </li>
//                 ))}
//             </ul>
//         </div>
// )}

//         {/* Chart */}
//         {Object.keys(predictions).length > 0 && (
//             <div className="mt-6">
//                 <h3 className="text-xl text-center text-black font-bold">Prediction Trend</h3>
//                 <div className="w-full h-64 sm:h-80 md:h-96">
//                 <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
//                 </div>
//             </div>
//             )}

//             {/* Error Message */}
//             {error && (
//             <div className="text-red-600 text-center mt-4 font-medium">
//                 Error: {error}
//             </div>
//             )}

//         </div>
//     </div>
// );
// }

// export default StockPredictor;
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import formImage from '../assets/form-bg.avif';
import { useParams } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function StockPredictor() {
  const { symbol: incomingSymbol } = useParams();
  const [symbol, setSymbol] = useState(incomingSymbol);
  const [numDays, setNumDays] = useState(5);
  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const predictStock = async () => {
    setLoading(true);
    setError('');
    setPredictions({});

    try {
      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol, num_days: numDays }),
      });

      const data = await res.json();

      if (res.ok) {
        setPredictions(data);
      } else {
        setError(data.error || 'Prediction failed');
      }
    } catch (err) {
      setError('Server not reachable');
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: Object.keys(predictions),
    datasets: [
      {
        label: 'Predicted Price',
        data: Object.values(predictions),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const priceList = Object.entries(predictions).map(([date, price], index, arr) => {
    const prevPrice = arr[index - 1] ? arr[index - 1][1] : null;
    let color = 'text-gray-700';
    if (prevPrice !== null) {
      color = price > prevPrice ? 'text-green-500' : 'text-red-500';
    }
    return { date, price, color };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center px-4 mt-16">
      <div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 md:p-12 space-y-6"
        style={{
          backgroundImage: `url(${formImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
          Stock Price Predictor
        </h2>

        <div>
          <label className="block mb-2 text-lg font-semibold text-black">
            Stock Symbol:
          </label>
          <p className="text-lg font-semibold text-black">{symbol}</p>
        </div>

        <div>
          <label className="block mb-2 text-lg font-semibold text-black">
            Number of Days:
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={numDays}
            onChange={(e) => setNumDays(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={predictStock}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-3 rounded-lg transition duration-300"
          disabled={loading}
        >
          {loading ? 'Predicting...' : 'Predict Stock Prices'}
        </button>

        {Object.keys(predictions).length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-xl font-semibold text-center text-gray-800">Predicted Prices:</h3>
            <ul className="divide-y divide-gray-200">
              {priceList.map(({ date, price, color }) => (
                <li key={date} className={`flex justify-between py-2 px-2 ${color}`}>
                  <span className="font-bold">{date}</span>
                  <span className="font-bold">${price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {Object.keys(predictions).length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl text-center text-black font-bold">Prediction Trend</h3>
            <div className="w-full h-64 sm:h-80 md:h-96">
              <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-center mt-4 font-medium">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default StockPredictor;
