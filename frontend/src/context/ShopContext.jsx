//this is the context provider file, here we are passing the value to the context provider and then we are passing it to the children component.
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 9;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch , setshowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products , setProducts] = useState([]);
    const [token,setToken] = useState('')
    const navigate = useNavigate();
    

    const addToCart = async (itemId , size) =>{

        if(!size){
            toast.error('Please select a size');
            return;
        }

        let cartData = structuredClone(cartItems);


        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if(token){
            try{
                await axios.post(backendUrl + '/api/cart/add', {itemId,size}, {headers:{token}});

            }catch(error){
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartCount = () =>{
        let count = 0;
        for(let item in cartItems){
            for(let size in cartItems[item]){
                try {
                    if(cartItems[item][size] > 0){
                        count += cartItems[item][size];
                    }
                } catch(error) {

                }
            }
        }
        return count;
    }

    const updateQuantity = async (itemId , size , quantity) =>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if(token){
            try{
                await axios.post(backendUrl + '/api/cart/update', {itemId,size,quantity}, {headers:{token}});
            }catch(error){
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    useEffect(() => {
        //this is used to get the cart items from the local storage and set it to the cartItems state.
    }, [cartItems]);

    const getCartAmount = async =>{
        let totalAmount = 0;
        for(let item in cartItems){
            let itemInfo = products.find((product) => product._id === item);
            for(let size in cartItems[item]){
                try {
                    if(cartItems[item][size] > 0){
                        totalAmount += cartItems[item][size] *  itemInfo.price;
                    }
                } catch(error) {

                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try{
            const response = await axios.get(backendUrl + '/api/product/list');
            if(response.data.success){
                setProducts(response.data.products);
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

    const getUserCart = async (token) => {
        try{
            const response = await axios.post(backendUrl + '/api/cart/get',{}, {headers:{token}});
            if(response.data.success){
                setCartItems(response.data.cartData);
            }
            else{
                toast.error(response.data.message)
            }
        }catch(error)
        {
            console.log(error);
            toast.error(error.message);
        }
        
    }

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, []);

    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setshowSearch,
        cartItems, addToCart,setCartItems, getCartCount , updateQuantity , getCartAmount , navigate , backendUrl , token , setToken
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>

    )

}

export default ShopContextProvider;
