import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Hero = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between min-h-[70vh] bg-pink-50 overflow-hidden'>
      {/* Hero Left Side - Text Content */}
      <div className='w-full md:w-1/2 flex items-center justify-center py-10 px-6 sm:px-10 lg:px-16 text-center md:text-left'>
        <div className='max-w-md mx-auto md:mx-0'>
          <div className='flex items-center gap-3 mb-2 justify-center md:justify-start'>
            <span className='w-8 h-[2px] bg-gray-700'></span>
            <p className='font-medium text-sm sm:text-base text-gray-700 tracking-wide uppercase'>
              The Best Selling
            </p>
          </div>
          <h1 className='font-prata text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-gray-900 mb-6'>
            Latest Arrivals
          </h1>
          <div className='flex items-center gap-3 mt-4 justify-center md:justify-start'>
            <Link to="/collection" className='font-semibold text-sm sm:text-base text-pink-700 hover:text-black transition-colors duration-300 cursor-pointer uppercase'>
              Shop Now
            </Link>
            <span className='w-8 h-[2px] bg-gray-700'></span>
          </div>
        </div>
      </div>

      {/* Hero Right Side - Image */}
      <div className='w-full md:w-1/2 flex justify-center items-center'>
        <img
          className='w-full h-auto object-cover md:h-full md:max-h-[70vh] hover:scale-105 transition-transform duration-500 ease-out'
          src={assets.banner}
          alt="Latest Arrivals Banner"
        />
      </div>
    </div>
  );
};

export default Hero;