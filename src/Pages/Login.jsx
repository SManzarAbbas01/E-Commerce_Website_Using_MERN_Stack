import React, { useState } from 'react'; // Ensure useState is imported

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up'); // 'Sign Up' or 'Login'

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // In a real application, you'd handle form submission here.
    // For example, sending data to an API for authentication or registration.
    console.log(`Submitting form for: ${currentState}`);
    // You would typically reset the form or show a success/error message here
  };

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
              type="text"
              className='w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-[#FFC0CB] focus:border-[#FFC0CB] outline-none transition-all duration-200'
              placeholder='Your Name'
              required
            />
          )}
          <input
            type="email"
            className='w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:ring-1 focus:ring-[#FFC0CB] focus:border-[#FFC0CB] outline-none transition-all duration-200'
            placeholder='Email Address'
            required
          />
          <input
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