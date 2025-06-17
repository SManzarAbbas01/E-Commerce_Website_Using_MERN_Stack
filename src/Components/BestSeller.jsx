import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from './title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  // Access products from context
  const { products } = useContext(ShopContext);

  // State to hold best sellers
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
   

    if (products && products.length > 0) {
     
      // Filter best sellers with flexible matching
      const bestProducts = products.filter(item =>
        String(item.bestseller).toLowerCase() === "true" ||
        String(item.bestSeller).toLowerCase() === "true"
      );

      console.log("Filtered bestsellers:", bestProducts);

      // Set top 5 best sellers
      setBestSeller(bestProducts.slice(0, 5));
    }
  }, [products]);

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
        {bestSeller.length > 0 ? (
          bestSeller.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              Image={item.Image}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-4">
            No best sellers found.
          </p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
