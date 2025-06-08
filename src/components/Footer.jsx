import React from 'react';
import { FaDiscord, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0e034b] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">

          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-fuchsia-400 mb-4">Tradex</h2>
            <p className="text-gray-300">
              Empowering traders with fair, fast, and flexible funding. Join us to scale your profits without the pressure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-fuchsia-300 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-fuchsia-400">Home</a></li>
              <li><a href="/how-it-works" className="hover:text-fuchsia-400">How It Works</a></li>
              <li><a href="/client-stories" className="hover:text-fuchsia-400">Client Stories</a></li>
              <li><a href="/process" className="hover:text-fuchsia-400">Process</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-fuchsia-300 font-semibold mb-4">Contact</h3>
            <p>Email: <a href="mailto:support@proppulse.com" className="hover:text-fuchsia-400">support@tradex.com</a></p>
            <p>Discord: <a href="#" className="hover:text-fuchsia-400">Join Now</a></p>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-fuchsia-300 font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-fuchsia-400"><FaDiscord /></a>
              <a href="#" className="hover:text-fuchsia-400"><FaTwitter /></a>
              <a href="mailto:support@proppulse.com" className="hover:text-fuchsia-400"><FaEnvelope /></a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-white/20" />

        <div className="text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} PropPulse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
