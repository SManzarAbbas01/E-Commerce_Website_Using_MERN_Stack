import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  // Calling our products data using context API
  const { products } = useContext(ShopContext);

  // Adding a state variable for best sellers and initializing it
  const [bestSeller, setBestSeller] = useState([]);

  // Finding best seller products and saving them in the bestSeller state
  useEffect(() => {
    if (products && products.length > 0) {
      const bestProducts = products.filter(item => item.bestseller);
      setBestSeller(bestProducts.slice(0, 5)); // Displaying up to 5 best sellers
    }
  }, [products]); // Effect runs every time products data changes

  return (
    <div className='my-10 px-4 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto'>
      <div className='text-center py-6 sm:py-8 md:py-10'>
        <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2'>
          <Title text1={"BEST"} text2={"SELLER PRODUCTS"} />
        </h2>
        <p className='max-w-xl mx-auto text-sm sm:text-base text-gray-600 leading-relaxed'>
          SHOP OUR BEST SELLING PRODUCTS BELOW!
        </p>
      </div>

      {/* Product Grid for Best Sellers */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8'>
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id} // Using _id for a unique and stable key
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;