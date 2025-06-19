import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap2 text-center py-20 text-xs sm:text-small md:text-base text-gray-700'>
        <div>
            <img src={assets.exchange_icon} alt='exchange' className='w-12 m-auto mb-5' />
            <p className='font-semibold'>Easy Exchange Policy with </p>
            <p className='text-gray-500'>100% Money Back Guarantee</p>
        </div>

        <div>
            <img src={assets.quality_icon} alt='exchange' className='w-12 m-auto mb-5' />
            <p className='font-semibold'>7 days return policy</p>
            <p className='text-gray-500'>Without any charges</p>
        </div>

        <div>
            <img src={assets.support_img} alt='exchange' className='w-12 m-auto mb-5' />
            <p className='font-semibold'> Best Customer support</p>
            <p className='text-gray-500'>Queries are solved 24/7</p>
        </div>

    </div>
  )
}

export default OurPolicy