// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Wallet = () => {
//   const [balance, setBalance] = useState(0);
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/auth/profile', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored
//           },
//         });
        

//         const data = response.data.user;
//         setBalance(data.balance || 0);
//         setTransactions(
//           (data.transactions || []).map((tx, idx) => ({
//             id: idx + 1,
//             type: tx.type === 'buy' ? 'Deposit' : 'Withdrawal', // Mapping for UI clarity
//             amount: tx.price * tx.quantity,
//             date: new Date(tx.date).toLocaleDateString(),
//           }))
//         );
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2e2e50] text-white px-5 py-10 mt-16">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-4xl font-bold mb-8 text-center">My Wallet</h1>

//         {/* Balance */}
//         <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center mb-10 shadow-lg">
//           <h2 className="text-2xl font-semibold mb-2">Wallet Balance</h2>
//           <p className="text-4xl font-bold text-green-400">${balance.toLocaleString()}</p>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
//           <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg shadow-md transition">
//             Deposit
//           </button>
//           <button className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg shadow-md transition">
//             Withdraw
//           </button>
//           <button className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg shadow-md transition">
//             View Reports
//           </button>
//         </div>

//         {/* Transaction History */}
//         <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
//           <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
//           <ul className="space-y-4">
//             {transactions.map((tx) => (
//               <li key={tx.id} className="flex justify-between border-b border-white/10 pb-2">
//                 <span>{tx.type}</span>
//                 <span className={tx.type === 'Withdrawal' ? 'text-red-400' : 'text-green-400'}>
//                   ${tx.amount.toFixed(2)}
//                 </span>
//                 <span className="text-gray-300 text-sm">{tx.date}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Wallet;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showDepositInput, setShowDepositInput] = useState(false);
  const [showWithdrawInput, setShowWithdrawInput] = useState(false);
  const [showReports, setShowReports] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://tradex-node.onrender.com/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = response.data.user;
        setBalance(data.balance || 0);
        setTransactions(
          (data.transactions || []).map((tx, idx) => ({
            id: idx + 1,
            type: tx.type === 'deposit' ? 'Deposit' : tx.type === 'withdrawal' ? 'Withdrawal' : tx.type,
            amount: tx.amount || tx.price * tx.quantity,
            date: new Date(tx.date).toLocaleDateString(),
          }))
        );
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);
  const handleDeposit = async () => {
    if (depositAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
  
    try {
      const response = await axios.post(
        'https://tradex-node.onrender.com/api/auth/update-balance',
        {
          amount: parseFloat(depositAmount),
          type: 'deposit',
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      setBalance(response.data.balance);
      setTransactions([
        ...transactions,
        {
          id: transactions.length + 1,
          type: 'Deposit',
          amount: parseFloat(depositAmount),
          date: new Date().toLocaleDateString(),
        },
      ]);
      setDepositAmount('');
      setShowDepositInput(false);
    } catch (error) {
      console.error('Error handling deposit:', error);
      alert('There was an error processing your deposit. Please try again.');
    }
  };
  

  const handleWithdraw = async () => {
    if (withdrawAmount <= 0 || withdrawAmount > balance) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      await axios.post(
        'https://tradex-node.onrender.com/api/auth/update-balance',
        {
          amount: withdrawAmount,
          type: 'withdrawal',
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const newBalance = balance - parseFloat(withdrawAmount);
      setBalance(newBalance);
      setTransactions([
        ...transactions,
        {
          id: transactions.length + 1,
          type: 'Withdrawal',
          amount: parseFloat(withdrawAmount),
          date: new Date().toLocaleDateString(),
        },
      ]);
      setWithdrawAmount('');
      setShowWithdrawInput(false);
    } catch (error) {
      console.error('Error handling withdrawal:', error);
      alert('There was an error processing your withdrawal. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2e2e50] text-white px-5 py-10 mt-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">My Wallet</h1>

        {/* Balance */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center mb-10 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Wallet Balance</h2>
          <p className="text-4xl font-bold text-green-400">${balance.toLocaleString()}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg shadow-md transition"
            onClick={() => setShowDepositInput(true)}
          >
            Deposit
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg shadow-md transition"
            onClick={() => setShowWithdrawInput(true)}
          >
            Withdraw
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg shadow-md transition"
            onClick={() => setShowReports(!showReports)}
          >
            {showReports ? 'Hide Reports' : 'View Reports'}
          </button>
        </div>

        {/* Deposit Input */}
        {showDepositInput && (
          <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg mb-10">
            <h3 className="text-xl font-semibold mb-4">Deposit Amount</h3>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="bg-white/20 text-white p-2 rounded-lg mb-4 w-full"
              placeholder="Enter deposit amount"
            />
            <button
              onClick={handleDeposit}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-md transition w-full"
            >
              Confirm Deposit
            </button>
            <button
              onClick={() => setShowDepositInput(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg shadow-md transition mt-2 w-full"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Withdraw Input */}
        {showWithdrawInput && (
          <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg mb-10">
            <h3 className="text-xl font-semibold mb-4">Withdraw Amount</h3>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="bg-white/20 text-white p-2 rounded-lg mb-4 w-full"
              placeholder="Enter withdraw amount"
            />
            <button
              onClick={handleWithdraw}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg shadow-md transition w-full"
            >
              Confirm Withdrawal
            </button>
            <button
              onClick={() => setShowWithdrawInput(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg shadow-md transition mt-2 w-full"
            >
              Cancel
            </button>
          </div>
        )}
        {/* Transaction History */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
          <ul className="space-y-4">
          {transactions
              .slice(-5)             // get the last 5 transactions
              .slice()               // create a shallow copy
              .reverse()             // reverse for newest first
              .map((tx) => (
                <li key={tx.id} className="flex justify-between border-b border-white/10 pb-2">
                  <span>{tx.type}</span>
                  <span className={tx.type === 'Withdrawal' ? 'text-red-400' : 'text-green-400'}>
                    ${tx.amount.toFixed(2)}
                  </span>
                  <span className="text-gray-300 text-sm">{tx.date}</span>
                </li>
            ))}
          </ul>
        </div>
        {showReports && (
          <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">All Deposits & Withdrawals</h3>
            <ul className="space-y-4 max-h-96 overflow-y-auto">
              {[...transactions]
                .reverse()
                .map((tx) => (
                  <li key={tx.id} className="flex justify-between border-b border-white/10 pb-2">
                    <span>{tx.type}</span>
                    <span className={tx.type === 'Withdrawal' ? 'text-red-400' : 'text-green-400'}>
                      ${tx.amount.toFixed(2)}
                    </span>
                    <span className="text-gray-300 text-sm">{tx.date}</span>
                  </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default Wallet;
