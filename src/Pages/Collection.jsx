import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const Collection = () => {
{/*getting data of all products using contextAPI*/}
 const {products} =useContext(ShopContext);



  return (
    <div >
      
    </div>
  )
}

export default Collection
