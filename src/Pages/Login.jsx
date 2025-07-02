import React, { useContext, useState } from 'react'; // Ensure useState is imported
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import both
import { useEffect } from 'react';



const Login = () => {
  const [currentState, setCurrentState] = useState('Login'); // 'Sign Up' or 'Login'
  const {token,setToken,navigate,backendUrl}=useContext(ShopContext)
 const [name,setName]=useState('')
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')
  const onSubmitHandler = async (e) => {
    e.preventDefault();
     
    try{
      if(currentState==='Sign Up'){
        const response = await axios.post(backendUrl+'/api/user/register',{name,email,password})
        
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          toast.success(response.data.message)
        }
        else{
          toast.error(response.data.message)
        }



      }
      else{
        const response = await axios.post(backendUrl+'/api/user/login',{email,password})
         if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          toast.success(response.data.message)
        }
        else{
          toast.error(response.data.message)
        }
      }

    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }





   
  };

useEffect(()=>{
if(token){
  navigate('/')
}
},[token])








  return (
    // This outer div already has bg-pink-50 as requested in the previous iteration.
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-pink-50">
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-full max-w-sm p-8 text-gray-800'> {/* Removed bg-white, rounded-lg, shadow-xl, border, and border-gray-100 */}
        {/* Form Title */}
        <div className='flex items-center gap-2 mb-6 mt-4'>
          <h2 className='font-prata text-3xl text-gray-900'>{currentState}</h2>
          <hr className='border-none h-[2px] w-8 bg-gray-800' />
        </div>

        {/* Input Fields */}
        <div className="w-full flex flex-col gap-4 mb-4">
          {currentState === 'Login' ? null : (
            <input
              onChange={(e)=>setName(e.target.value)}
              value={name}
              type="text"
              className='w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-[#FFC0CB] focus:border-[#FFC0CB] outline-none transition-all duration-200'
              placeholder='Your Name'
              required
            />
          )}
          <input
           onChange={(e)=>setEmail(e.target.value)}
           value={email}
            type="email"
            className='w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-[#FFC0CB] focus:border-[#FFC0CB] outline-none transition-all duration-200'
            placeholder='Email Address'
            required
          />
          <input
           onChange={(e)=>setPassword(e.target.value)}
           value={password}
            type="password"
            className='w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-[#FFC0CB] focus:border-[#FFC0CB] outline-none transition-all duration-200'
            placeholder='Password'
            required
          />
        </div>

        {/* Forgot Password / Create Account Link */}
        <div className='w-full flex justify-between text-sm text-gray-600 mb-6'>
          <p className='cursor-pointer hover:text-black transition-colors duration-200'>
            Forgot your password?
          </p>
          {currentState === 'Login' ?
            <p className='cursor-pointer hover:text-black transition-colors duration-200' onClick={() => setCurrentState('Sign Up')}>
              Create an account
            </p> :
            <p className='cursor-pointer hover:text-black transition-colors duration-200' onClick={() => setCurrentState('Login')}>
              Login Here
            </p>
          }
        </div>

        {/* Submit Button */}
        <button
          className='w-full bg-black text-white font-semibold px-8 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 shadow-md'
          type='submit'
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>

        {/* Terms & Conditions (commonly added for Sign Up) */}
        {currentState === 'Sign Up' && (
          <p className="text-xs text-gray-500 mt-4 text-center">
            By continuing, you agree to our <span className="font-medium text-black cursor-pointer hover:underline">Terms of Service</span> and <span className="font-medium text-black cursor-pointer hover:underline">Privacy Policy</span>.
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;