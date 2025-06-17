import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ShopContext = createContext();
export const backendUrl = import.meta.env.VITE_BACKEND_URL

const ShopContextProvider = (props) => {
    {/*CREATING STATE VARIABLES */}
    const currency = ' pkr ';
    const delivery_fee = 200;
   
    const [products,setProducts]=  useState([])
    const [token, setToken]= useState('')

    const [search, setSearch] = useState('');
    {/* If this is true then we will display the search BarProp, if false then our search bar is hidden */}
    const [showSearch, setShowSearch] = useState(false);

    const navigate = useNavigate();
    //making navigate object to use in our cart page so when user clicks on checkout he is navigated to payment details page

    const [cartItems, setCartItems] = useState(() => {
        // Initialize cartItems with an empty object on initial load
        // You might want to pre-populate this based on 'products' from assets if needed
        let defaultCart = {};
        
        return defaultCart;
    });

    const addToCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }

    // Extracted from video: Function to update item quantity
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        if (!cartData[itemId]) { // Ensure product entry exists
            cartData[itemId] = {};
        }
        cartData[itemId][size] = quantity; // Directly set the quantity
        setCartItems(cartData);
    }

// to get tht total amount of products added in our file we make this func
    const getCartAmount =  () => {
        let totalAmount = 0 ;
        //
        for (const items in cartItems)
        {   // storing product data in this item info variable if the if statmenet matches
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items])
            {
                try {
                     if (cartItems[items][item] >0 )
                     {
                        totalAmount +=itemInfo.price *cartItems[items][item];
                     }

                }
                catch( error)
                {

                }
            }

        }
        return totalAmount;
    }

    {/* function to gte the quanity of product we have selected be displayed in out cart */}
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            }
        }
        return totalCount;
    }

const getProductData = async ()=>{
    try {
        const response = await axios.get(backendUrl+'/api/product/list')
        console.log(response.data)
        if(response.data.success){
            setProducts(response.data.products)
        }
        else{
            toast.error(error.message)
        }



    }
    catch(error){
        console.log(error);
        toast.error(error.message)
    }




}
useEffect(()=>{
 getProductData()


},[])


useEffect(()=>{
 if(!token && localStorage.getItem('token')){
    setToken(localStorage.getItem('token'))
 }


},[])







    {/* this value object contains variables and functions we want to access in any other component */}
    const value = {
        products, // Assuming 'products' is directly available from the import
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,// Added updateQuantity function
        getCartAmount,
        navigate,
        backendUrl,token,setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;