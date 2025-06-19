import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center pt-10 text-2xl border-t'>
        <Title text1={'CONTACT '} text2={'US'}/>
      </div>
      <div className='flex flex-col my-10 justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} alt='contact' className='w-full md:max-w-[480px]' />
        <div className='flex flex-col items-start justify-center gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>377 William Station <br/>Suite 350, Washington USA</p>
          <p className='text-gray-500'>(+91) 987-6543-210<br/>
          Vistelle@ecommerce.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Vistelle</p>
          <p clasname='text-gray-500'>Learn more about us.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Vistelle</button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default Contact