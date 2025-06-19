import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import { assets } from '../assets/assets';
import Title from '../components/Title';

const Collection = () => {
  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [Category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sort, setSort] = useState('relevant');

  const toggleCategory = (e) =>{
    if(Category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else{
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) =>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else{
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilter = () =>{
    let productsCopy = products.slice()
    if(search && showSearch){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(Category.length > 0){
      productsCopy = productsCopy.filter(item => Category.includes(item.category));
    }
    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProducts(productsCopy);
  }

  const sortProducts = ()=>{
    let productsCopy = filterProducts.slice();
    if(sort === 'low-high'){
      setFilterProducts(productsCopy.sort((a,b) => a.price - b.price));
    }
    else if(sort === 'high-low'){
      setFilterProducts(productsCopy.sort((a,b) => b.price - a.price)); 
    }
  }

  useEffect(() => {
    sortProducts();
  }, [sort]);

  useEffect(() => {
    applyFilter();
  }, [Category, subCategory, search, showSearch , products ]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

    {/* filtering options*/}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor pointer gap-2'>
          FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter? 'rotate-90' : ''}`}/>
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory}/>Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory}/>Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory}/>Kids
            </p>
          </div>
        </div>
        {/*sub filter options*/}

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory}/>Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
            </p>
          </div>
        </div>
      </div>

      {/*right side products functionality*/}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
           <Title text1={'ALL'} text2={'Collection'}/>
          <select className='border border-gray-300 px-2 text-sm' value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value='relevant'>Sort by : Default</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>



        {/*product items*/}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
        filterProducts.map((item,index) => (
          <ProductItem  key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))
        }
       </div>
      </div>  
    </div>
  )
}

export default Collection;