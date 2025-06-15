import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App'; // Ensure this path is correct
import { toast } from 'react-toastify'; // Make sure react-toastify is set up in App.js

/**
 * @typedef {Object} LoginProps
 * @property {function(string): void} setToken - A function to set the authentication token upon successful login.
 */

/**
 * The `Login` component provides an interface for administrative users to authenticate.
 * It handles email and password input, communicates with the backend for login,
 * and manages authentication state (token) within the application.
 *
 * @param {LoginProps} { setToken } - Props for the Login component.
 * @returns {JSX.Element} The Admin Login page component.
 */
const Login = ({ setToken }) => {
  // State to store email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State to manage loading status during API call
  const [loading, setLoading] = useState(false);

  /**
   * Handles the form submission for admin login.
   * Prevents default form submission, sends credentials to the backend,
   * and updates the authentication token or shows error messages.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form refresh
    setLoading(true); // Set loading state to true
    try {
      // API call to backend for admin login
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });

      if (response.data.success) {
        setToken(response.data.token); // Set the token received from the backend
        toast.success("Login successful! Welcome Admin."); // Success notification
      } else {
        toast.error(response.data.message || "Login failed. Please check your credentials."); // Error notification
      }
    } catch (error) {
      console.error("Login API Error:", error); // Log detailed error for debugging
      // Provide user-friendly error message based on error type
      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(error.response.data.message || `Server Error: ${error.response.status}`);
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Network Error: No response from server. Please try again later.");
      } else {
        // Something else happened while setting up the request
        toast.error(`An unexpected error occurred: ${error.message}`);
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-[#FFC0CB] to-pink-200'> {/* Themed background gradient */}
      <div className='bg-white shadow-xl rounded-lg px-8 py-8 w-full max-w-sm border border-pink-100 transform transition-all duration-300 hover:scale-105'> {/* Enhanced shadow, border, and hover effect */}
        <h1 className='text-3xl font-bold text-[#292a2e] mb-6 text-center tracking-wide'>Admin Login</h1> {/* Themed title, increased size and tracking */}
        <p className='text-sm text-gray-500 mb-6 text-center'>Access the administrative dashboard.</p> {/* Subtitle for clarity */}

        <form onSubmit={onSubmitHandler}>
          {/* Email Address Input Group */}
          <div className='mb-4'> {/* Increased bottom margin for spacing */}
            <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
            <input
              id="email" // Added id for accessibility with label
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='rounded-md w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200' // Enhanced focus styles
              type="email"
              placeholder='your@admin.com' // More specific placeholder
              required
              autoComplete="username" // For browser autofill
            />
          </div>

          {/* Password Input Group */}
          <div className='mb-6'> {/* Increased bottom margin */}
            <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
            <input
              id="password" // Added id for accessibility with label
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='rounded-md w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200' // Enhanced focus styles
              type="password"
              placeholder='Enter your password' // More specific placeholder
              required
              autoComplete="current-password" // For browser autofill
            />
          </div>

          {/* Login Button */}
          <button
            type="submit" // Ensure type="submit"
            className={`mt-4 w-full py-2.5 px-4 rounded-md text-white font-semibold text-lg transition-all duration-300
                       ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#292a2e] hover:bg-gray-700 shadow-md hover:shadow-lg'}`} // Themed button, loading state
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Logging in...' : 'Login'} {/* Dynamic button text */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;