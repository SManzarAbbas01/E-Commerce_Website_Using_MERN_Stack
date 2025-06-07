import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../Components/title.jsx';
import bin_icon from '../assets/bin_icon.png'; // Added bin icon import
import CartTotal from '../Components/CartTotal.jsx';

const Cart = () => {
    const { products, currency, cartItems, navigate, updateCartItemQuantity, updateQuantity } = useContext(ShopContext);

    const [cartData, setCartData] = useState([]); // Renamed setcartData to setCartData for consistency

    // Effect to process cartItems into a displayable format (cartData)
    useEffect(() => {
        const tempCartData = [];
        for (const productId in cartItems) {
            for (const size in cartItems[productId]) {
                const quantity = cartItems[productId][size];
                if (quantity > 0) {
                    tempCartData.push({
                        _id: productId,
                        size: size,
                        quantity: quantity
                    });
                }
            }
        }
        setCartData(tempCartData);
    }, [cartItems, products]); // Added products to dependency array, in case product details are needed for rendering

    const handleQuantityChange = (productId, size, e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            updateCartItemQuantity(productId, size, newQuantity);
        }
    };

    return (
        <div className='border-t pt-10 sm:pt-14 pb-16 min-h-[70vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='mb-8 text-center md:text-left'>
                <Title text1={'YOUR'} text2={'CART'} />
                <p className='text-base text-gray-600 mt-2'>Review your selected items before checkout.</p>
            </div>

            <div className='flex flex-col lg:flex-row gap-8'>
                {/* Cart Items List */}
                <div className='flex-1'>
                    {cartData.length === 0 ? (
                        <p className="text-center text-gray-600 p-8 border rounded-lg bg-white shadow-sm">Your cart is empty. Go add some amazing products!</p>
                    ) : (
                        <div className='flex flex-col gap-4'> {/* Added gap between cart items */}
                            {cartData.map((item) => {
                                const productData = products.find((product) => product._id === item._id);

                                if (!productData) {
                                    return (
                                        <div key={`${item._id}-${item.size}`} className="p-4 mb-2 border border-red-300 rounded-lg bg-red-50 text-red-700 shadow-sm">
                                            <p className='font-medium'>Error: Product with ID "{item._id}" (Size: {item.size.toUpperCase()}) not found. It might have been removed or is unavailable.</p>
                                        </div>
                                    );
                                }

                                return (
                                    <div
                                        key={`${item._id}-${item.size}`}
                                        className='flex items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-100 flex-wrap sm:flex-nowrap gap-4' // Added shadow, border, and flex-wrap
                                    >
                                        {/* Product Image and Details */}
                                        <div className='flex items-center gap-4 flex-grow'>
                                            <img
                                                className='w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md flex-shrink-0'
                                                src={productData.image && productData.image.length > 0 ? productData.image[0] : 'https://via.placeholder.com/100'}
                                                alt={productData.name || "Product image"}
                                            />
                                            <div className='flex flex-col'>
                                                <p className='text-base sm:text-lg font-semibold text-gray-800 leading-tight'> {productData.name} </p>
                                                <p className="text-sm sm:text-base text-gray-600 mt-1">Price: {currency} {productData.price.toFixed(2)}</p>
                                                <p className="text-sm text-gray-500 mt-0.5">Size: <span className='font-medium'>{item.size.toUpperCase()}</span></p>
                                            </div>
                                        </div>

                                        {/* Quantity Input */}
                                        <div className='flex items-center mx-auto sm:mx-4 justify-center sm:justify-start'>
                                            <label htmlFor={`quantity-${item._id}-${item.size}`} className='sr-only'>Quantity for {productData.name}</label>
                                            <input
                                                id={`quantity-${item._id}-${item.size}`}
                                                type='number'
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item._id, item.size, e)}
                                                min='1'
                                                className='w-20 p-2 border border-gray-300 rounded-md text-center text-gray-800 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200'
                                            />
                                        </div>

                                        {/* Total Price for Item */}
                                        <div className='text-right min-w-[80px] sm:ml-auto'> {/* Ensures total price has enough space */}
                                            <p className='text-base sm:text-lg font-semibold text-gray-900'>
                                                {currency} {(productData.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>

                                        {/* Remove Button */}
                                        <div className='ml-4 flex-shrink-0'>
                                            <button
                                                onClick={() => updateQuantity(item._id, item.size, 0)}
                                                className='p-2 rounded-full hover:bg-gray-100 transition-colors duration-200'
                                                aria-label={`Remove ${productData.name} size ${item.size} from cart`}
                                            >
                                                <img
                                                    src={bin_icon}
                                                    alt="Remove item"
                                                    className='w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 transition-opacity'
                                                />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Cart Total & Checkout Button */}
                <div className='w-full lg:w-96 flex-shrink-0 mt-8 lg:mt-0'>
                    <CartTotal />
                    <div className='w-full mt-6'>
                        <button
                            onClick={() => navigate('/place-order')}
                            className='w-full bg-black text-white text-base font-semibold py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 shadow-lg'
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;