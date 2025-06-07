import React from 'react';
import Title from '../Components/title';
import { assets } from '../assets/assets';
import NewsletterBox from '../Components/NewsletterBox';

const About = () => {
  return (
    // Main page container - NO overall background color here. Let's assume the parent (e.g., App.js) provides a default white background.
    <div className='pt-10 sm:pt-16 pb-16 min-h-[70vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

      {/* About Us Title Section */}
      <div className='mb-12 text-center'>
        <Title text1={'ABOUT'} text2={'US'} />
        <p className='text-base text-gray-600 mt-2 font-light'>Discover the journey behind Leelaf by Laiba.</p>
      </div>

      {/* Main Content Section: Image and Text - This now acts purely as a flex container */}
      <div className='flex flex-col md:flex-row items-start gap-8 md:gap-12 mb-16'> {/* Adjusted gap for visual balance */}
        
        {/* About Image Container - With a white background and border/shadow */}
        <div className='w-full md:w-1/2 flex-shrink-0 p-4 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center'>
          <img
            className='w-full h-auto object-cover rounded-md'
            src={assets.about_us || assets.contact_img} //
            alt="Leelaf by Laiba Modest Collection"
          />
        </div>

        {/* About Text Content - With the pink background and its own padding/shadow */}
        <div className='flex flex-col gap-6 w-full md:w-1/2 p-8 sm:p-10 bg-pink-50 rounded-lg shadow-md text-gray-700 leading-relaxed'>
          <p className='text-lg font-medium text-gray-900'>
            <strong>Leelaf by Laiba</strong> is your premier destination for exquisite <strong>modest fashion</strong>. We curate <strong>premium hijabs, elegant abayas, and beautiful accessories</strong> designed to <strong>empower women</strong> with grace and confidence.
          </p>
          <p className='text-base text-gray-800'>
            Every piece in our collection is a testament to <strong>quality craftsmanship</strong>, meticulously selected for its <strong>comfort, durability, and luxurious feel</strong>. We blend <strong>timeless elegance with contemporary trends</strong> to offer a diverse range that perfectly complements your style.
          </p>
          <p className='text-base text-gray-800'>
            Experience an <strong>unparalleled shopping journey</strong> from Browse to delivery. At Leelaf by Laiba, we are dedicated to <strong>attention to detail and unwavering customer satisfaction</strong>.
          </p>

          <h3 className='font-prata text-2xl sm:text-3xl text-gray-900 mt-4 leading-tight'>
            Our Mission
          </h3>
          <p className='text-base text-gray-700'>
            Our mission is to <strong>redefine modest fashion</strong> by offering a blend of <strong>contemporary style, unparalleled comfort, and sustainable quality</strong>. We aim to <strong>empower women globally</strong> to embrace their identity through beautifully crafted hijabs, abayas, and accessories that celebrate elegance and individuality.
          </p>
        </div>
      </div>

      {/* "Why Choose Us" Section */}
      <div className='mt-16 text-center'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
        <p className='text-base text-gray-600 mt-2 mb-10 font-light'>Experience the Leelaf by Laiba difference.</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-10 px-4 bg-pink-50 rounded-lg shadow-md border border-gray-100'>
          {/* Feature 1: Quality Assurance */}
          <div className='flex flex-col items-center text-center p-4'>
            <img src={assets.quality_icon} className='w-14 h-14 mb-4 object-contain' alt="Premium Quality Icon" />
            <h4 className='text-xl font-semibold text-gray-800 mb-2'>Premium Quality</h4>
            <p className='text-sm text-gray-600 leading-relaxed'>
              We handpick the finest fabrics and materials, ensuring each product meets our rigorous standards for comfort, durability, and elegance.
            </p>
          </div>

          {/* Feature 2: Convenience */}
          <div className='flex flex-col items-center text-center p-4'>
            <img src={assets.exchange_icon} className='w-14 h-14 mb-4 object-contain' alt="Hassle-Free Shopping Icon" />
            <h4 className='text-xl font-semibold text-gray-800 mb-2'>Hassle-Free Shopping</h4>
            <p className='text-sm text-gray-600 leading-relaxed'>
              Enjoy a seamless online experience, easy navigation, and a smooth return/exchange process designed for your ultimate convenience.
            </p>
          </div>

          {/* Feature 3: Dedicated Support */}
          <div className='flex flex-col items-center text-center p-4'>
            <img src={assets.support_logo} className='w-14 h-14 mb-4 object-contain' alt="Exceptional Customer Service Icon" />
            <h4 className='text-xl font-semibold text-gray-800 mb-2'>Exceptional Customer Service</h4>
            <p className='text-sm text-gray-600 leading-relaxed'>
              Our friendly and knowledgeable support team is dedicated to assisting you with any queries, ensuring a delightful shopping journey.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Box */}
      <div className='mt-20'>
        <NewsletterBox />
      </div>
    </div>
  );
}

export default About;