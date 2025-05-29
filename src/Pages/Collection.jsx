import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../Components/title';
import ProductItem from '../Components/ProductItem';

const Collection = () => {
  const { products ,search,showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(prev => prev.filter(item => item !== value));
    } else {
      setCategory(prev => [...prev, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory(prev => prev.filter(item => item !== value));
    } else {
      setSubCategory(prev => [...prev, value]);
    }
  };

  const applyFilters = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilters();
  }, [category, subCategory,  search, showSearch]);

  const toggleFilters = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className='flex flex-col sm:flex-row-reverse gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter options container on the right side */}
      <div className='min-w-60'>
        <p
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
          onClick={toggleFilters}
        >
          SELECT YOUR CHOICE !
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="Toggle Filters"
          />
        </p>

        <div className={`bg-[#FFC0CB] text-black border border-pink-500 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'> CATEGORIES </p>
          <div className='flex flex-col gap-2 text-sm font-light'>
            <p className='flex-gap-2'>
              <input className="w-3" type="checkbox" value={'Hijabs'} onChange={toggleCategory} /> Hijabs
            </p>
            <p className='flex-gap-2'>
              <input className="w-3" type="checkbox" value={'Hijab Accessories'} onChange={toggleCategory} /> Accessories
            </p>
            <p className='flex-gap-2'>
              <input className="w-3" type="checkbox" value={'Abayas'} onChange={toggleCategory} /> Abayas
            </p>
          </div>
        </div>

        <div className={`bg-[#FFC0CB] text-black border border-pink-500 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'> TYPE </p>
          <div className='flex flex-col gap-2 text-sm font-light'>
            <p className='flex-gap-2'>
              <input className="w-3" type="checkbox" value={'Georgette Hijabs'} onChange={toggleSubCategory} /> Georgette Hijabs
            </p>
            <p className='flex-gap-2'>
              <input className="w-3" type="checkbox" value={'Stone Studded Hijabs'} onChange={toggleSubCategory} /> Stone Studded Hijabs
            </p>
            <p className='flex-gap-2'>
              <input className="w-3" type="checkbox" value={'Crinkle Crimp Hijabs'} onChange={toggleSubCategory} /> Crinkle Crimp Hijabs
            </p>
            <p className='flex-gap-2'>
              <input className="w-3" type="checkbox" value={'Hijab Pins'} onChange={toggleSubCategory} /> Hijab Pins
            </p>
            <p className='flex-gap-2'>
              <input className="w-3" type="checkbox" value={'4_in_1 Hijab Caps'} onChange={toggleSubCategory} /> 4_in_1 Hijab Caps
            </p>
            <p className='flex-gap-2'>
              <input className="w-3" type="checkbox" value={'Printed Lawn Hijabs'} onChange={toggleSubCategory} /> Printed Lawn Hijabs
            </p>
            <p className='flex-gap-2'>
              <input className="w-3" type="checkbox" value={'Printed Chiffon Hijabs'} onChange={toggleSubCategory} /> Printed Chiffon Hijabs
            </p>
          </div>
        </div>
      </div>

      {/* Product Listing */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'Our Entire'} text2={'COLLECTION'} />
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