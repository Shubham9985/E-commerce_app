import React, { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

  const [method, setMethod] = useState('COD');
  const [formData, setformData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setformData(data => ({ ...data, [name]: value }))
  }
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products
  } = useContext(ShopContext);


  const initPay = (order) =>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or ₹500.
      currency: order.currency,
      name: 'Vistelle',
      description: 'Order Description',
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      receipt: order.receipt,
      handler : async (response) => {
        console.log(response);
        try {
          const {data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response , {headers:{token}})
          if(data.success){
            
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
          
        }
        
      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee

      }

      switch (method) {
        //API calls for COD
        case 'COD':
          const response = await axios.post(backendUrl + '/api/order/place' , orderData,{headers :{token}})
          if(response.data.success){
            setCartItems({})
            navigate('/orders')
          } else{
            toast.error(response.data.message)
          }
          break;
        
        //API calls for Stripe
        case 'Stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          }
          else{
            toast.error(responseStripe.data.message)
          }
          break;

        //API calls for Razorpay
        case 'Razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });
          if( responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order)
          }
          break;

        default:
          break;
      }

    }
    catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>


      <div className='flex flex-col  gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY '} text2={'DETAILS'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type='text' placeholder='First Name' className='rounded border py-1.5 px-3.5 w-full border-gray-300' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type='text' placeholder='Last Name' className='rounded border py-1.5 px-3.5 w-full border-gray-300' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type='email' placeholder='E-mail address' className='rounded border py-1.5 px-3.5 w-full border-gray-300' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type='text' placeholder='Street' className='rounded border py-1.5 px-3.5 w-full border-gray-300' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type='text' placeholder='City' className='rounded border py-1.5 px-3.5 w-full border-gray-300' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type='text' placeholder='State' className='rounded border py-1.5 px-3.5 w-full border-gray-300' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type='number' placeholder='Zip Code' className='rounded border py-1.5 px-3.5 w-full border-gray-300' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type='text' placeholder='Country' className='rounded border py-1.5 px-3.5 w-full border-gray-300' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type='number' placeholder='Contact Number' className='rounded border py-1.5 px-3.5 w-full border-gray-300' />
      </div>

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT '} text2={'METHOD'} />
          <div className='flex flex-col gap-3 lg:flex-row'>
            <div onClick={() => setMethod('Stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'Stripe' ? 'bg-green-500' : ''}`}></p>
              <img src={assets.stripe_logo} alt='stripe' className='h-5 mx-4' />
            </div>
            <div onClick={() => setMethod('Razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'Razorpay' ? 'bg-green-500' : ''}`}></p>
              <img src={assets.razorpay_logo} alt='stripe' className='h-5 mx-4' />
            </div>
            <div onClick={() => setMethod('COD')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'COD' ? 'bg-green-500' : ''}`}></p>
              <p className='text-gray-600 text-sm font-medium mx-4'>Cash on Delivery</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm active:bg-gray-600'>PLACE ORDER</button>
          </div>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder;