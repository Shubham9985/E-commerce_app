import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  
  const [visible , setVisible] = useState(false)
  const { setshowSearch , getCartCount , navigate ,token , setToken , setCartItems } = useContext(ShopContext);

  const logout = () =>{
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({}); 
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>

      <Link to='/'><img src={assets.logo} alt='logo' className='w-36' /></Link> 
      <ul className='hidden sm:flex  gap-5 text-sm text-gray-700'>
          <NavLink to='/' className='flex flex-col item-center gap-1'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            
          </NavLink>
          <NavLink to='/collection' className='flex flex-col item-center gap-1'>
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            
          </NavLink>
          <NavLink to='/about' className='flex flex-col item-center gap-1'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            
          </NavLink>
          <NavLink to='/contact' className='flex flex-col item-center gap-1'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            
          </NavLink>
        </ul>

        <div className='flex items-center gap-6'>
          <img src={assets.search_icon} alt='search' className='w-5 cursor-pointer' onClick={() => setshowSearch(true)}/>
          <div className='group relative'>
            <img onClick={()=> token ? null : navigate('/login')} src={assets.profile_icon} alt='profile' className='w-5 cursor-pointer'/>
            {/*this is for profile dropdown menu*/}
            {token &&
            <div className='absolute pt-4 right-0 dropdown-menu hidden group-hover:block'>
               <div className='flex flex-col gap-2 width-40 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                 <p className='cursor-pointer hover:text-black'>My Profile</p>
                 <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                 <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
               </div>
            </div>
            }
            
          </div>

          <Link to='/cart' className='relative'>
            {/*this is for mobile view*/}
            <img src={assets.cart_icon} alt='cart' className='w-5 min-w-5'/>
            <p className='absolute right-[-5px] bootom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
          </Link>
          <img onClick={() => setVisible(!visible)} src={assets.menu_icon} alt='menu' className='w-5 cursor-pointer sm:hidden'/>
        </div> 
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible? 'w-full' : 'w-0'}`}>
          <div className='flex flex-col text-gray-600'>
            <div onClick={()=> setVisible(!visible)} className='flex item-center p-3 gap-4 cursor-pointer'>
              <img src={assets.dropdown_icon} className='h-4 rotate-180'/>
              <p>Close</p>
            </div>
            <NavLink onClick={() => setVisible(!visible)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
            <NavLink onClick={() => setVisible(!visible)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
            <NavLink onClick={() => setVisible(!visible)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
            <NavLink onClick={() => setVisible(!visible)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
          </div>
        </div>
    </div>
  )
}
export default Navbar