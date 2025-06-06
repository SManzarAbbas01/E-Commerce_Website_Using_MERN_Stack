import React from 'react';
import { assets } from '../assets/assets';

function OurPolicy() {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-6 md:gap-8 lg:gap-12 text-center py-16 sm:py-20 bg-pink-50'> {/* Added subtle background color and refined gaps */}
      {/* Policy Item 1: Easy Exchange */}
      <div className='flex flex-col items-center max-w-[280px] px-4'> {/* Centering content within item, added max-width and padding */}
        <img src={assets.exchange_icon} className='w-14 h-14 mb-5 object-contain' alt="Easy Exchange Policy" /> {/* Increased icon size and ensured aspect ratio */}
        <p className='text-lg font-semibold text-gray-800 mb-2'>Easy Exchange Policy</p> {/* Increased font size and used stronger gray */}
        <p className='text-sm text-gray-500 leading-relaxed'>
          Offering a smooth, hassle-free exchange experience for your convenience.
        </p> {/* Refined wording and used lighter gray for description */}
      </div>

      {/* Policy Item 2: 10 Days Return */}
      <div className='flex flex-col items-center max-w-[280px] px-4'> {/* Centering content within item, added max-width and padding */}
        <img src={assets.quality_icon} className='w-14 h-14 mb-5 object-contain' alt="10 Days Return Policy" /> {/* Increased icon size and ensured aspect ratio */}
        <p className='text-lg font-semibold text-gray-800 mb-2'>10 Days Return Policy</p> {/* Increased font size and used stronger gray */}
        <p className='text-sm text-gray-500 leading-relaxed'>
          We provide a generous 10-day free return policy for all our valued clients.
        </p> {/* Refined wording and used lighter gray for description */}
      </div>

      {/* Policy Item 3: Customer Support */}
      <div className='flex flex-col items-center max-w-[280px] px-4'> {/* Centering content within item, added max-width and padding */}
        <img src={assets.support_logo} className='w-14 h-14 mb-5 object-contain' alt="Customer Support" /> {/* Increased icon size and ensured aspect ratio */}
        <p className='text-lg font-semibold text-gray-800 mb-2'>24/7 Customer Support</p> {/* Increased font size and used stronger gray */}
        <p className='text-sm text-gray-500 leading-relaxed'>
          Our dedicated team is available around the clock to assist you with any queries.
        </p> {/* Refined wording and used lighter gray for description */}
      </div>
    </div>
  );
}

export default OurPolicy;