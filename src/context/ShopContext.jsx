import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext= createContext();

const ShopContextProvider = (props) => {
{/*CREATING STATE VARIABLES */}
    const currency =' pkr ';
    const delivery_fee=200;

    const [search,setSearch]= useState('');
    {/* If this is true then we will display the search BarProp, if false then our search bar is hidden */}
    const [ showSearch,setShowSearch]= useState(false);

    const [cartItems,setCartItems]=useState({});

    const addToCart = async (itemId,size) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId])
        {
            if (cartData[itemId][size])
            {
                cartData[itemId][size]+=1;
            }
            else
            {
                cartData[itemId][size] = 1 ;
            }

            
        }
        else
        {
            cartData[itemId]= {};
            cartData[itemId][size]= 1;
        }

        setCartItems(cartData);
    
    }


    {/* function to gte the quanity of product we have selected be displayed in out cart */}

    const getCartCount = () => {
        let totalCount=0;
        for (const items in cartItems)
        {
            for(const item in cartItems[items])
            {
                if(cartItems[items][item] > 0 )
                {
                    totalCount += cartItems[items][item];
                }
            }
        }

        return totalCount;

    }

   {/* this value object contains variables and functions we want to access in any other component */}
    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount
    }

    return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>

    )

}

export default ShopContextProvider;