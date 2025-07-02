import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Assuming backendUrl is correctly imported from App.jsx or a similar config file
import { backendUrl } from '../App'; 

const Orders = ({ token }) => { // Destructure 'token' directly from props
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllOrders = async (token) => {
        // Only proceed if a token is provided
        if (!token) {
            console.log("No token provided, skipping order fetch.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await axios.post(
                `${backendUrl}/api/order/list`,
                {}, // Empty body as per your original request
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Correctly use the token string
                    },
                }
            );

            console.log("Response from server:", response.data);

            // Assuming the API response has a 'success' field and 'data' field for orders
            if (response.data.success) {
                setOrderData(response.data.data); // Update state with fetched order data
            } else {
                setError(response.data.message || "Failed to fetch orders.");
            }
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
    };

    // useEffect to fetch orders whenever the token changes
    useEffect(() => {
        fetchAllOrders();
    }, [token]); // Dependency array includes 'token' to re-run when it changes

    return (
        <div className="p-4 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Orders</h2>

            {loading && (
                <div className="text-center text-gray-600">Loading orders...</div>
            )}

            {error && (
                <div className="text-center text-red-500">Error: {error}</div>
            )}

            {!loading && !error && orderData.length === 0 && (
                <div className="text-center text-gray-600">No orders found.</div>
            )}

            {!loading && !error && orderData.length > 0 && (
                <div className="space-y-4">
                    {orderData.map((order) => (
                        <div key={order._id} className="border border-gray-200 rounded-md p-4 bg-gray-50 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold text-gray-700">Order ID: {order._id}</h3>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                    'bg-blue-100 text-blue-800'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-1">Total Amount: ${order.amount ? order.amount.toFixed(2) : 'N/A'}</p>
                            <p className="text-gray-600 mb-1">Date: {new Date(order.date).toLocaleDateString()}</p>
                            
                            {order.items && order.items.length > 0 && (
                                <div className="mt-3">
                                    <h4 className="font-medium text-gray-700 mb-1">Items:</h4>
                                    <ul className="list-disc list-inside text-gray-600">
                                        {order.items.map((item, index) => (
                                            <li key={index}>
                                                {item.name} (x{item.quantity}) - ${item.price ? item.price.toFixed(2) : 'N/A'} each
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
