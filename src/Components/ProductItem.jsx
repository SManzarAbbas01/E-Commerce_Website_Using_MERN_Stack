import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, Image, name, price ,bestSeller }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className='group block text-gray-700 cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out'>
      {/* Product Image */}
      <div className='relative w-full h-auto pb-[100%] overflow-hidden'> {/* Aspect ratio box for consistent image height */}
        <img
          className='absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out'
          src={Image[0]}
          alt={name} // Added descriptive alt text
        />
      </div>

      {/* Product Details */}
      <div className='p-3 sm:p-4 bg-white'> {/* Added padding and background for details */}
        <p className='text-sm sm:text-base font-normal text-gray-800 truncate mb-1'> {/* Increased text size, added truncate */}
          {name}
        </p>
        <p className='text-base sm:text-lg font-semibold text-gray-900'> {/* Increased text size and weight */}
          {currency}{price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;