import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState , setCurrentState] = useState('Login');
  //this state will be used to toggle between login and signup form
  const {token , setToken , navigate , backendUrl} = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) =>{
    event.preventDefault(); 
    //it will prevent the page from reloading when we submt the form
    try{
      if(currentState === 'Sign Up'){
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
           
        }
        else{
          toast.error(response.data.message)
        }
      }
      else{
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }
        else{
          toast.error(response.data.message)
        }
      }
    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(token){
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 text-gray-800'/>
      </div>
      {currentState === 'Login' ? '' :<input onChange={(e)=> setName(e.target.value)} value={name} className='border px-3 py-2 border-gray-800 w-full' type='text' placeholder='Name' required/>}
      <input onChange={(e)=> setEmail(e.target.value)} value={email} className='border px-3 py-2 border-gray-800 w-full' type='email' placeholder='Email' required/>
      <input onChange={(e)=> setPassword(e.target.value)} value={password} className='border px-3 py-2 border-gray-800 w-full' type='password' placeholder='Password' required/>
      <div className='flex text-sm w-full justify-between mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Password?</p>
        {
          currentState === 'Login' ? 
          <p onClick={()=> setCurrentState('Sign Up')} className='cursor-pointer'> Don't have an account? Sign Up</p> :
          <p  onClick={()=> setCurrentState('Login')} className='cursor-pointer'>Already have an account? Login</p>
        }
      </div>
      <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-600'> {currentState}</button>

    </form>
  )
}

export default Login