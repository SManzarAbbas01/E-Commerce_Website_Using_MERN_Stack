import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets'; // Ensure this path is correct
import axios from 'axios';
import { backendUrl } from '../App'; // Ensure this path is correct
import { toast } from 'react-toastify'; // Make sure react-toastify is set up in App.js

/**
 * @typedef {Object} AddProps
 * @property {string} token - The authentication token required for API requests.
 */

/**
 
 * @param {AddProps} { token } - Props for the Add component.
 * @returns {JSX.Element} The Add Product form component.
 */
function Add({ token }) {
  // State for image files (actual File objects)
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // States for image preview URLs (derived from File objects)
  // Initialize with the default placeholder from assets
  const [imageUrl1, setImageUrl1] = useState(assets.upload_area);
  const [imageUrl2, setImageUrl2] = useState(assets.upload_area);
  const [imageUrl3, setImageUrl3] = useState(assets.upload_area);
  const [imageUrl4, setImageUrl4] = useState(assets.upload_area);

  // --- useEffect hooks to manage Object URLs for image previews ---
  // These effects create and revoke Object URLs for efficient memory management.
  useEffect(() => {
    if (image1) {
      const url = URL.createObjectURL(image1);
      setImageUrl1(url);
      return () => URL.revokeObjectURL(url); // Cleanup on component unmount or image change
    } else {
      setImageUrl1(assets.upload_area); // Reset to default placeholder if no image
    }
  }, [image1]); // Dependency array: re-run when image1 file changes

  useEffect(() => {
    if (image2) {
      const url = URL.createObjectURL(image2);
      setImageUrl2(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImageUrl2(assets.upload_area);
    }
  }, [image2]);

  useEffect(() => {
    if (image3) {
      const url = URL.createObjectURL(image3);
      setImageUrl3(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImageUrl3(assets.upload_area);
    }
  }, [image3]);

  useEffect(() => {
    if (image4) {
      const url = URL.createObjectURL(image4);
      setImageUrl4(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImageUrl4(assets.upload_area);
    }
  }, [image4]);
  // --- End useEffect hooks for image previews ---

  /**
   * Handles the change event for file input fields.
   * Updates the corresponding image state with the selected file.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the file input.
   * @param {React.Dispatch<React.SetStateAction<File | null>>} setImageFn - The state setter function for the specific image.
   */
  const handleImageChange = (e, setImageFn) => {
    if (e.target.files && e.target.files[0]) {
      setImageFn(e.target.files[0]); // Set the File object
    } else {
      setImageFn(null); // Clear the image if no file is selected (e.g., user cancels)
    }
  };

  // State for product details
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Hijabs'); // Changed default to "Hijabs"
  const [subCategory, setSubCategory] = useState('Georgette Hijabs');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]); // Array to store selected sizes
  const [loading, setLoading] = useState(false); // New state for loading indicator

  /**
   * Handles the form submission for adding a new product.
   * Constructs FormData, sends it to the backend, and handles success/error feedback.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default browser form submission
    setLoading(true); // Set loading state to true

    try {
      const formData = new FormData(); // Create FormData object for multipart/form-data

      // Append all text and number fields
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('price', Number(price)); // Ensure price is sent as a number
      formData.append('bestSeller', bestseller); // Boolean directly appended
      formData.append('Sizes', JSON.stringify(sizes)); // Stringify array for backend

      // Append image files if they exist
      if (image1) formData.append('Image1', image1);
      if (image2) formData.append('Image2', image2);
      if (image3) formData.append('Image3', image3);
      if (image4) formData.append('Image4', image4);

      // Send POST request to the backend
      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token }, // Include authentication token
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Product added successfully!');
        // Reset form fields upon successful submission
        setName('');
        setDescription('');
        setPrice('');
        setCategory('Hijabs'); // Reset to default
        setSubCategory('Georgette Hijabs'); // Reset to default
        setBestseller(false);
        setSizes([]);
        setImage1(null); // Reset image files
        setImage2(null);
        setImage3(null);
        setImage4(null);
      } else {
        toast.error(response.data.message || 'Failed to add product. Please try again.');
      }
    } catch (error) {
      console.error('Add Product API Error:', error); // Log full error for debugging
      if (error.response) {
        // Server responded with an error status (e.g., 4xx, 5xx)
        toast.error(error.response.data.message || `Server Error: ${error.response.status}`);
      } else if (error.request) {
        // Request was made but no response received
        toast.error('Network Error: No response from server. Please check your connection.');
      } else {
        // Something else happened in setting up the request
        toast.error(`An unexpected error occurred: ${error.message}`);
      }
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  /**
   * Toggles the selection of a given size.
   * @param {string} size - The size ('S', 'M', 'L') to toggle.
   */
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size].sort() // Sort for consistent order
    );
  };

  return (
    <form onSubmit={onSubmitHandler} className='max-w-4xl mx-auto p-6 sm:p-8 bg-white shadow-lg rounded-lg flex flex-col gap-6 font-sans border border-gray-100'>
      {/* Page Title */}
      <h2 className='text-3xl font-bold text-[#292a2e] mb-4 text-center'>Add New Product</h2>
      <p className='text-gray-600 text-center mb-6'>Fill in the details below to add a new product to your inventory.</p>

      {/* --- Upload Image Section --- */}
      <div className='flex flex-col gap-4'>
        <p className='text-gray-700 font-semibold text-lg'>Product Images</p>
        <div className='flex flex-wrap gap-4 justify-center sm:justify-start'>
          {[
            { id: 'image1', image: image1, imageUrl: imageUrl1, setImageFn: setImage1 },
            { id: 'image2', image: image2, imageUrl: imageUrl2, setImageFn: setImage2 },
            { id: 'image3', image: image3, imageUrl: imageUrl3, setImageFn: setImage3 },
            { id: 'image4', image: image4, imageUrl: imageUrl4, setImageFn: setImage4 },
          ].map((item) => (
            <label
              key={item.id}
              htmlFor={item.id}
              className='relative cursor-pointer w-32 h-32 md:w-36 md:h-36 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 text-sm overflow-hidden
                         transition-all duration-300 hover:border-[#C586A5] hover:shadow-md'
            >
              {item.image ? (
                <img
                  className='w-full h-full object-cover rounded-lg'
                  src={item.imageUrl}
                  alt="Product Preview"
                />
              ) : (
                <>
                  <img
                    className='w-14 h-14 object-contain mb-1'
                    src={assets.upload_area} // Default upload icon
                    alt="Upload Icon"
                  />
                  <span className='text-xs sm:text-sm text-gray-600 font-medium'>Upload Image</span>
                </>
              )}
              {item.image && ( // Add a clear button only if an image is selected
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); item.setImageFn(null); }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs leading-none"
                  aria-label={`Clear ${item.id}`}
                >
                  &times;
                </button>
              )}
              <input
                onChange={(e) => handleImageChange(e, item.setImageFn)}
                type="file"
                id={item.id}
                hidden
                accept="image/*"
              />
            </label>
          ))}
        </div>
      </div>

      <hr className="border-t border-gray-200" /> {/* Separator */}

      {/* --- Product Details Section --- */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Product Name Input */}
        <div className='flex flex-col'>
          <label htmlFor="productName" className='text-gray-700 font-semibold mb-2'>Product Name</label>
          <input
            id="productName"
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200'
            type="text"
            placeholder='e.g., Silk Hijab in Rose Pink'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Product Price Input */}
        <div className='flex flex-col'>
          <label htmlFor="productPrice" className='text-gray-700 font-semibold mb-2'>Product Price (PKR)</label>
          <input
            id="productPrice"
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200'
            type="number"
            placeholder='e.g., 1250'
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0" // Prevent negative prices
          />
        </div>
      </div>

      {/* Product Description Textarea */}
      <div className='flex flex-col'>
        <label htmlFor="productDescription" className='text-gray-700 font-semibold mb-2'>Product Description</label>
        <textarea
          id="productDescription"
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200 resize-y min-h-[120px]'
          placeholder='Write a detailed description of the product, including material, features, and care instructions.'
          rows="6"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <hr className="border-t border-gray-200" /> {/* Separator */}

      {/* --- Categorization and Sizing Section --- */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Product Category Select */}
        <div className="flex flex-col">
          <label htmlFor="productCategory" className='text-gray-700 font-semibold mb-2'>Product Category</label>
          <select
            id="productCategory"
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Hijabs">Hijabs</option>
            <option value="Hijab Accessories">Hijab Accessories</option>
            <option value="Hijab Caps">Hijab Caps</option>
            <option value="Abayas">Abayas</option>
          </select>
        </div>

        {/* Sub Category Select (Dependent on main category if needed, but keeping separate for now) */}
        <div className="flex flex-col">
          <label htmlFor="subCategory" className='text-gray-700 font-semibold mb-2'>Sub Category</label>
          <select
            id="subCategory"
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200'
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            {/* Options can be dynamically filtered based on 'category' state */}
            {category === "Hijabs" && (
              <>
                <option value="Georgette Hijabs">Georgette Hijabs</option>
                <option value="Stone Studded Hijabs">Stone Studded Hijabs</option>
                <option value="Crinkle Crimp Hijabs">Crinkle Crimp Hijabs</option>
                <option value="Printed Lawn Hijabs">Printed Lawn Hijabs</option>
                <option value="Printed Chiffon Hijabs">Printed Chiffon Hijabs</option>
              </>
            )}
            {category === "Hijab Accessories" && (
              <>
                <option value="Hijab Magnets">Hijab Magnets</option>
                <option value="Hijab Pins">Hijab Pins</option>
              </>
            )}
            {category === "Hijab Caps" && (
              <>
                <option value="4 in 1 Hijab Caps">4 in 1 Hijab Caps</option>
                {/* Add more cap types as needed */}
              </>
            )}
             {category === "Abayas" && (
              <>
                <option value="Classic Abayas">Classic Abayas</option>
                <option value="Embroidered Abayas">Embroidered Abayas</option>
              </>
            )}
          </select>
        </div>

        {/* Product Size Selection */}
        <div className='flex flex-col'>
          <p className='text-gray-700 font-semibold mb-2'>Available Sizes</p>
          <div className='flex gap-3'>
            {['S', 'M', 'L', 'XL'].map((sizeOption) => ( // Added XL as a common size
              <div
                key={sizeOption}
                onClick={() => toggleSize(sizeOption)}
                className={`flex items-center justify-center min-w-[40px] h-[40px] border border-gray-300 rounded-md cursor-pointer text-sm font-medium
                           ${sizes.includes(sizeOption) ? 'bg-[#FFC0CB] text-[#292a2e] border-[#C586A5]' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}
                           transition-colors duration-200`}
              >
                {sizeOption}
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-200" /> {/* Separator */}

      {/* --- Bestseller Checkbox --- */}
      <div className='flex items-center gap-3 mt-2'>
        <input
          type="checkbox"
          id='bestseller'
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
          className='w-5 h-5 accent-[#C586A5] cursor-pointer' // Themed accent color for checkbox
        />
        <label className='cursor-pointer text-gray-700 text-base font-medium' htmlFor="bestseller">Mark as Bestseller</label>
      </div>

      {/* --- Add Product Button --- */}
      <button
        type="submit"
        className={`w-full sm:w-48 py-3 mt-6 rounded-md text-white font-semibold text-lg transition-all duration-300 shadow-md
                   ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#292a2e] hover:bg-gray-700'}`}
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Adding Product...' : 'ADD PRODUCT'}
      </button>
    </form>
  );
}

export default Add;