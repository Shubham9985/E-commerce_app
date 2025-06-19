import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const[list, setlist] = useState([]);

  const fetchList = async() =>{
    try{
      const response = await axios.get(backendUrl + '/api/product/list', {
        headers: { token }
      })
      if(response.data.success){
        setlist(response.data.products);
      }
      else{
        toast.error(response.data.message)
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async(id) =>{
    try{
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, {headers: { token }})
      if(response.data.success){
        toast.success(response.data.message);
        await fetchList();
      }
      else{
        toast.error(response.data.message)
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>Products</h1>
        <p className='text-gray-600'>Manage your product inventory ({list.length} products)</p>
      </div>

      <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-4 px-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-700'>
          <span>Image</span>
          <span>Product Details</span>
          <span>Category</span>
          <span>Price</span>
          <span>Actions</span>
        </div>

        <div className='divide-y divide-gray-200'>
        {
          list.map((item,index) => (
              <div key={item._id} className='grid grid-cols-[1fr_3fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-4 px-4 hover:bg-gray-50 transition-colors'>
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className='w-12 h-12 object-cover rounded-md border border-gray-200'
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/48x48/f3f4f6/9ca3af?text=No+Image';
                  }}
                />
                <div>
                  <p className='font-medium text-gray-900'>{item.name}</p>
                  <p className='text-xs text-gray-500 mt-1'>{item.description?.slice(0, 50)}...</p>
                </div>
                <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full'>{item.category}</span>
                <p className='font-semibold text-gray-900'>{currency}{item.price}</p>
                <button
                  className='text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded-md transition-colors text-sm font-medium'
                  onClick={() => removeProduct(item._id)}
                >
                  Remove
                </button>
              </div>
          ))
        }
        </div>
      </div>
    </>
  )
}

export default List;