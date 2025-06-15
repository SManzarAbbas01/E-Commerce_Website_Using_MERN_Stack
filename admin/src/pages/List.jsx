import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

/**
 * @typedef {Object} ProductItem
 * @property {string} _id
 * @property {string[]} Image
 * @property {string} name
 * @property {string} category
 * @property {number} price
 */

/**
 * @typedef {Object} ListProps
 * @property {string} token
 */

function List({ token }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to load products.");
        setError(response.data.message || "Failed to load products.");
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      if (err.response) {
        setError(err.response.data.message || `Server Error: ${err.response.status}`);
        toast.error(err.response.data.message || `Server Error: ${err.response.status}`);
      } else if (err.request) {
        setError("Network Error: No response from server.");
        toast.error("Network Error: No response from server.");
      } else {
        setError(`Unexpected error: ${err.message}`);
        toast.error(`Unexpected error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const removeProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to permanently remove this product?')) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id: productId },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Product removed successfully!");
        await fetchProducts();
      } else {
        toast.error(response.data.message || "Failed to remove product.");
      }
    } catch (err) {
      console.error('Error removing product:', err);
      if (err.response) {
        toast.error(err.response.data.message || `Server Error: ${err.response.status}`);
      } else if (err.request) {
        toast.error("Network Error while removing product.");
      } else {
        toast.error(`Unexpected error: ${err.message}`);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className='p-6 sm:p-8 bg-white shadow-lg rounded-lg border border-gray-100 min-h-screen font-sans'>
      <h2 className='text-3xl font-bold text-[#292a2e] mb-6 text-center'>All Products</h2>
      <p className='text-gray-600 text-center mb-8'>
        Efficiently manage your product inventory here. You can view details and remove items.
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col justify-center items-center h-40">
          <p className="text-red-600 text-lg mb-4">Error: {error}</p>
          <button
            onClick={fetchProducts}
            className="px-6 py-2 bg-[#292a2e] text-white rounded-md hover:bg-gray-700 transition"
          >
            Retry Loading Products
          </button>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">No products found.</p>
      ) : (
        <div className='flex flex-col gap-3'>
          {/* Table Header */}
          <div className='hidden sm:grid grid-cols-[0.8fr_2.5fr_1.2fr_1.2fr_0.8fr] items-center py-3 px-4 bg-[#FFC0CB] text-[#292a2e] font-semibold text-base rounded-t-md border-b-2 border-pink-300'>
            <b>Image</b>
            <b>Name</b>
            <b className="text-center">Category</b>
            <b className="text-center">Price</b>
            <b className="text-center">Action</b>
          </div>

          {/* Product Rows */}
          <div className='border border-gray-200 rounded-b-md overflow-hidden'>
            {products.map((item, index) => (
              <div
                key={item._id}
                className={`grid grid-cols-1 sm:grid-cols-[0.8fr_2.5fr_1.2fr_1.2fr_0.8fr] 
                            items-center gap-y-4 sm:gap-4 py-3 px-4 text-sm
                            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} 
                            border-b last:border-b-0 hover:shadow-sm transition-shadow duration-200`}
              >
                {/* Image */}
                <div className="flex justify-center sm:justify-start">
                  <img
                    className='w-16 h-16 object-cover rounded-md border border-gray-100 shadow-sm'
                    src={item.Image?.[0] || assets.default_product_image}
                    alt={item.name || 'Product Image'}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = assets.error_image || assets.default_product_image;
                    }}
                  />
                </div>

                {/* Name */}
                <p className='text-gray-800 font-medium truncate'>{item.name}</p>

                {/* Category */}
                <p className='text-gray-600 text-center hidden sm:block truncate'>{item.category}</p>

                {/* Price */}
                <p className='text-gray-800 font-medium text-center hidden sm:block truncate'>
                  {currency}{item.price.toFixed(2)}
                </p>

                {/* Delete Button */}
                <div className='flex justify-center items-center'>
                  <button
                    onClick={() => removeProduct(item._id)}
                    className='flex items-center justify-center w-9 h-9 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 active:bg-red-700'
                    title={`Delete ${item.name}`}
                    aria-label={`Delete ${item.name}`}
                  >
                    <img src={assets.cross_icon} alt="Delete Icon" className='w-4 h-4' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
