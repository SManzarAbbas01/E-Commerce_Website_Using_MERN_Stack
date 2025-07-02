import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { ToastContainer, toast } from 'react-toastify'; // Import toast for messages
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = 'PKR';

function App() {
    // Use a specific key for the admin token
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('admin-token');
        console.log("App.jsx: Initial token from localStorage:", storedToken);
        return storedToken || '';
    });

    useEffect(() => {
        // When token state changes, update localStorage
        if (token) {
            localStorage.setItem('admin-token', token);
            console.log("App.jsx: Token set in localStorage and state:", token);
            // Optionally, show a success message after login
            if (token !== localStorage.getItem('admin-token')) { // Avoid showing on initial load if token already exists
                toast.success("Login successful!");
            }
        } else {
            // If token is empty (logout), remove it from storage
            localStorage.removeItem('admin-token');
            console.log("App.jsx: Token removed from localStorage (logged out).");
            // Optionally, show a logout message
            toast.info("Logged out successfully.");
        }
    }, [token]);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <ToastContainer />
            {token === ''
                ? <Login setToken={setToken} /> // This Login component must call the admin login endpoint
                :
                <>
                    <Navbar setToken={setToken} />
                    <hr />
                    <div className='flex w-full'>
                        <Sidebar />
                        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                            <Routes>
                                {/* Pass the admin token to all protected admin pages */}
                                <Route path='/add' element={<Add token={token} />} />
                                <Route path='/list' element={<List token={token} />} />
                                <Route path='/orders' element={<Orders token={token} />} />
                            </Routes>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default App;
