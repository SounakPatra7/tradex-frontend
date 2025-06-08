// components/PublicNavbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LogoImage from '../assets/logo.avif';

const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#2a0368] to-[#26075f] shadow-md py-4">
    <div className="container mx-auto px-4 flex justify-between items-center">
      
      {/* Title and Logo */}
      <div className="flex items-center gap-2">
        <div className="text-xl font-bold text-white">TradeX</div>
        {/* Rotated Logo */}
        <img
          src={LogoImage}
          alt="Logo"
          className="w-8 h-8 object-contain transform rotate-90"
        />
      </div>

      {/* Hamburger for mobile */}
      <div className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      {/* Navigation */}
      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-[#26075f] text-white px-4 py-4 md:py-0 md:bg-transparent md:static md:flex md:items-center md:gap-6 md:w-auto`}
      >
        <Link to="/" className="block py-2 hover:text-[#ff33cc]">Home</Link>
        <Link to="/register" className="block py-2 hover:text-[#ff33cc]">Register</Link>
        <Link to="/login" className="block p-2 md:ml-4 px-4 py-2 bg-[#8e2de2] text-white rounded hover:bg-[#6a1bb1] text-center">
          Log in
        </Link>
      </nav>
    </div>
  </header>
  );
};

export default PublicNavbar;
