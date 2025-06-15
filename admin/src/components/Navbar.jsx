import React from 'react';
import { assets } from '../assets/assets.js';
import { Link } from 'react-router-dom'; // Import Link for consistent navigation to dashboard/home

/**
 * @typedef {Object} AdminNavbarProps
 * @property {function(string): void} setToken - Function to set or clear the authentication token, typically used for logout.
 */

/**
 * The `AdminNavbar` component serves as the navigation bar for the admin panel.
 * It provides branding and a logout mechanism, aligning with the main application's design language.
 *
 * @param {AdminNavbarProps} { setToken } - Props for the AdminNavbar component.
 * @returns {JSX.Element} The Admin Panel Navbar component.
 */
function AdminNavbar({ setToken }) {
  return (
    <nav className='flex items-center justify-between py-4 px-6 bg-[#FFC0CB] shadow-md font-sans relative z-50'>
      {/* Brand Logo and Name - Consistent with main Navbar */}
      <div className="flex items-center gap-x-2"> {/* Adjusted gap for admin context */}
        <Link to="/admin" className="flex items-center gap-2"> {/* Link to admin dashboard */}
          <img src={assets.logo} className="w-16 h-auto" alt="LEELAF.PK Admin Logo" />
          <p style={{ fontFamily: '"Playfair Display", serif' }} className="text-2xl text-[#292a2e] tracking-wide">
            LEELAF.PK <span className="text-lg text-gray-600">(Admin)</span> {/* Indicate Admin Panel */}
          </p>
        </Link>
      </div>

      {/* Admin Actions */}
      <div className='flex items-center gap-5'>
        {/* Logout Button - Styled to fit theme */}
        <button
          onClick={() => setToken('')}
          className='bg-[#292a2e] text-white px-6 py-2 rounded-full text-base hover:bg-gray-700 transition-colors duration-300 shadow-lg'
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;