import React from 'react';
import Title from '../Components/title';
import { assets } from '../assets/assets';
import NewsletterBox from '../Components/NewsletterBox';

const Contact = () => {
  return (
    // Main page container with consistent padding and max-width (no specific background here, assumes default page background)
    <div className='pt-10 sm:pt-16 pb-16 min-h-[70vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

      {/* Contact Us Title Section */}
      <div className='mb-12 text-center'>
        <Title text1={'CONTACT'} text2={'US'} />
        <p className='text-base text-gray-600 mt-2 font-light'>We'd love to hear from you!</p>
      </div>

      {/* Main Contact Section: Image and Details Card - NOW USING bg-pink-50 */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-8 md:gap-12 
                      p-6 sm:p-10 bg-pink-50 rounded-lg shadow-xl border border-gray-100 mb-16'>
        
        {/* Contact Image (Brand Logo/Socials) */}
        <div className='w-full md:w-1/2 flex-shrink-0 flex items-center justify-center p-4 sm:p-6'>
          <img
            className='w-full h-auto object-contain max-w-[400px]'
            src={assets.LB}
            alt="Leelaf by Laiba Contact Details"
          />
        </div>

        {/* Contact Details and Call to Action */}
        <div className='flex flex-col justify-center items-start gap-5 w-full md:w-1/2 text-gray-700'>
          
          <p className='font-semibold text-2xl text-gray-800 mb-2'>Reach Out to Us</p>
          
          {/* Store Location */}
          <div className='flex flex-col gap-1'>
            <p className='font-semibold text-xl text-gray-700'>Our Store / Main Office</p>
            <p className='text-gray-600'> Sukkur IBA University <br /> Sindhi Muslim Society Sukkur</p>
          </div>

          {/* Phone & Email */}
          <div className='flex flex-col gap-1'>
            <p className='font-semibold text-xl text-gray-700'>Contact Details</p>
            <a href="tel:+923337172908" className='flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-200'>
              {/* Removed phone icon */}
              <span>+(92) 333-7172908</span>
            </a>
            <a href="mailto:leelafbylaiba@gmail.com" className='flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-200'>
              {/* Removed email icon */}
              <span>leelafbylaiba@gmail.com</span>
            </a>
          </div>

          {/* Discover Deals / Promotions */}
          <div className='mt-4 flex flex-col items-start gap-3 w-full'>
            <p className='font-semibold text-xl text-gray-700'>Discover Our Latest Offers</p>
            <p className='text-gray-600'>Explore our newest collections and exclusive deals.</p>
            <button className='border border-black px-8 py-3 text-base font-medium rounded-md hover:bg-black hover:text-white transition-all duration-300'>
              Explore Deals
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Box */}
      <NewsletterBox />
    </div>
  );
}

export default Contact;