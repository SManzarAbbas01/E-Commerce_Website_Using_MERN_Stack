import React , { useContext, useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { ShopContext } from '../context/ShopContext'
import Title from './title'

const LatestCollection = () => {



    const {products} = useContext(ShopContext)
   const [latestProducts,setLatestProducts]= useState([]);
   {/*initializing it with empty array, whenever this component is loaded, we have to make 10 products from products in this latestProducts state, so we use useEffect() hook*/}

   useEffect(() => { 
    {/*to get 10 products in latestProductsState*/}
    setLatestProducts(products.slice(0,10));
    
    },[])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>  
            <Title text1={"LATEST"} text2={"COLLECTION"} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            loren ipsum  buhbhbuibuhbhjb huhbu uhuuhui huuhuoi hubuihuihuoi
            </p>

            
        </div>

        {/* in latest collection section we are displaying recently added 10 products , storing 10 products from out "products" array in 1 state variable*/}
         
        {/*rendering products  */}
        <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                    latestProducts.map((item,index)=>(
                        <ProductItem  key={index} id={item._id} image={item.image} name={item.name} price={item.price} />

                ))
            
            }
        </div>
      
    </div>
  )
}

export default LatestCollection
