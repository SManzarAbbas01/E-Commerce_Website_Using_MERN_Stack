import React, { useContext } from 'react';
import Title from '../Components/title';
import { ShopContext } from '../Context/ShopContext';

const Orders = () => {
    const { products, currency } = useContext(ShopContext);

    // Get current date for display purposes
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('en-US', { month: 'short' })} ${currentDate.getFullYear()}`;

    // For demonstration, we'll use a slice of products as mock orders.
    // In a real application, you would fetch actual user orders from a backend.
    const userOrders = products.slice(0, 3).map((product, index) => ({
        ...product,
        orderId: `ORD-${Math.floor(Math.random() * 100000)}`, // Generate a mock order ID
        quantity: 1, // Mock quantity
        size: 'M', // Mock size
        status: 'Ready to Ship', // Mock status
        deliveryDate: formattedDate,
    }));

    return (
        <div className='border-t pt-10 sm:pt-16 pb-16 min-h-[70vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='mb-8 text-center md:text-left'>
                <Title text1={'MY'} text2={'ORDERS'} />
                <p className='text-base text-gray-600 mt-2'>Track your recent orders and manage your purchases here.</p>
            </div>

            <div className='flex flex-col gap-6'>
                {userOrders.length > 0 ? (
                    userOrders.map((order, index) => (
                        <div key={order.orderId || index} className='bg-white rounded-lg shadow-md overflow-hidden border border-gray-200'>
                            <div className='py-4 px-4 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                                {/* Order Item Details (Left Side) */}
                                <div className='flex items-start gap-4 sm:gap-6 text-sm flex-grow'>
                                    <img className='w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md flex-shrink-0' src={order.Image[0]} alt={order.name} />
                                    <div className='flex flex-col justify-center'>
                                        <p className='sm:text-lg font-semibold text-gray-800 mb-1'>{order.name}</p>
                                        <p className='text-base text-gray-700 mb-1'>{currency}{order.price} per item</p>
                                        <div className='flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600'>
                                            <p>Quantity: <span className='font-medium'>{order.quantity}</span></p>
                                            <p>Size: <span className='font-medium'>{order.size}</span></p>
                                            <p>Order ID: <span className='font-medium text-gray-500'>{order.orderId}</span></p>
                                        </div>
                                        <p className='mt-2 text-sm text-gray-500'>Order Date: <span className='font-medium'>{order.deliveryDate}</span></p>
                                    </div>
                                </div>

                                {/* Order Status & Actions (Right Side) */}
                                <div className='md:w-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-8 mt-4 md:mt-0 md:pl-4 md:border-l border-gray-200'>
                                    <div className='flex items-center gap-2 text-sm sm:text-base'>
                                        <span className='min-w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0'></span>
                                        <p className='font-medium text-gray-700'>{order.status}</p>
                                    </div>
                                    <button className='bg-black text-white px-5 py-2 text-sm font-medium rounded-md hover:bg-gray-800 transition-colors duration-200'>
                                        Track Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 text-lg mt-10">You don't have any orders yet.</p>
                )}
            </div>
        </div>
    )
}

export default Orders;