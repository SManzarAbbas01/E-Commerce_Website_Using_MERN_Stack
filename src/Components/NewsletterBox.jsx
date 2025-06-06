import React from 'react';

const NewsletterBox = () => {
  // This prevents the default form submission behavior, stopping page reload.
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // In a real application, you'd handle the email submission here,
    // e.g., send it to an API or update state.
    console.log("Newsletter subscribed!"); // Placeholder for actual submission logic
    event.target.reset(); // Optionally clear the form after submission
  };

  return (
    <div className='flex flex-col items-center py-16 px-4 bg-pink-50 text-center rounded-lg shadow-lg max-w-4xl mx-auto my-16'>
      <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 leading-tight'>
        Subscribe now to bag 20% off your next order!
      </h2>
      <p className='text-base text-gray-500 mb-8 max-w-xl'>
        Stay updated with our latest collections, exclusive offers, and more!
      </p>
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg flex rounded-full overflow-hidden border border-gray-300 focus-within:border-[#FFC0CB] focus-within:ring-1 focus-within:ring-[#FFC0CB] transition-all duration-300'> {/* Updated border color */}
        <input
          className='flex-1 py-3 px-5 outline-none text-gray-700 placeholder-gray-400 bg-white'
          type="email"
          placeholder='Enter your Email'
          required
        />
        <button
          className='bg-black text-white text-sm sm:text-base font-semibold px-8 sm:px-10 py-3 hover:bg-gray-800 transition-colors duration-300'
          type="submit"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;