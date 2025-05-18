import React from 'react'
import { assets } from '../assets/assets'

function OurPolicy() {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="Exchange" />
        <p className='font-semibold'> Easy Exchange Policy </p>
        <p className='text-gray-400'>Offering Smooth Hassle Free Exchange Policy </p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="Quality" />
        <p className='font-semibold'> Offering 10 Days return Policy </p>
        <p className='text-gray-400'> We Provide 10 Days Free Return Policy To Our Clients </p>
      </div>
      <div>
        <img src={assets.support_logo} className='w-12 m-auto mb-5' alt="Support" />
        <p className='font-semibold'> Customer Support </p>
        <p className='text-gray-400'> We Provide 24/7 Customer Support</p>
      </div>
    </div>
  )
}

export default OurPolicy
