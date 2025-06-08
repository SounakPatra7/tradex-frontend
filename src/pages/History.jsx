import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Fetch all transactions
        const response = await axios.get('https://tradex-node.onrender.com/api/auth/transactions', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        // Filter only buy and sell transactions
        const filteredTransactions = response.data.transactions.filter(
          (tx) => tx.type === 'buy' || tx.type === 'sell'
        );

        // Sort transactions by createdAt (newest first)
        const sortedTransactions = filteredTransactions.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Set transactions state
        setTransactions(sortedTransactions);

        // Set pagination state
        setTotalPages(Math.ceil(sortedTransactions.length / transactionsPerPage));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentTransactions = transactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate instanceof Date && !isNaN(formattedDate)
      ? formattedDate.toLocaleDateString()
      : 'Invalid date';
  };

  const formatPrice = (price) => {
    return price.toFixed(2); // Limiting price to 2 decimal places
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2e2e50] text-white px-5 py-10 mt-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Transaction History</h1>

        {/* All Transactions */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg mb-10">
          <h3 className="text-xl font-semibold mb-4">Transactions</h3>
          <ul className="space-y-4">
            {currentTransactions.length > 0 ? (
              currentTransactions.map((tx) => (
                <li key={tx._id} className="flex flex-wrap justify-between border-b border-white/10 pb-2">
                  <span className="w-full sm:w-auto sm:mr-2">{tx.type === 'buy' ? 'Buy' : 'Sell'}</span>
                  <span
                    className={`${
                      tx.type === 'buy' ? 'text-green-400' : 'text-red-400'
                    } w-full sm:w-auto sm:mr-2`}
                  >
                    ${formatPrice(tx.price * tx.quantity)} {/* Display price with two decimals */}
                  </span>
                  <span className="text-gray-300 text-sm w-full sm:w-auto sm:mr-2">{formatDate(tx.createdAt)}</span>
                  <span className="text-white w-full sm:w-auto sm:mr-2">{tx.stock}</span> {/* Display Stock Symbol */}
                  <span className="text-white w-full sm:w-auto">{tx.quantity}</span> {/* Display Quantity */}
                </li>
              ))
            ) : (
              <li>No buy or sell transactions found</li>
            )}
          </ul>
        </div>

        {/* Pagination */}
        <div className="flex justify-center space-x-4">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
            >
              Previous
            </button>
          )}
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
