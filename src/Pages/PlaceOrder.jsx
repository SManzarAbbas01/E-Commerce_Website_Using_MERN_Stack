import React, { useState, useContext, useEffect } from 'react';
import Title from '../Components/title';
import { assets } from '../assets/assets';
import CartTotal from '../Components/CartTotal';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
    // Get all necessary data and functions from the context
    const { navigate, getCartAmount, products, cartItems, backendUrl, token } = useContext(ShopContext);

    const [method, setMethod] = useState('cod');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phoneNumber: ''
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // This is the main function that handles the entire order placement process
    const placeOrderHandler = async (event) => {
        event.preventDefault(); // Prevent the form from reloading the page

        // 1. Prepare the order items array from the cart
        let orderItems = [];
        Object.keys(cartItems).forEach((itemId) => {
            if (products.length > 0) {
                let itemInfo = products.find((product) => product._id === itemId);
                if (itemInfo) {
                    Object.keys(cartItems[itemId]).forEach(size => {
                        orderItems.push({
                            ...itemInfo,
                            quantity: cartItems[itemId][size],
                            size: size
                        });
                    });
                }
            }
        });

        // 2. Prepare the final order data payload
        const orderData = {
            address: formData,
            items: orderItems,
            amount: getCartAmount() + (getCartAmount() > 0 ? 200 : 0), // Amount + delivery fee
        };

        // 3. Determine the correct API endpoint based on the selected payment method
        let url = "";
        if (method === 'cod') {
            url = `${backendUrl}/api/order/place`;
        } else if (method === 'jazzcash') {
            url = `${backendUrl}/api/order/jazzcash`;
        } else if (method === 'easypaisa') {
            url = `${backendUrl}/api/order/easypaisa`;
        } else if (method === 'creditcard') {
            toast.error("Card payments are currently unavailable in this region.");
            return;
        } else {
            toast.error("Please select a valid payment method.");
            return;
        }

        // 4. Send the API request to the backend
        try {
            const response = await axios.post(url, orderData, { headers: { Authorization: `Bearer ${token}` } });

            if (response.data.success) {
                // For COD, we just show a success message and navigate
                if (method === 'cod') {
                    toast.success(response.data.message);
                    navigate("/orders");
                } 
                // For redirect-based payments (JazzCash/EasyPaisa), we handle the redirect
                else if (response.data.payment_url && response.data.form_data) {
                    const { payment_url, form_data } = response.data;

                    // Create a form dynamically in memory to post to the payment gateway
                    const form = document.createElement('form');
                    form.method = 'POST';
                    form.action = payment_url;

                    for (const key in form_data) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = key;
                        input.value = form_data[key];
                        form.appendChild(input);
                    }
                    document.body.appendChild(form);
                    form.submit(); // This will redirect the user to the payment page
                }
            } else {
                toast.error(response.data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Order placement error:", error);
            toast.error(error.response?.data?.message || "An error occurred while placing the order.");
        }
    };
    
    // Redirect to cart if it's empty when the component loads
    useEffect(() => {
        if (token && getCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token, getCartAmount, navigate]);

    return (
        // Added onSubmit handler to the form
        <form onSubmit={placeOrderHandler} className='flex flex-col md:flex-row justify-between gap-8 md:gap-16 pt-8 sm:pt-14 min-h-[80vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16'>
            {/* ------- LEFT SIDE - Delivery Details ------ */}
            <div className='flex flex-col gap-6 w-full md:w-1/2'>
                <div className='mb-4'>
                    <Title text1={"Delivery"} text2={"Details"} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input name="firstName" onChange={onChangeHandler} value={formData.firstName} className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200" type="text" placeholder='First Name' required />
                    <input name="lastName" onChange={onChangeHandler} value={formData.lastName} className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200" type="text" placeholder='Last Name' required />
                </div>

                <input name="email" onChange={onChangeHandler} value={formData.email} className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200" type="email" placeholder='Email address' required />
                
                {/* Corrected name attribute from 'phone' to 'streetAddress' */}
                <input name="streetAddress" onChange={onChangeHandler} value={formData.streetAddress} className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200" type="text" placeholder='Street Address' required />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input name="city" onChange={onChangeHandler} value={formData.city} className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200" type="text" placeholder='City' required />
                    <input name="state" onChange={onChangeHandler} value={formData.state} className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200" type="text" placeholder='State / Province' required />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input name="zipCode" onChange={onChangeHandler} value={formData.zipCode} className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200" type="text" placeholder='Zip Code' required />
                    <input name="country" onChange={onChangeHandler} value={formData.country} className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200" type="text" placeholder='Country' required />
                </div>

                <input name="phoneNumber" onChange={onChangeHandler} value={formData.phoneNumber} className="border border-gray-300 rounded-md py-2 px-4 w-full text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200" type="tel" placeholder='Phone Number' required />
            </div>

            {/* ------- RIGHT SIDE - Cart Total & Payment Method ------ */}
            <div className='flex flex-col gap-8 w-full md:w-1/2 mt-8 md:mt-0'>
                <CartTotal />

                <div className='bg-pink-50 p-6 rounded-lg shadow-md'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    <div className='flex flex-col gap-4 mt-5'>
                        {/* EasyPaisa Option */}
                        <div onClick={() => setMethod('easypaisa')} className={`flex items-center gap-4 p-3 border rounded-md cursor-pointer transition-all duration-200 ${method === 'easypaisa' ? 'border-[#FFC0CB] ring-1 ring-[#FFC0CB] bg-white' : 'border-gray-300 hover:border-gray-400 bg-white'}`}>
                            <div className={`min-w-4 h-4 rounded-full flex-shrink-0 border-2 transition-all duration-200 ${method === 'easypaisa' ? 'border-[#FFC0CB] bg-[#FFC0CB]' : 'border-gray-400'}`}></div>
                            <img className='h-6 object-contain' src={assets.easypaisa_logo} alt="EasyPaisa Logo" />
                            <p className='text-gray-700 font-medium'>EasyPaisa</p>
                        </div>

                        {/* JazzCash Option */}
                        <div onClick={() => setMethod('jazzcash')} className={`flex items-center gap-4 p-3 border rounded-md cursor-pointer transition-all duration-200 ${method === 'jazzcash' ? 'border-[#FFC0CB] ring-1 ring-[#FFC0CB] bg-white' : 'border-gray-300 hover:border-gray-400 bg-white'}`}>
                            <div className={`min-w-4 h-4 rounded-full flex-shrink-0 border-2 transition-all duration-200 ${method === 'jazzcash' ? 'border-[#FFC0CB] bg-[#FFC0CB]' : 'border-gray-400'}`}></div>
                            <img className='h-6 object-contain' src={assets.jazzcash_logo} alt="JazzCash Logo" />
                            <p className='text-gray-700 font-medium'>JazzCash</p>
                        </div>

                        {/* Credit Card Option */}
                        <div onClick={() => setMethod('creditcard')} className={`flex items-center gap-4 p-3 border rounded-md cursor-pointer transition-all duration-200 ${method === 'creditcard' ? 'border-[#FFC0CB] ring-1 ring-[#FFC0CB] bg-white' : 'border-gray-300 hover:border-gray-400 bg-white'}`}>
                            <div className={`min-w-4 h-4 rounded-full flex-shrink-0 border-2 transition-all duration-200 ${method === 'creditcard' ? 'border-[#FFC0CB] bg-[#FFC0CB]' : 'border-gray-400'}`}></div>
                            <img className='h-6 object-contain' src={assets.creditcard_logo} alt="Credit Card Logo" />
                            <p className='text-gray-700 font-medium'>Credit/Debit Card</p>
                        </div>

                        {/* Cash on Delivery Option */}
                        <div onClick={() => setMethod('cod')} className={`flex items-center gap-4 p-3 border rounded-md cursor-pointer transition-all duration-200 ${method === 'cod' ? 'border-[#FFC0CB] ring-1 ring-[#FFC0CB] bg-white' : 'border-gray-300 hover:border-gray-400 bg-white'}`}>
                            <div className={`min-w-4 h-4 rounded-full flex-shrink-0 border-2 transition-all duration-200 ${method === 'cod' ? 'border-[#FFC0CB] bg-[#FFC0CB]' : 'border-gray-400'}`}></div>
                            <p className='text-gray-700 font-medium'>CASH ON DELIVERY</p>
                        </div>
                    </div>
                </div>

                <div className='w-full text-end mt-4'>
                    {/* Removed the incorrect onClick handler from the button */}
                    <button type='submit' className='bg-black text-white px-8 py-3 text-base font-semibold rounded-md hover:bg-gray-800 transition-colors duration-200'>
                        Place Order
                    </button>
                </div>
            </div>
        </form>
    );
}

export default PlaceOrder;
