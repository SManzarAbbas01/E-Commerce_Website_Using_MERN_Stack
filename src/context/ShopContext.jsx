import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

export const ShopContext = createContext(null);
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    
    const currency = ' pkr ';
    const delivery_fee = 200;
    const navigate = useNavigate();

    // --- DATA FETCHING ---

    const getProductData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message || "Failed to fetch products.");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Error fetching products. Please try again.");
        }
    };

    // Correctly loads the user's cart from the database
    const loadCartData = async (authToken) => {
        try {
            // Use GET request as defined in the backend route for fetching data
            const response = await axios.get(backendUrl + '/api/cart/get', {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error("Could not load cart data:", error.response ? error.response.data.message : error.message);
        }
    };

    // --- CART MANAGEMENT ---

    const addToCart = async (itemId, size) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (!newCart[itemId]) {
                newCart[itemId] = {};
            }
            newCart[itemId][size] = (newCart[itemId][size] || 0) + 1;
            return newCart;
        });

        if (token) {
            try {
                await axios.post(
                    backendUrl + '/api/cart/add',
                    { itemId, size },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.error("Error adding to cart on backend:", error.response ? error.response.data : error);
                toast.error(error.response?.data?.message || "Failed to update cart.");
            }
        }
    };
    
    const updateQuantity = async (itemId, size, quantity) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (newCart[itemId]) {
                if (quantity > 0) {
                    newCart[itemId][size] = quantity;
                } else {
                    delete newCart[itemId][size];
                    if (Object.keys(newCart[itemId]).length === 0) {
                        delete newCart[itemId];
                    }
                }
            }
            return newCart;
        });

        if (token) {
            try {
                // *** FIX: Use the 'token' state variable, not the undefined 'authToken' ***
                await axios.post(
                    backendUrl + '/api/cart/update',
                    { itemId, size, quantity }, 
                    { headers: { Authorization: `Bearer ${token}` }}
                );
            } catch (error) {
                console.error("Error updating cart on backend:", error.response ? error.response.data : error);
                toast.error(error.response?.data?.message || "Failed to update cart.");
            }
        }
    };
    
    // --- AUTH & LOGOUT ---
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
    };

    // --- CALCULATIONS ---

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo) {
                for (const size in cartItems[itemId]) {
                    totalAmount += itemInfo.price * cartItems[itemId][size];
                }
            }
        }
        return totalAmount;
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                totalCount += cartItems[itemId][size];
            }
        }
        return totalCount;
    };

    // --- EFFECTS ---

    useEffect(() => {
        async function initialLoad() {
            await getProductData();
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
            }
        }
        initialLoad();
    }, []);

    useEffect(() => {
        if (token) {
            loadCartData(token);
        } else {
            setCartItems({});
        }
    }, [token]);

    const contextValue = {
        products,
        cartItems,
        token,
        setToken,
        logout,
        addToCart,
        updateQuantity,
        getCartCount,
        getCartAmount,
        currency,
        delivery_fee,
        navigate,
        backendUrl,
        search,
        setSearch,
        showSearch,
        setShowSearch,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
