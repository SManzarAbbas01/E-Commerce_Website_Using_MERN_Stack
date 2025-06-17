import React, { useContext, useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { ShopContext } from '../Context/ShopContext';
import Title from './title';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  // Fetch the first 10 products when the component mounts
  useEffect(() => {
    // We'll slice the first 10 products from the 'products' array.
    // Ensure 'products' is available and an array before slicing.
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]); // Add products to dependency array, so it updates if products change

  return (
    <div className='my-10 px-4 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto'> {/* Added horizontal padding and max-width for better centering */}
      <div className='text-center py-6 sm:py-8 md:py-10'> {/* Adjusted vertical padding */}
        <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2'> {/* Using h2 for semantic structure, bold font */}
          <Title text1={"LATEST"} text2={"COLLECTION"} />
        </h2>
        <p className='max-w-xl mx-auto text-sm sm:text-base text-gray-600 leading-relaxed'> {/* Increased max-width and adjusted text size/line-height */}
          SHOP FROM OUR LATEST COLLECTION OF HIJABS, ACCESSORIES AND ABAYAS.
        </p>
      </div>

      {/* Product Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8'> {/* Refined gap values */}
        {latestProducts.map((item) => (
          // Using item._id as key for better performance and stability
          <ProductItem
            key={item._id}
            id={item._id}
            Image={item.Image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;