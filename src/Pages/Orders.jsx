import React, { useState, useEffect, useContext } from 'react';
import Title from '../Components/title';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';


const Orders = () => {
    const { backendUrl, token, currency } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
useEffect(() => {
  const loadOrders = async () => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError("Please log in to view your orders.");
      setLoading(false);
      return;
    }

    try {
      console.log("Token being sent:", token);

      const response = await axios.get(`${backendUrl}/api/order/userorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = response.data; // ✅ Axios stores data here

      if (responseData.success) {
        const sortedOrders = responseData.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrderData(sortedOrders);
      } else {
        throw new Error(responseData.message || "Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      setError(error.message || "An error occurred while loading orders.");
    } finally {
      setLoading(false);
    }
  };

  loadOrders();
}, [token, backendUrl]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    // Helper function for dynamic status styles
    const getStatusStyles = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Processing': return 'bg-yellow-100 text-yellow-800';
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return <div className='flex justify-center items-center min-h-[70vh]'><p className='text-lg'>Loading your orders...</p></div>;
    }
    if (error) {
        return <div className='flex justify-center items-center min-h-[70vh]'><p className='text-lg text-red-600'>Error: {error}</p></div>;
    }

    return (
        <div className='border-t pt-10 sm:pt-16 pb-16 min-h-[70vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='mb-8 text-center md:text-left'>
                <Title text1={'MY'} text2={'ORDERS'} />
                <p className='text-base text-gray-600 mt-2'>Track your recent orders and manage your purchases here.</p>
            </div>
            <div className='flex flex-col gap-8'>
                {orderData.length > 0 ? (
                    orderData.map((order) => (
                        <div key={order._id} className='bg-white rounded-lg shadow-md overflow-hidden border border-gray-200'>
                            <div className='bg-gray-50 p-4 flex flex-wrap justify-between items-center gap-4 border-b'>
                                <div>
                                    <p className="text-sm text-gray-500">ORDER ID</p>
                                    <p className="font-mono text-sm text-gray-700">{order._id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">DATE PLACED</p>
                                    <p className="font-medium text-gray-800">{formatDate(order.date)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">TOTAL</p>
                                    <p className="font-bold text-lg text-gray-900">{currency}{order.amount.toFixed(2)}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-semibold text-center ${getStatusStyles(order.status)}`}>
                                    {order.status}
                                </div>
                            </div>
                            <div className='p-4 space-y-4'>
                                {order.items.map((item) => (
                                    <div key={item._id} className='flex items-start gap-4'>
                                        <img className='w-20 h-20 object-cover rounded-md flex-shrink-0' src={item.Image} alt={item.name} />
                                        <div className='flex-grow'>
                                            <p className='font-semibold text-gray-800'>{item.name}</p>
                                            <p className='text-sm text-gray-600'>Quantity: <span className='font-medium'>{item.quantity}</span></p>
                                            <p className='text-sm text-gray-600'>Price: <span className='font-medium'>{currency}{item.price.toFixed(2)}</span></p>
                                        </div>
                                    </div>
                                ))}
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