import React, { useState } from 'react';
import { FaTwitter, FaFacebookF } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import loginImage from '../assets/login-image.png'; // Adjust the path if needed

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2e035f] to-[#0e034b] px-4 pt-24">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={loginImage}
            alt="Register"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center text-purple-600 mb-2">Register</h2>
          <p className="text-sm text-gray-600 text-center mb-6">Create your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-center">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-center">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-center">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-sm text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:underline font-medium">Login</Link>
          </p>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative z-10 bg-white px-2 text-xs text-gray-500 text-center">
              or Connect with Social Media
            </div>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-md text-sm font-medium text-[#1DA1F2] bg-white hover:shadow-md hover:-translate-y-0.5 transition-all">
              <FaTwitter /> Sign up With Twitter
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-md text-sm font-medium text-[#4267B2] bg-white hover:shadow-md hover:-translate-y-0.5 transition-all">
              <FaFacebookF /> Sign up With Facebook
            </button>
          </div>

          <footer className="mt-6 text-xs text-gray-400 text-center">
            www.yoursite.com
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Register;
