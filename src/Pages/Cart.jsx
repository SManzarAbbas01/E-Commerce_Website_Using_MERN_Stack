import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../Components/title.jsx';
import bin_icon from '../assets/bin_icon.png'; // Added bin icon import
import CartTotal from '../Components/CartTotal.jsx';
const Cart = () => {

    const { products, currency, cartItems, navigate , updateCartItemQuantity , updateQuantity } = useContext(ShopContext);

    const [cartData, setcartData] = useState([]);
    //whenever cart Items will update, this function executes thus we add it in dependency array 
    //
    useEffect(() => {

        const temp = [];
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                // in this loop we will get cartItems data and their quantity
                // we will store that data in one object and we'll add that in the array , useState([])

                if (cartItems[items][item] > 0) {
                    temp.push({
                        _id: items,
                        size: item,
                        quantity: cartItems[items][item]
                    })
                }
            }
        }
        setcartData(temp);
        // now this is the data we will use to display multiple products on cart page 

    }, [cartItems])

    const handleQuantityChange = (productId, size, e) => { // Handles quantity input changes
        const newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            updateCartItemQuantity(productId, size, newQuantity);
        }
    };

    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-3'> {/* Corrected class name */}
                {/*mounting title comp and providing props*/}
                <Title text1={'YOUR'} text2={'CART'} ></Title>

            </div>
            <div className='cart-items-list mt-6 max-w-4xl mx-auto'>
                {cartData.length === 0 ? (
                    <p className="text-center text-gray-600 p-8">Your cart is empty. Go add some amazing products!</p>
                ) : (
                    cartData.map((item) => {
                        const productData = products.find((product) => product._id === item._id)

                        if (!productData) {
                            return (
                                <div key={`${item._id}-${item.size}`} className="p-4 mb-4 border rounded-lg bg-red-100 text-red-700">
                                    <p>Error: Product with ID "{item._id}" not found. It might have been removed.</p>
                                </div>
                            );
                        }

                        return (
                            <div key={`${item._id}-${item.size}`}
                                className='flex items-center justify-between p-4 mb-4 border rounded-lg shadow-sm '>

                                <div className='flex items-center gap-4 flex-grow'>
                                    <img className='w-20 h-20 object-cover rounded'
                                        src={productData.image && productData.image.length > 0 ? productData.image[0] : 'https://via.placeholder.com/80'}
                                        alt={productData.name || "Product image"} /> {/* Corrected img tag to be self-closing */}
                                    <div>
                                        <p className='text-base sm:text-lg font-medium'> {productData.name} </p>
                                        <p className="text-sm text-gray-600">{currency} {productData.price.toFixed(2)}</p>
                                        <p className="text-xs text-gray-500">Size: {item.size.toUpperCase()}</p>
                                    </div>

                                </div>

                                <div className='flex items-center mx-4'>
                                    <input
                                        type='number'
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item._id, item.size, e)} // Handles quantity input
                                        min='1'
                                        className='w-16 p-2 border rounded text-center text-gray-700'
                                    />
                                </div>

                                <div className='ml-4'>
                                    <img 
                                        src={bin_icon}
                                        alt="Remove item"
                                        className='w-6 h-6 cursor-pointer hover:opacity-75 transition-opacity'
                                        onClick={() => updateQuantity(item._id, item.size ,0)} // Handles item removal
                                    />
                                </div>

                            </div>

                        )

                    })
                )}
            </div>
            <div className='flex justify-end my-20'>
              <div className='w-full sm:w-[450px]'>
                <CartTotal />
                <div className='w-full text-end '>
                  
                  <button  onClick={()  => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3' > CHECKOUT </button>
                </div>
              </div>

            </div>
        </div>
    )
}

export default Cart