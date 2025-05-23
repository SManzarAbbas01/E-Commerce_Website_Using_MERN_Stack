import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';

const SearchBar = () => { // Make sure this is 'SearchBar'
  const {search,setSearch,showSearch,setShowSearch} = useContext(ShopContext);
  {/*only when our showsearch is true then we return this div , when it is false then we dont return this div */}
  return showSearch ? ( // Ensure this is not 'showSearch ? show('
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text " placeholder='Search' />
        <img className='w-4 ' src={assets.icon}/>
      </div>
      <img onClick={()=> setShowSearch(false)} className='inline w-3 cursor-pointer ' src={assets.cross_icon}/>
    </div>
  ) : null
}

export default SearchBar // Make sure this exports 'SearchBar'