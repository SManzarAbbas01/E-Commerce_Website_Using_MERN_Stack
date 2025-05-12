
import { ShopContext } from '../context/ShopContext';
import React , { useContext, useEffect, useState } from 'react';
import Title from './title';
import ProductItem from './ProductItem';


const BestSeller = () => {

    {/*Calling our products data using context API*/}
    const {products} = useContext(ShopContext);
    {/*adding a state variable with name best seller and initialize it using useState , then finding best seller products from products data and save them  in this bestSeller state */}
    const[bestSeller, setBestSeller]=useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
          const bestProducts = products.filter(item => item.bestseller);
          setBestSeller(bestProducts.slice(0, 5));
        }
      }, [products]); // ← runs every time products
      

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={"BEST"} text2={"SELLER PRODUCTS"} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            SHOP OUR BEST SELLING PRODUCTS BELOW!
            </p>
        </div>

        <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                    bestSeller.map((item,index)=>(
                        <ProductItem  key={index} id={item._id} image={item.image} name={item.name} price={item.price} />

                ))
            
            }
        </div>
      


        
         
      
    </div>
  )
}

export default BestSeller
