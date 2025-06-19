import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-center pt-8 text-2xl border-t'>
        <Title text1={'ABOUT '} text2={'US'}/>
      </div>

      <div className='flex flex-col sm:flex-row gap-16 my-10'>
        <img src={assets.about_img} alt='about' className='w-full md:max-w-[450px]' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus corporis modi libero aspernatur aliquid necessitatibus voluptate consequatur, omnis ex tempora nam eius impedit cumque illo, dignissimos explicabo quod facilis deserunt.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sunt doloremque alias magni quos facere numquam neque, maxime earum. Quibusdam, sint. Veniam praesentium ab quasi optio eaque consequuntur unde esse.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore consectetur fugiat nobis quos. Quod in nisi fuga? Nam repellat odit quasi quia adipisci ratione ipsa repellendus beatae? Nostrum, vel asperiores.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY '} text2={'WE '}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='flex border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore consectetur fugiat nobis quos. Quod in nisi fuga? Nam repellat odit quasi quia adipisci ratione ipsa repellendus beatae? Nostrum, vel asperiores.</p>
          </div>
          <div className='flex border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5'>
            <b>Customer Satisfaction:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore consectetur fugiat nobis quos. Quod in nisi fuga? Nam repellat odit quasi quia adipisci ratione ipsa repellendus beatae? Nostrum, vel asperiores.</p>
          </div>
          <div className='flex border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5'>
            <b>Affordable Prices:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore consectetur fugiat nobis quos. Quod in nisi fuga? Nam repellat odit quasi quia adipisci ratione ipsa repellendus beatae? Nostrum, vel asperiores.</p>
          </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About