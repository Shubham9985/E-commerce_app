// This is the context provider file for the shop. It manages global state and functions for the ecommerce app.
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    // Currency symbol and delivery fee
    const currency = '$';
    const delivery_fee = 9;
    // Backend API base URL from environment variable
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // State variables
    const [search, setSearch] = useState('');
    const [showSearch , setshowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({}); // Cart items object
    const [products , setProducts] = useState([]); // All products
    const [token,setToken] = useState('') // Auth token
    const navigate = useNavigate();
    
    // Add an item to the cart
    const addToCart = async (itemId , size) =>{
        if(!size){
            toast.error('Please select a size');
            return;
        }
        let cartData = structuredClone(cartItems);
        // If item already exists in cart, increment quantity
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
        // If logged in, sync cart with backend
        if(token){
            try{
                await axios.post(backendUrl + '/api/cart/add', {itemId,size}, {headers:{token}});
            }catch(error){
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    // Get total count of items in cart
    const getCartCount = () =>{
        let count = 0;
        for(let item in cartItems){
            for(let size in cartItems[item]){
                try {
                    if(cartItems[item][size] > 0){
                        count += cartItems[item][size];
                    }
                } catch(error) {
                    // Ignore errors for undefined/null
                }
            }
        }
        return count;
    }

    // Update quantity of a specific item/size in cart
    const updateQuantity = async (itemId , size , quantity) =>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        // Sync with backend if logged in
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
        // (Optional) Could be used to sync cart with local storage or backend
    }, [cartItems]);

    // Calculate total cart amount
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
                    // Ignore errors for undefined/null
                }
            }
        }
        return totalAmount;
    }

    // Fetch all products from backend
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

    // Fetch user's cart from backend (if logged in)
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
        // Fetch products on mount
        getProductsData();
    }, []);

    useEffect(() => {
        // On mount, if token exists in localStorage, set it and fetch user cart
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, []);

    // Context value to be provided to all children
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
