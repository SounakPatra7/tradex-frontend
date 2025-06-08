import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LogoImage from "../assets/logo.avif";
import axios from "axios";

const PrivateNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState(null); // Store profile data here
  const dropdownRef = useRef(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      // Fetch profile data from the server when user is available
      const fetchProfileData = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/auth/profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setProfile(response.data.user); // Set profile data
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };

      fetchProfileData();
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!profile) {
    return (
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#2a0368] to-[#26075f] shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center gap-2 text-white text-xl font-bold">
            <span>TradeX</span>
            <img
              src={LogoImage}
              alt="Logo"
              className="w-8 h-8 object-contain transform rotate-90"
            />
          </Link>
          {/* Loading indicator */}
          <div className="text-white">Loading...</div>
        </div>
      </header>
    );
  }

  const imageUrl = profile?.image
    ? `http://localhost:5000/api/auth/uploads/${profile.image.replace(/\\/g, "/")}`
    : "/default-profile.jpg";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#2a0368] to-[#26075f] shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center gap-2 text-white text-xl font-bold">
          <span>TradeX</span>
          <img
            src={LogoImage}
            alt="Logo"
            className="w-8 h-8 object-contain transform rotate-90"
          />
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-[#26075f] text-white px-4 py-4 md:py-0 md:bg-transparent md:static md:flex md:items-center md:gap-6 md:w-auto`}
        >
          <Link to="/" className="block py-2 hover:text-[#ff33cc]">Home</Link>
          <Link to="/history" className="block py-2 hover:text-[#ff33cc]">History</Link>
          <Link to="/stocks" className="block py-2 hover:text-[#ff33cc]">Stocks</Link>

          {/* Profile Dropdown */}
          <div className="relative ml-4" ref={dropdownRef}>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="cursor-pointer flex items-center gap-2 py-2"
            >
              <img
                src={imageUrl}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-white"
                onError={(e) => (e.target.src = "/default-profile.jpg")}
              />
              <span className="text-sm font-medium">
                {profile?.name || "User"}
              </span>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-20 text-gray-800">
                <Link
                  to="/edit-profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Edit Profile
                </Link>
                <Link
                  to="/wallet"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Wallet
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default PrivateNavbar;
