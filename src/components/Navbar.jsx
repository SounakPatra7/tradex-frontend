import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // ✅ make sure the path is correct

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // ✅ get user and logout from context

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#2a0368] to-[#26075f] shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-white">💰 Funded Traders</div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-[#26075f] text-white px-4 py-4 md:py-0 md:bg-transparent md:static md:flex md:items-center md:gap-6 md:w-auto`}
        >
          <Link to="/" className="block py-2 md:py-0 hover:text-[#ff33cc] transition-colors">Home</Link>
          <Link to="/trade" className="block py-2 md:py-0 hover:text-[#ff33cc] transition-colors">Trade</Link>
          <Link to="/history" className="block py-2 md:py-0 hover:text-[#ff33cc] transition-colors">History</Link>
          <Link to="/register" className="block py-2 md:py-0 hover:text-[#ff33cc] transition-colors">Register</Link>
          <Link to="/stocks" className="block py-2 md:py-0 hover:text-[#ff33cc] transition-colors">Stocks</Link>

          {/* Show Login or Logout depending on user */}
          {!user ? (
            <Link
              to="/login"
              className="mt-2 md:mt-0 md:ml-4 px-4 py-2 bg-[#8e2de2] text-white rounded transition-all duration-500 hover:bg-[#6a1bb1] hover:-translate-y-0.5 hover:shadow-md text-center"
            >
              Log in
            </Link>
          ) : (
            <button
              onClick={logout}
              className="mt-2 md:mt-0 md:ml-4 px-4 py-2 bg-red-600 text-white rounded transition-all duration-500 hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-md"
            >
              Log out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
