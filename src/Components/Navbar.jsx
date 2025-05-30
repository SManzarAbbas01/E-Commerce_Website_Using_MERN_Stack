import React, { useState, useContext} from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'; // <-- This path is correct for Navbar.jsx

const Navbar = () => {
  const [visible,setVisible]=useState(false);


  const {setShowSearch} = useContext(ShopContext);
  return (
    <div className='flex items-center justify-between py-3 font-medium bg-[#FFC0CB] px-6'>
      <div className="flex items-center gap-x-10">
        {/*here we are applying the logic that whenever we click on logo , we get redirected to our main page pn website, so we are wrapping this iamge tag  usinh link tag */}
       <Link to="/" ><img   src={assets.logo} className="w-20 h-auto" alt="Logo" /></Link>
        <p style={{ fontFamily: '"Playfair Display", serif' }} className="text-xl text-[#292a2e]">
  LEELAF.PK
</p>

      </div>

      {/* NavLinks Container */}
      <div className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to='/' className='flex flex-col items-center'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700'  hidden/>
        </NavLink>

        <NavLink to='/collection' className='flex flex-col items-center'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700'  hidden/>
        </NavLink>

        <NavLink to='/about' className='flex flex-col items-center'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' hidden />
        </NavLink>

        <NavLink to='/contact' className='flex flex-col items-center'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' hidden />
        </NavLink>
      </div>

      <div className='flex items-center gap-6'>
        <img  onClick={()=> setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
        <div className='group relative'>
          <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
          <div className='hidden group-hover:block absolute top-full right-0 pt-2'>
          <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-pink-100 text-gra  y-500 rounded shadow-lg'>
             <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p className='cursor-pointer hover:text-black'>Orders</p>
              <p className='cursor-pointer hover:text-black'>Logout</p>
           </div>
                </div>




              </div>


       <Link to='/cart' className='relative'>
       <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
       <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] '>0</p>

       </Link>

       <img onClick={()=>setVisible(true)} src={assets.menu_icon} className ='w-5 cursor-pointer sm:hidden' alt="" />

      </div>
      {/* Sidebar Menu for small screen to ensure responsiveness of our navbar*/}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full': 'w-0'}`}>
          <div className='flex flex-col text-gray-600'>
            <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer' >
              <img className = 'h-4 rotate-180' src={assets.dropdown_icon} alt="" />
              <p>Back</p>
            </div>
            <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
            <NavLink  onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
            <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
            <NavLink  onClick={()=>setVisible(false)}className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>


          </div>
      </div>


    </div>
  );
};

export default Navbar;
