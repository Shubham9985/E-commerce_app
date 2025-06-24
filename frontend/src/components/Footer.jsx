import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} alt='logo' className='mb-5 w-32' />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, mi eget ultricies ultricies, mi mi ultricies mi, euismod mi mi euismod mi.
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>Contact</p>
                <ul className='flex flex-col gap-1 text-gray-600' >
                    <li>(+91) 987-6543-210</li>
                    <li>Forever@ecommerce.com</li>
                </ul>
            </div>

            
        </div>
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright 2025 @Forever. All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer