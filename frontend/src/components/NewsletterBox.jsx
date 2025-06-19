//this is newsletter part like subsciption part

import React from 'react'

const NewsletterBox = () => {
    const onSubmithandler = (event)=>{
        event.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe our newsletter to get flat 20% off on your first purchase</p>
        <p className='text-gray-400 mt-3'>Subscribe to our newsletter to get the latest news and offers</p>
        <form  onSubmit={onSubmithandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type='email' placeholder='Enter your email address' className='w-full sm:flex-1 outline-none' required />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4' >SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox