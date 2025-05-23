import { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext= createContext();

const ShopContextProvider = (props) => {
{/*CREATING STATE VARIABLES */}
    const currency = 'pkr';
    const delivery_fee=200;

    const [search,setSearch]= useState('');
    {/* If this is true then we will display the search BarProp, if false then our search bar is hidden */}
    const [ showSearch,setShowSearch]= useState(true);


    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch
    }

    return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>

    )

}

export default ShopContextProvider;