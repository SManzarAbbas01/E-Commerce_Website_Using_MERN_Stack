import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../Components/title';
import ProductItem from '../Components/ProductItem';

const Collection = () => {
  // Getting data of all products using contextAPI
  const { products } = useContext(ShopContext);

  // State for filters and filtered products
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilters = () => {
    let productsCopy = products.slice(); // fixed typo from 'slide' to 'slice'
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if(subCategory.length>0){
      productsCopy= productsCopy.filter(item => subCategory.includes(item.subCategory) )
    }
    setFilterProducts(productsCopy);
  };




  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilters();
  }, [category, subCategory]);

  const toggleFilters = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filters */}
      <div className='min-w-60'>
        <p
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
          onClick={toggleFilters}
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="Toggle Filters"
          />
        </p>

        {/* Categories */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Categories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label><input className="w-3" type="checkbox" value={'Hijabs'} onChange={toggleCategory} /> Hijabs</label>
            <label><input className="w-3" type="checkbox" value={'Hijab Accessories'} onChange={toggleCategory} /> Accessories</label>
            <label><input className="w-3" type="checkbox" value={'Abayas'} onChange={toggleCategory} /> Abayas</label>
          </div>
        </div>

        {/* Sub Categories */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {[
              'Georgette Hijabs', 'Stone Studded Hijabs', 'Crinkle Crimp Hijabs', 'Hijab Pins',
              '4_in_1 Hijab Caps', 'Printed Lawn Hijabs', 'Printed Chiffon Hijabs'
            ].map(type => (
              <label key={type}>
                <input className="w-3" type="checkbox" value={type} onChange={toggleSubCategory} /> {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Listing */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={"Our Entire"} text2={"COLLECTION"} />
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gapy-6'>
          {filterProducts.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
