//this is for best seller products,everything related to it is here only

import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
    const { products } = useContext(ShopContext); // useContext is used to get the context value from the ShopContextProvider
    const [bestSellerProducts, setBestSellerProducts] = useState([]);
    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSellerProducts(bestProduct.slice(0, 5));
    }, []);
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLER'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, mi eget ultricies ultricies, mi mi ultricies mi .
            </p>
        </div>

        <div className='grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSellerProducts.map((item,index) => (
                    <ProductItem  key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))
            }
        </div>

    </div>
  )
}

export default BestSeller