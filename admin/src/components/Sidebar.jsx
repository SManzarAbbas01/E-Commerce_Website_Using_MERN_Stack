import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets'; // Ensure this path is correct for your assets

/**
 * The `Sidebar` component provides navigation links for the admin panel.
 * It features a clean design with active link styling and responsiveness.
 *
 * @returns {JSX.Element} The Sidebar component.
 */
const Sidebar = () => {
  return (
    <div className='w-1/5 min-h-screen border-r border-gray-200 bg-white shadow-sm pt-6'> {/* Adjusted width, border, and added background/shadow */}
      <nav className='flex flex-col gap-2 px-4'> {/* Use <nav> for semantic correctness, adjusted padding and gap */}
        {/* NavLink for Add Items */}
        <NavLink
          to="/add" // Assuming admin routes are nested under /admin
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200
            ${isActive ? 'bg-[#FFC0CB] text-[#292a2e] font-semibold' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          <img className='w-5 h-5' src={assets.add_icon} alt="Add Item Icon" />
          <p className='hidden sm:block text-base'>Add Items</p> {/* Adjusted breakpoint for text visibility */}
        </NavLink>

        {/* NavLink for List Items */}
        <NavLink
          to="/list" // Assuming admin routes are nested under /admin
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200
            ${isActive ? 'bg-[#FFC0CB] text-[#292a2e] font-semibold' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          <img className='w-5 h-5' src={assets.order_icon} alt="List Items Icon" /> {/* Re-used order_icon, consider a specific list icon if available */}
          <p className='hidden sm:block text-base'>List Items</p>
        </NavLink>

        {/* NavLink for Orders */}
        <NavLink
          to="/orders" // Assuming admin routes are nested under /admin
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200
            ${isActive ? 'bg-[#FFC0CB] text-[#292a2e] font-semibold' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          <img className='w-5 h-5' src={assets.order_icon} alt="Orders Icon" />
          <p className='hidden sm:block text-base'>Orders</p>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;