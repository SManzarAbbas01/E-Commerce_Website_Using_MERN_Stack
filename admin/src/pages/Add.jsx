import React, { useState, useEffect } from 'react'; // Import useEffect
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';

function Add({token}) {
  // Initialize image states with null, not false, for better URL.createObjectURL handling
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // States to hold the object URLs for preview (managed by useEffect)
  const [imageUrl1, setImageUrl1] = useState(assets.upload_area);
  const [imageUrl2, setImageUrl2] = useState(assets.upload_area);
  const [imageUrl3, setImageUrl3] = useState(assets.upload_area);
  const [imageUrl4, setImageUrl4] = useState(assets.upload_area);

  // --- useEffect hooks to manage Object URLs for previews ---
  // This correctly creates and revokes object URLs
  useEffect(() => {
    if (image1) {
      const url = URL.createObjectURL(image1);
      setImageUrl1(url);
      return () => URL.revokeObjectURL(url); // Clean up
    } else {
      setImageUrl1(assets.upload_area); // Reset to default placeholder
    }
  }, [image1]); // Re-run when image1 file changes

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
  // --- End useEffect hooks ---

  // Handler for image file changes (simplified)
  const handleImageChange = (e, setImageFn) => {
    if (e.target.files && e.target.files[0]) {
      setImageFn(e.target.files[0]);
    } else {
      setImageFn(null); // Clear selection if user cancels
    }
  };


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Hijab");
  const [subCategory, setSubCategory] = useState("Georgette Hijabs");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Handler for form submission (placeholder)
  const onSubmitHandler = async (e) => {
    e.preventDefault();
   try{
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
     formData.append("price", price); 
    formData.append("bestseller", bestseller);
    formData.append("sizes",JSON.stringify(sizes) );

    image1 && formData.append("Image1",image1)
    image2 && formData.append("Image2",image2)
    image3 && formData.append("Image3",image3)
    image4 &&formData.append("Image4",image4)
     
    const response = await axios.post(backendUrl + "/api/product/add", formData,{headers:{token}});
    console.log(response.data)
   }
   catch(error){
    
    console.log(error)

   }

   
  };


  return (
    <form onSubmit={onSubmitHandler} className='max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg flex flex-col gap-8'>

      {/* Upload Image Section */}
      <div className='flex flex-col w-full items-start gap-3'>
        <p className='text-gray-700 font-semibold mb-2'>Upload Image</p>
        <div className='flex gap-4 flex-wrap'>
          {/* Label for image1 - Conditionally render text, image fills box */}
          <label htmlFor="image1" className="cursor-pointer w-28 h-28 border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 text-sm transition-all duration-200 hover:border-[#C586A5] overflow-hidden"> {/* Added overflow-hidden */}
            {/* Image fills parent when selected, or shows default icon */}
            <img className={image1 ? 'w-full h-full object-cover' : 'w-12 h-12 object-contain'} src={imageUrl1} alt="Upload Icon or Preview" />
            {/* Conditionally render 'Upload' text */}
            {!image1 && <p className='mb-1'>Upload</p>} {/* mb-1 only if text is present */}
            <input onChange={(e) => handleImageChange(e, setImage1)} type="file" id='image1' hidden accept="image/*" />
          </label>

          {/* Label for image2 - Conditionally render text, image fills box */}
          <label htmlFor="image2" className="cursor-pointer w-28 h-28 border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 text-sm transition-all duration-200 hover:border-[#C586A5] overflow-hidden">
            <img className={image2 ? 'w-full h-full object-cover' : 'w-12 h-12 object-contain'} src={imageUrl2} alt="Upload Icon or Preview" />
            {!image2 && <p className='mb-1'>Upload</p>}
            <input onChange={(e) => handleImageChange(e, setImage2)} type="file" id='image2' hidden accept="image/*" />
          </label>

          {/* Label for image3 - Conditionally render text, image fills box */}
          <label htmlFor="image3" className="cursor-pointer w-28 h-28 border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 text-sm transition-all duration-200 hover:border-[#C586A5] overflow-hidden">
            <img className={image3 ? 'w-full h-full object-cover' : 'w-12 h-12 object-contain'} src={imageUrl3} alt="Upload Icon or Preview" />
            {!image3 && <p className='mb-1'>Upload</p>}
            <input onChange={(e) => handleImageChange(e, setImage3)} type="file" id='image3' hidden accept="image/*" />
          </label>

          {/* Label for image4 - Conditionally render text, image fills box */}
          <label htmlFor="image4" className="cursor-pointer w-28 h-28 border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 text-sm transition-all duration-200 hover:border-[#C586A5] overflow-hidden">
            <img className={image4 ? 'w-full h-full object-cover' : 'w-12 h-12 object-contain'} src={imageUrl4} alt="Upload Icon or Preview" />
            {!image4 && <p className='mb-1'>Upload</p>}
            <input onChange={(e) => handleImageChange(e, setImage4)} type="file" id='image4' hidden accept="image/*" />
          </label>
        </div>
      </div>

      {/* Product Name Input */}
      <div className='w-full'>
        <p className='text-gray-700 font-semibold mb-2'>Product Name</p>
        <input
           
          className='w-full max-w-[500px] px-4 py-2 transition-all duration-200 hover:border-[#C586A5]'
          type="text"
          placeholder='Type here'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          
        />
      </div>

      {/* Product Description Textarea */}
      <div className='w-full'>
        <p className='text-gray-700 font-semibold mb-2'>Product Description</p>
        <textarea
          className='w-full max-w-[500px] px-4 py-2 transition-all duration-200 hover:border-[#C586A5]'
          placeholder='Write Content Here...'
          rows="6"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Categories & Price Section Group */}
      <div className='flex flex-col sm:flex-row justify-between w-full sm:gap-0 max-w-[500px]'>
        {/* Product Category Select */}
        <div className="flex flex-col">
          <p className='text-gray-700 font-semibold mb-2'>Product Category</p>
          <select
            className='w-48 px-4 py-2 transition-all duration-200 hover:border-[#C586A5]'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Hijabs">Hijabs</option>
            <option value="Hijab Accessories">Hijab Accessories</option>
            <option value="Hijab Caps">Hijab Caps</option>
            <option value="Abayas">Abayas</option>
          </select>
        </div>

        {/* Sub Category Select */}
        <div className="flex flex-col">
          <p className='text-gray-700 font-semibold mb-2'>Sub Category</p>
          <select
            className='w-48 px-4 py-2 transition-all duration-200 hover:border-[#C586A5]'
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Georgette Hijabs">Georgette Hijabs</option>
            <option value="Stone Studded Hijabs">Stone Studded Hijabs</option>
            <option value="Hijab Magnets">Hijab Magnets</option>
            <option value="Crinkle Crimp Hijabs">Crinkle Crimp Hijabs</option>
            <option value="Hijab Pins">Hijab Pins</option>
            <option value="4 in 1 Hijab Caps">4 in 1 Hijab Caps</option>
            <option value="Printed Lawn Hijabs">Printed Lawn Hijabs</option>
            <option value="Printed Chiffon Hijabs">Printed Chiffon Hijabs</option>
          </select>
        </div>

        {/* Product Price Input */}
        <div className="flex flex-col">
          <p className='text-gray-700 font-semibold mb-2'>Product Price</p>
          <input
            className='w-[150px] px-4 py-2 transition-all duration-200 hover:border-[#C586A5]'
            type="Number"
            placeholder='Enter Price'
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Product Size Section */}
      <div>
        <p className='text-gray-700 font-semibold mb-2'>Product Size</p>
        <div className='flex gap-3 '>
          <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter(item => item !=="S") : [...prev,"S"])}>
            <p  className={`${sizes.includes("S") ? "bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer `}>S</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter(item => item !=="M") : [...prev,"M"])}>
            <p  className={`${sizes.includes("M") ? "bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer `}>M</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter(item => item !=="L") : [...prev,"L"])}>
            <p  className={`${sizes.includes("L") ? "bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer `}>L</p>
          </div>
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className='flex gap-2 mt-2 items-center'>
        <input
          type="checkbox"
          id='bestseller'
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
          className='w-4 h-4'
        />
        <label className='cursor-pointer text-gray-700' htmlFor="bestseller">Add to bestseller</label>
      </div>

      {/* Add Product Button */}
      <button
        type="submit"
        className='w-32 py-3 mt-4 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300'
      >
        ADD
      </button>

    </form>
  );
}

export default Add;