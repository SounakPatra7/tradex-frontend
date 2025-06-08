// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // import the context to check user status
import PublicNavbar from './components/PublicNavbar'; // Import PublicNavbar
import PrivateNavbar from './components/PrivateNavbar'; // Import PrivateNavbar
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Trade from './pages/Trade';
import TransactionHistory from './pages/History';
import Home from './pages/Home';
import StockData from './components/StockData';
import StockCard from './components/StockCard';
import EditProfile from './pages/EditProfile';
import Wallet from './pages/Wallet';
import StockPredictor from './pages/PredictionPage';


const App = () => {
  const { user } = useAuth(); // Get the user from context


  return (
    <Router>
      {/* Conditionally render navbar based on user status */}
      {user ? <PrivateNavbar /> : <PublicNavbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/history" element={<TransactionHistory />} />
        <Route path="/stocks" element={<StockData />} />
        <Route path="/stock/:symbol" element={<StockCard />} />
        <Route path="/trade/:action/:symbol" element={<Trade />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/wallet" element={<Wallet/>} />
        <Route path="/predict/:symbol" element={<StockPredictor/>} />
      </Routes>
    </Router>
  );
};

export default App;
