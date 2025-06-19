import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {productId} = useParams();
  const {products , currency , addToCart } = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image , setImage] = useState('');
  const [size , setSize] = useState('');

  const fetchProductData = async() =>{
    products.map((item) =>{
      if(item._id === productId){
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId,products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*---product data*/}
      <div className='flex flex-col sm:flex-row gap-12 sm:gap-12'>
        {/*----product images*/}
        <div className='flex-1 flex  flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index) => ( //side bar images
                <img key={index} src={item} alt="image" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border-2 border-transparent hover:border-black' onClick={() => setImage(item)}/>
              ))
            }

          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="image" className='w-full h-auto '/>
          </div>
        </div>
        {/*----product information */}
        <div className='flex-1 '>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center mt-2 gap-1'>
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>
              {currency}{productData.price}
            </p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex  flex-col gap-4 my-8'>
               <p className=''>Select Size</p>
               <div className='flex gap-2'>
                {
                  productData.sizes.map((item,index) => (
                    <button key={index} className={`border border-gray-400 px-4 py-2 rounded-full ${size === item ? 'border-orange-800' : ''}`} onClick={() => setSize(item)}>{item}</button>
                  ))
                }
               </div>
            </div>
            <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-600' onClick={() => addToCart(productData._id,size)}>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5'/>
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original Product</p>
              <p>COD is availiable on this product</p>
              <p>Easy return and exchange policy</p>
            </div>
        </div>
      </div>

      {/*----Description and review*/}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)+</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, sit voluptas. Nulla omnis suscipit labore voluptas quis! Earum, culpa? Asperiores beatae perferendis nostrum eveniet harum odit placeat quaerat in minus? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus tempore nostrum facere, aliquid animi inventore amet. Quaerat nobis, commodi architecto ut perspiciatis molestias maiores velit repellat voluptates voluptatem sit possimus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam labore officia hic explicabo et doloremque eaque libero maiores nam? Non reprehenderit repellat ex veniam placeat assumenda aut labore hic aliquam.</p>

        </div>
      </div>

      {/* ----related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
      
    </div>
  ): <div className='opacity-0'>Loading...</div>
}

export default Product