import { useForm } from 'react-hook-form';
import { FaTwitter, FaFacebookF } from 'react-icons/fa';
import axios from 'axios';
import loginImage from '../assets/login-image.png'; // Use import for the image
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  
    try {
      const response = await axios.post('https://tradex-node.onrender.com/api/auth/login', data);
      const { token } = response.data;
      if (token) {
        alert('Login successful!');
        localStorage.setItem('token', token);
        navigate('/stocks');
      } else {
        alert('Login failed! No token received.');
      }
    } catch (error) {
      alert('Login failed!');
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2e035f] to-[#0e034b] px-4 pt-24">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg">
        {/* Form Section */}
        <div className="w-full max-w-md p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center text-purple-600 mb-2">Login </h2>
          </div>
  
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mb-6 w-full py-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-600 ml-1">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email format"
                  }
                })}
                className={`px-4 py-3 rounded-md border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all`}
              />
              {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>}
            </div>
  
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-600 ml-1">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required"
                  }
                })}
                className={`px-4 py-3 rounded-md border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all`}
              />
              {errors.password && <p className="text-red-500 text-xs ml-1">{errors.password.message}</p>}
            </div>
  
            <div className="flex justify-between items-center text-sm mt-[-8px]">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                <input type="checkbox" className="w-4 h-4 accent-purple-600" />
                Remember me
              </label>
              <a href="#" className="text-purple-600 font-medium hover:text-purple-800 hover:underline">Forgot password?</a>
            </div>
  
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-md font-medium text-base hover:shadow-md hover:-translate-y-0.5 transition-all mt-2"
            >
              SIGN IN
            </button>
          </form>
  
          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative z-10 bg-white px-2 text-xs text-gray-500">
              or Connect with Social Media
            </div>
          </div>
  
          {/* Social Buttons */}
          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-md text-sm font-medium text-[#1DA1F2] bg-white hover:shadow-md hover:-translate-y-0.5 transition-all">
              <FaTwitter /> Sign in With Twitter
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-md text-sm font-medium text-[#4267B2] bg-white hover:shadow-md hover:-translate-y-0.5 transition-all">
              <FaFacebookF /> Sign in With Facebook
            </button>
          </div>
  
          <footer className="mt-6 text-xs text-gray-400">
            www.yoursite.com
          </footer>
        </div>
  
        {/* Image Section */}
        <div className="w-full max-w-md bg-purple-100 rounded-tr-lg rounded-br-lg">
          <img
            src={loginImage} // Using the imported image
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-tr-lg rounded-br-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
