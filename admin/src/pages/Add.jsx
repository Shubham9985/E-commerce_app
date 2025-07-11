import React from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { formData } from 'form-data';

const Add = ({ token }) => {

  const [image1, setImage1] = React.useState(false);
  const [image2, setImage2] = React.useState(false);
  const [image3, setImage3] = React.useState(false);
  const [image4, setImage4] = React.useState(false);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("Men");
  const [subCategory, setSubCategory] = React.useState("Topwear");
  const [sizes, setSizes] = React.useState([]);
  const [bestseller, setBestseller] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Show immediate feedback
    toast.info('Uploading product... Please wait');

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('sizes', JSON.stringify(sizes))
      formData.append('bestseller', bestseller)

      if (image1) {
        formData.append('image1', image1)
      }
      if (image2) {
        formData.append('image2', image2)
      }
      if (image3) {
        formData.append('image3', image3)
      }
      if (image4) {
        formData.append('image4', image4)
      }

      console.log('Submitting form with data:', {
        name, description, price, category, subCategory, sizes, bestseller
      });
      console.log('Backend URL:', backendUrl);
      console.log('Token:', token);

      const response = await axios.post(backendUrl + '/api/product/add', formData , {
        headers: { token }
      })

      console.log('Full response:', response);
      console.log('Response data:', response.data);

      if (response.data.success) {
        console.log('Success! Showing success toast');
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setPrice('')
        setSizes([])
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      } else {
        console.log('Error! Showing error toast');
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('Catch block error:', error)
      console.log('Error response:', error.response?.data)
      toast.error(error.response?.data?.message || error.message || 'Something went wrong!')
    } finally {
      setLoading(false);
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-3'>
          <label htmlFor="image1">
            <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="upload" className='w-20' />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>

          <label htmlFor="image2">
            <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="upload" className='w-20' />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="upload" className='w-20' />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="upload" className='w-20' />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full max-w-[500px] px-3 py-2' placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' placeholder='Write here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full max-w-[500px] px-3 py-2' required>
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full max-w-[500px] px-3 py-2' required>
            <option value="">Select Sub Category</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full sm:w-[120px] px-3 py-2' type="number" placeholder='Enter Price' required />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>

          <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
            <p className={`${sizes.includes("S") ? 'bg-pink-100 text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? 'bg-pink-100 text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? 'bg-pink-100 text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
            <p className={`${sizes.includes("XL") ? 'bg-pink-100 text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
            <p className={`${sizes.includes("XXL") ? 'bg-pink-100 text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>

        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestseller">Add to Best Seller</label>
      </div>

      <button
        className={`w-28 py-3 mt-4 text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
        type='submit'
        disabled={loading}
      >
        {loading ? 'Adding...' : 'ADD'}
      </button>
    </form>
  )
}

export default Add