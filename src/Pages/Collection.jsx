import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../Components/title';
import ProductItem from '../Components/ProductItem';

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]); // Renamed for clarity
    const [selectedSubCategories, setSelectedSubCategories] = useState([]); // Renamed for clarity

    // Helper to get unique categories and subcategories from products
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    const uniqueSubCategories = [...new Set(products.map(p => p.subCategory))];

    const toggleCategory = (e) => {
        const value = e.target.value;
        setSelectedCategories(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const toggleSubCategory = (e) => {
        const value = e.target.value;
        setSelectedSubCategories(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const applyFilters = () => {
        let productsCopy = products; // Start with the full product list
        

        if (showSearch && search) {
            productsCopy = productsCopy.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (selectedCategories.length > 0) {
            productsCopy = productsCopy.filter(item => selectedCategories.includes(item.category));
        }

        if (selectedSubCategories.length > 0) {
            productsCopy = productsCopy.filter(item => selectedSubCategories.includes(item.subCategory));
        }

        setFilterProducts(productsCopy);
    };

    // Initialize filtered products on component mount or when products change
    useEffect(() => {
        setFilterProducts(products);
    }, [products]);

    // Apply filters whenever selected categories, subcategories, or search terms change
    useEffect(() => {
        applyFilters();
    }, [selectedCategories, selectedSubCategories, search, showSearch, products]); // Added products to dependency array

    const toggleFilters = () => {
        setShowFilter(!showFilter);
    };

    return (
        <div className='flex flex-col md:flex-row gap-8 sm:gap-12 pt-8 md:pt-12 border-t'>

            {/* Filter Sidebar (Desktop: fixed, Mobile: toggled) */}
            <div className='w-full md:w-64 lg:w-72 flex-shrink-0 md:sticky md:top-20 md:h-[calc(100vh-80px)] md:overflow-y-auto pb-6'> {/* Added sticky positioning and fixed height for scroll */}
                <p
                    className='mb-4 text-xl font-semibold flex items-center justify-between cursor-pointer md:cursor-default text-gray-800 p-2 md:p-0'
                    onClick={toggleFilters}
                >
                    SELECT YOUR CHOICE!
                    <img
                        className={`h-4 md:hidden transform transition-transform duration-300 ${showFilter ? 'rotate-180' : ''}`}
                        src={assets.dropdown_icon}
                        alt="Toggle Filters"
                    />
                </p>

                <div className={`bg-[#FFC0CB] text-black border border-pink-500 rounded-lg p-5 shadow-lg
                                 transition-all duration-300 ease-in-out md:block
                                 ${showFilter ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible md:max-h-full md:opacity-100 md:visible'}`}>
                    
                    {/* Categories Filter */}
                    <div className='mb-6'>
                        <p className='mb-3 text-base font-semibold text-gray-800'>CATEGORIES</p>
                        <div className='flex flex-col gap-2 text-sm text-gray-700'>
                            {uniqueCategories.map(cat => (
                                <label key={cat} className='flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors'>
                                    <input
                                        className="w-4 h-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                                        type="checkbox"
                                        value={cat}
                                        onChange={toggleCategory}
                                        checked={selectedCategories.includes(cat)}
                                    />
                                    {cat}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Types (Sub-Categories) Filter */}
                    <div>
                        <p className='mb-3 text-base font-semibold text-gray-800'>TYPE</p>
                        <div className='flex flex-col gap-2 text-sm text-gray-700'>
                            {uniqueSubCategories.map(subCat => (
                                <label key={subCat} className='flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors'>
                                    <input
                                        className="w-4 h-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                                        type="checkbox"
                                        value={subCat}
                                        onChange={toggleSubCategory}
                                        checked={selectedSubCategories.includes(subCat)}
                                    />
                                    {subCat.replace(/_/g, ' ')} {/* Replace underscores for display */}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Listing */}
            <div className='flex-1 min-h-[60vh]'> {/* Ensure minimum height for content */}
                <div className='flex items-center justify-between text-xl sm:text-2xl mb-6'>
                    <Title text1={'Our Entire'} text2={'COLLECTION'} />
                </div>

                {filterProducts.length > 0 ? (
                    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'> {/* Adjusted gap for better spacing */}
                        {filterProducts.map((item) => (
                            <ProductItem
                                key={item._id} // Use _id for unique key if available
                                name={item.name}
                                id={item._id}
                                price={item.price}
                                Image={item.Image}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 text-lg mt-10">No products found matching your criteria.</p>
                )}
            </div>
        </div>
    );
};

export default Collection;