import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const { setShowSearch, getCartCount } = useContext(ShopContext);

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false); // Close mobile menu when a link is clicked
  };

  return (
    <nav className='flex items-center justify-between py-4 px-6 bg-[#FFC0CB] shadow-md font-sans relative z-50'>
      {/* Brand Logo and Name */}
      <div className="flex items-center gap-x-6 sm:gap-x-10">
        <Link to="/" className="flex items-center gap-2">
          <img src={assets.logo} className="w-16 h-auto" alt="LEELAF.PK Logo" />
          <p style={{ fontFamily: '"Playfair Display", serif' }} className="text-2xl text-[#292a2e] tracking-wide">
            LEELAF.PK
          </p>
        </Link>
      </div>

      {/* Main Navigation Links (Desktop) */}
      <div className="hidden md:flex gap-8 text-base text-gray-700">
        <NavLink
          to='/'
          className={({ isActive }) =>
            `relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-gray-800 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'font-bold after:w-full' : ''}`
          }
        >
          HOME
        </NavLink>

        <NavLink
          to='/collection'
          className={({ isActive }) =>
            `relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-gray-800 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'font-bold after:w-full' : ''}`
          }
        >
          COLLECTION
        </NavLink>

        <NavLink
          to='/about'
          className={({ isActive }) =>
            `relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-gray-800 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'font-bold after:w-full' : ''}`
          }
        >
          ABOUT
        </NavLink>

        <NavLink
          to='/contact'
          className={({ isActive }) =>
            `relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-gray-800 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'font-bold after:w-full' : ''}`
          }
        >
          CONTACT
        </NavLink>
      </div>

      {/* Utility Icons (Search, Profile, Cart, Menu) */}
      <div className='flex items-center gap-5 sm:gap-6'>
        {/* Search Icon */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className='w-6 cursor-pointer hover:scale-105 transition-transform duration-200'
          alt="Search"
        />

        {/* Profile Dropdown */}
        <div
          className='relative'
          onMouseEnter={() => setIsProfileDropdownOpen(true)}
          onMouseLeave={() => setIsProfileDropdownOpen(false)}
        >
          <img
            className='w-6 cursor-pointer hover:scale-105 transition-transform duration-200'
            src={assets.profile_icon}
            alt="Profile"
          />
          {isProfileDropdownOpen && (
            <div className='absolute top-full right-0 pt-2 w-40 z-10'>
              <div className='flex flex-col gap-2 py-3 px-5 bg-white text-gray-700 rounded-lg shadow-xl border border-gray-100'>
                <p className='cursor-pointer hover:text-black hover:font-medium transition-colors duration-200'>My Profile</p>
                <p className='cursor-pointer hover:text-black hover:font-medium transition-colors duration-200'>Orders</p>
                <p className='cursor-pointer hover:text-black hover:font-medium transition-colors duration-200'>Logout</p>
              </div>
            </div>
          )}
        </div>

        {/* Cart Icon with Count */}
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-6 min-w-6 hover:scale-105 transition-transform duration-200' alt="Shopping Cart" />
          {/* Cart count display using the original logic */}
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] '>
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setIsMobileMenuOpen(true)}
          src={assets.menu_icon}
          className='w-6 cursor-pointer md:hidden hover:scale-105 transition-transform duration-200'
          alt="Menu"
        />
      </div>

      {/* Sidebar Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40'
          onClick={() => setIsMobileMenuOpen(false)} // Close when clicking outside
        ></div>
      )}
      <div className={`fixed top-0 right-0 h-full bg-white transition-all duration-300 ease-in-out z-50 flex flex-col p-6 w-64 sm:w-80 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex items-center justify-between pb-4 border-b border-gray-200'>
          <p className="text-xl font-semibold text-gray-800">Menu</p>
          <img
            onClick={() => setIsMobileMenuOpen(false)}
            className='h-6 w-6 cursor-pointer transform rotate-90 text-gray-600 hover:text-black transition-colors'
            src={assets.cross_icon} // Using cross_icon for closing, typically more intuitive
            alt="Close Menu"
          />
        </div>
        <div className='flex flex-col text-gray-700 text-lg mt-6'>
          <NavLink
            onClick={handleNavLinkClick}
            className='py-3 pl-2 border-b border-gray-100 hover:bg-gray-50 transition-colors'
            to='/'
          >
            HOME
          </NavLink>
          <NavLink
            onClick={handleNavLinkClick}
            className='py-3 pl-2 border-b border-gray-100 hover:bg-gray-50 transition-colors'
            to='/collection'
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={handleNavLinkClick}
            className='py-3 pl-2 border-b border-gray-100 hover:bg-gray-50 transition-colors'
            to='/about'
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={handleNavLinkClick}
            className='py-3 pl-2 border-b border-gray-100 hover:bg-gray-50 transition-colors'
            to='/contact'
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;