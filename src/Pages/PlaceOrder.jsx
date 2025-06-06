import React, { useState, useContext } from 'react'; // FIX: Import useContext
import Title from '../Components/title';
import { assets } from '../assets/assets';
import CartTotal from '../Components/CartTotal';
import { ShopContext } from '../context/ShopContext';

// delivery page where user will enter their delivery details like name etc
const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const { navigate } = useContext(ShopContext); // Now useContext is defined

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* ------- LEFT SIDE ------ */}
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
            <div className='flex flex-col gap-8 mt-8 min-w-80'> 
                <CartTotal />

                <div> 
                    <Title text1={'PAYMENT'} text2={'METHOD'} /> 
                    
                    <div className='flex gap-3 flex-col lg:flex-row'> 
                        <div onClick={() => setMethod('easypaisa')} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer mt-3'> 
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'easypaisa' ? 'bg-green-400' : ''} `}></p> 
                            <img className='h-5 mx-4' src={assets.easypaisa_logo} alt="EasyPaisa Logo" /> 
                        </div>

                        <div onClick={() => setMethod('jazzcash')} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer mt-3'> 
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'jazzcash' ? 'bg-green-400' : ''}`}></p> 
                            <img className='h-5 mx-4' src={assets.jazzcash_logo} alt="JazzCash Logo" /> 
                        </div>

                        <div onClick={() => setMethod('creditcard')} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer mt-2'> 
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'creditcard' ? 'bg-green-400' : ''}`}></p> 
                            <img className='h-5 mx-4' src={assets.creditcard_logo} alt="Credit Card Logo" /> 
                        </div>

                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer mt-2'> 
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p> 
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p> 
                        </div>
                    </div>
                    <div className='w-full text-end mt-8'>
                        <button onClick={() => navigate('/orders')} className='bg-black text-white px-16 py-3 text-size-sm'>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;