import React, { useState, useContext } from 'react';
import Title from '../Components/title';
import { assets } from '../assets/assets';
import CartTotal from '../Components/CartTotal';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate } = useContext(ShopContext);

  return (
    // Added mb-16 (margin-bottom) to create space before the footer
    <div className='flex flex-col md:flex-row justify-between gap-8 md:gap-16 pt-8 sm:pt-14 min-h-[80vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16'>
      {/* ------- LEFT SIDE - Delivery Details ------ */}
      <div className='flex flex-col gap-6 w-full md:w-1/2'>
        <div className='mb-4'>
          <Title text1={"Delivery"} text2={"Details"} />
        </div>

        {/* Input Groups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200"
            type="text"
            placeholder='First Name'
            required
          />
          <input
            className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200"
            type="text"
            placeholder='Last Name'
            required
          />
        </div>

        <input
          className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200"
          type="email"
          placeholder='Email address'
          required
        />
        <input
          className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200"
          type="text"
          placeholder='Street Address'
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200"
            type="text"
            placeholder='City'
            required
          />
          <input
            className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200"
            type="text"
            placeholder='State / Province'
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200"
            type="number"
            placeholder='Zip Code'
            required
          />
          <input
            className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200"
            type="text"
            placeholder='Country'
            required
          />
        </div>

        <input
          className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200"
          type="number"
          placeholder='Phone Number'
          required
        />
      </div>

      {/* ------- RIGHT SIDE - Cart Total & Payment Method ------ */}
      <div className='flex flex-col gap-8 w-full md:w-1/2 mt-8 md:mt-0'>
        <CartTotal />

        <div className='bg-pink-50 p-6 rounded-lg shadow-md'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          <div className='flex flex-col gap-4 mt-5'>
            {/* EasyPaisa Option */}
            <div
              onClick={() => setMethod('easypaisa')}
              className={`flex items-center gap-4 p-3 border rounded-md cursor-pointer transition-all duration-200
                          ${method === 'easypaisa' ? 'border-[#FFC0CB] ring-1 ring-[#FFC0CB] bg-white' : 'border-gray-300 hover:border-gray-400 bg-white'}`}
            >
              <div className={`min-w-4 h-4 rounded-full flex-shrink-0 border-2 transition-all duration-200
                               ${method === 'easypaisa' ? 'border-[#FFC0CB] bg-[#FFC0CB]' : 'border-gray-400'}`}></div>
              <img className='h-6 object-contain' src={assets.easypaisa_logo} alt="EasyPaisa Logo" />
              <p className='text-gray-700 font-medium'>EasyPaisa</p>
            </div>

            {/* JazzCash Option */}
            <div
              onClick={() => setMethod('jazzcash')}
              className={`flex items-center gap-4 p-3 border rounded-md cursor-pointer transition-all duration-200
                          ${method === 'jazzcash' ? 'border-[#FFC0CB] ring-1 ring-[#FFC0CB] bg-white' : 'border-gray-300 hover:border-gray-400 bg-white'}`}
            >
              <div className={`min-w-4 h-4 rounded-full flex-shrink-0 border-2 transition-all duration-200
                               ${method === 'jazzcash' ? 'border-[#FFC0CB] bg-[#FFC0CB]' : 'border-gray-400'}`}></div>
              <img className='h-6 object-contain' src={assets.jazzcash_logo} alt="JazzCash Logo" />
              <p className='text-gray-700 font-medium'>JazzCash</p>
            </div>

            {/* Credit Card Option */}
            <div
              onClick={() => setMethod('creditcard')}
              className={`flex items-center gap-4 p-3 border rounded-md cursor-pointer transition-all duration-200
                          ${method === 'creditcard' ? 'border-[#FFC0CB] ring-1 ring-[#FFC0CB] bg-white' : 'border-gray-300 hover:border-gray-400 bg-white'}`}
            >
              <div className={`min-w-4 h-4 rounded-full flex-shrink-0 border-2 transition-all duration-200
                               ${method === 'creditcard' ? 'border-[#FFC0CB] bg-[#FFC0CB]' : 'border-gray-400'}`}></div>
              <img className='h-6 object-contain' src={assets.creditcard_logo} alt="Credit Card Logo" />
              <p className='text-gray-700 font-medium'>Credit/Debit Card</p>
            </div>

            {/* Cash on Delivery Option */}
            <div
              onClick={() => setMethod('cod')}
              className={`flex items-center gap-4 p-3 border rounded-md cursor-pointer transition-all duration-200
                          ${method === 'cod' ? 'border-[#FFC0CB] ring-1 ring-[#FFC0CB] bg-white' : 'border-gray-300 hover:border-gray-400 bg-white'}`}
            >
              <div className={`min-w-4 h-4 rounded-full flex-shrink-0 border-2 transition-all duration-200
                               ${method === 'cod' ? 'border-[#FFC0CB] bg-[#FFC0CB]' : 'border-gray-400'}`}></div>
              <p className='text-gray-700 font-medium'>CASH ON DELIVERY</p>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <div className='w-full text-end mt-4'>
          <button
            onClick={() => navigate('/orders')}
            className='bg-black text-white px-8 py-3 text-base font-semibold rounded-md hover:bg-gray-800 transition-colors duration-200'
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;