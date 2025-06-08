
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;

const StockData = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [symbols, setSymbols] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const fetchStocks = async () => {
    if (symbols.length > 0) {
      try {
        const res = await axios.post('https://tradex-node.onrender.com/api/tiingo/stocks', { symbols });
        setStocks(res.data.data || []); // Assuming backend responds with `data: [{...}]`
      } catch (err) {
        setError('Failed to fetch stock data');
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const res = await axios.get('https://tradex-node.onrender.com/api/tiingo/stocks/symbols');
        const extractedSymbols = res.data.stocks.map(stock => stock.symbol);
        setSymbols(extractedSymbols);
      } catch (err) {
        console.error("Error fetching symbols:", err);
        setError('Failed to fetch stock symbols');
        setLoading(false);
      }
    };

    fetchSymbols();
  }, []);

  useEffect(() => {
    if (symbols.length > 0) {
      fetchStocks();
    }
  }, [symbols]);

  const filteredStocks = stocks.filter((stock) =>
    stock.symbol?.toUpperCase().includes(searchTerm)
  );

  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentStocks = filteredStocks.slice(indexOfFirst, indexOfLast);

  const handleStockClick = (symbol) => {
    navigate(`/stock/${symbol}`);
  };

  return (
    <div className="bg-purple-800 px-4 sm:px-6 md:px-16 lg:px-32 xl:px-64 py-4 pt-24 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Search bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center mb-6 gap-2">
          <input
            type="text"
            onChange={(e) => {
              setSearchTerm(e.target.value.toUpperCase());
              setCurrentPage(1);
            }}
            className="px-2 py-2 text-black rounded w-full"
            placeholder="Search a stock symbol"
          />
          <button
            onClick={() => setCurrentPage(1)}
            className="px-4 py-2 bg-fuchsia-950 text-white rounded hover:bg-fuchsia-800 transition"
          >
            Search
          </button>
        </div>
  
        {/* Loading and error states */}
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
  
        {/* Stock cards */}
        {filteredStocks.length > 0 ? (
          <div className="space-y-6">
            {currentStocks.map((stock, index) => (
              <div
                key={index}
                onClick={() => handleStockClick(stock.symbol)}
                className="cursor-pointer bg-purple-950 rounded-lg  sm:px-6 lg:px-32 xl:py-6 shadow-md transform transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-yellow-400 text-transparent bg-clip-text">
                  {stock.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <p><strong>Open:</strong> ${stock.open}</p>
                  <p><strong>Close:</strong> ${stock.close}</p>
                  <p><strong>High:</strong> ${stock.high}</p>
                  <p><strong>Low:</strong> ${stock.low}</p>
                  <p><strong>Volume:</strong> {stock.volume}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p>No stock data available</p>
        )}
  
        {/* Pagination controls */}
        {filteredStocks.length > ITEMS_PER_PAGE && (
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="self-center">
              Page {currentPage} of {Math.ceil(filteredStocks.length / ITEMS_PER_PAGE)}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(filteredStocks.length / ITEMS_PER_PAGE))
                )
              }
              disabled={currentPage === Math.ceil(filteredStocks.length / ITEMS_PER_PAGE)}
              className="px-4 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default StockData;
