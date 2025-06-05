import React from 'react';
import Title from '../Components/title';
import { assets } from '../assets/assets';
import CartTotal from '../Components/CartTotal'; // FIX: Added import for CartTotal

// delivery page where user will enter their delivery details like name etc
const PlaceOrder = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* ------- LEFT SIDE ------ */}
            {/* FIX: Changed 'gao-4' to 'gap-4' and made this the main flex container for inputs */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'> 
                
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={"Delivery"} text2={"Details"} />
                </div>

                {/* Input Groups - These already have horizontal gap-4 */}
                <div className="flex gap-4"> 
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='First Name' />
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='Last Name' />
                </div>

                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder='Email address' />
                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='Street' />

                <div className="flex gap-4">
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='City' />
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='State' />
                </div>

                <div className="flex gap-4">
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder='Zip Code' />
                    <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='Country' />
                </div>

                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder='Phone Number' />
            </div>

            {/* ------- RIGHT SIDE ------ */}
            {/* The outer div for the right side, with margin-top and min-width */}
            <div className='flex flex-col gap-8 mt-8 min-w-80'> 
                <CartTotal /> {/* This component displays the cart summary */}

                {/* Margin-top for spacing below CartTotal */}
                <div> 
                    <Title text1={'PAYMENT'} text2={'METHOD'} /> {/* Title for payment methods */}

                    {/* Payment Method Selection - All options now have a default unselected look */}
                    <div className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer mt-3'> 
                        <p className='min-w-3.5 h-3.5 border rounded-full'></p> {/* Empty radio button */}
                        <img className='h-5 mx-4' src={assets.stripe_logo} alt="EasyPaisa Logo" /> 
                    </div>

                    <div className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer mt-2'> 
                        <p className='min-w-3.5 h-3.5 border rounded-full'></p> 
                        <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Credit Crad Logo" /> 
                    </div>

                    <div className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer mt-2'> 
                        <p className='min-w-3.5 h-3.5 border rounded-full'></p> 
                        <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;