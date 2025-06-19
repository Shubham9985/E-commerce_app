import React, { useContext , useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';


const SearchBar = () => {
    const { search , showSearch, setSearch, setshowSearch} = useContext(ShopContext);
    const location = useLocation();
    const [Visible, setVisible] = useState(false);

    useEffect(() => {
        if(location.pathname.includes('/collection') && showSearch){
            setVisible(true);
        }
        else{
            setVisible(false);
        }
    }, [location]);

  return showSearch && Visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input type='text' placeholder='Search for products' className='outline-none flex-1 bg-inherit text-sm' value={search} onChange={(e) => setSearch(e.target.value)}/>
            <img src={assets.search_icon} alt='search' className='w-4'/>
        </div>
        <img src={assets.cross_icon} alt='cross' className=' inline w-3 cursor-pointer' onClick={() => setshowSearch(false)}/>
    </div>
  ) : null
}

export default SearchBar