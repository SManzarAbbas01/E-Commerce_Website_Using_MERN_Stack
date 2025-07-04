import React,{useContext,useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';

const Product = () => {
  const {productId} = useParams();
  const { products ,currency ,addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image , setImaege] = useState('');
  const [size,setSize] = useState('')


  const fetchProductData = async () => {
  products.map((item) => {
    if(item._id === productId){
      setProductData(item)
      setImaege(item.Image[0])
      
      
      return null
    }
  })
 }



 useEffect(()=>{
 fetchProductData()
 },[productId,products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */ }
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
      {/* product images*/}
      <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-betweem sm:justify-normal sm:w-[18.7%] w-full'>
        {
            productData.Image.map((item, index) => {
          return (
          <img
                src={item}
                  key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
          />
                 );
                   })
        } 

      </div>
      <div className='w-full sm:w-[80%]'> 
        <img className='w-full h-auto' onClick={()=>setImaege(item)} src={image} alt="" />
      </div>


      </div>
        {/* product details */}
          <div className='flex-1 '>
          <h1 className='font-medium text-2xl mt-2'> {productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>


          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 sm:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p> Select Size</p>
            <div className='flex-gap-2'>
              {productData.Sizes.map((item,index) =>(
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? `border-orange-500` : ``}`} key={index}> {item} </button>

              ) )}

            </div>

          </div>
        <button  onClick ={ () => addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm  active:bg-gray-700'> Add to Cart </button>
        <hr className='mt-8 sm:w-4/5' ></hr>
          </div>


      </div>
      

    </div>
  ): <div className='opacity-0'></div>
}

export default Product
