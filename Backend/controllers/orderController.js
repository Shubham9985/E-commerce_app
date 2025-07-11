import { response } from 'express';
import Order from '../models/orderModel.js';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import User from '../models/userModel.js';
import Stripe from 'stripe';
import razorpay from 'razorpay';

const currency = 'inr';
const deliveryCharge = 9

//gateway initialized
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

//placing order using COD
const placeOrder = async (req, res) => {
    

    try {
        const { userId, items, amount, address } = req.body;
        const orderData ={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment: false,
            date:Date.now()
        };

        const newOrder = await orderModel(orderData);
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true, message:"Order placed successfully"})
        
    } catch (error) {
        console.log(error);
        res.json({ success:false, message: error.message });
    }
};

//placing order using stripe method
const placeOrderStripe = async (req, res) => {
    try{
        const { userId ,items ,  amount , address } = req.body;
        const {origin} = req.headers;
        const orderData ={
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment: false,
            date:Date.now()
        };
        const newOrder = await orderModel(orderData);
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data:{
                currency : currency,
                product_data:{
                    name:item.name
                    
                },
                unit_amount: item.price * 100 // Stripe expects amount in cents
            }, 
            quantity: item.quantity
        }))

        line_items.push({
            price_data:{
                currency : currency,
                product_data:{
                    name:'Delivery Charges'
                    
                },
                unit_amount: deliveryCharge * 100 // Stripe expects amount in cents
            }, 
            quantity: 1

        })
        const session = await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })
        res.json({ success: true, session_url: session.url });

    }
    catch (error) {
        console.log(error);
        res.json({ success:false, message: error.message });
    }
}

//placing order using razorpay method
const placeOrderRazorpay = async (req, res) => {
    

    try {
        const { userId, items, amount, address } = req.body;
        
       const orderData ={
            userId,
            items,
            address,
            amount,
            paymentMethod:"Razorpay",
            payment: false,
            date:Date.now()
        };

        const newOrder = await orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100, // amount in the smallest currency unit
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
             
        };

        await razorpayInstance.orders.create(options , (error,order)=>{
            if(error) {
                console.log(error);
                return res.json({ success: false, message: error.message });
            }  
            res.json({ success: true, order }); 
        })
            
    } catch (error) {
        console.log(error);
        res.json({ success:false, message: error.message });
    }
};

const verifyRazorpay = async (req, res) => {
    try {
        const {userId, razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment: true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}});
            res.json({ success: true, message: "Payment successful" });
        }
        else{
            res.json({success: false, message: error.message});
        }
    } catch (error) {
        console.log(error);
        res.json({ success:false, message: error.message });
        
    }
}

//all order data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error)
        res.json({ success:false, message: error.message });
    }
};

//order data for frontend
const userOrders = async (req, res) => {
    

    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({success:true , orders});
    } catch (error) {
        console.log(error)
        res.json({ success:false, message: error.message });
    }
};

//updating order status from admin panel
import mongoose from 'mongoose';
const updateStatus = async (req, res) => {
   

    try {
         
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });

        res.json({success:true,message:"Status updated"});
    } catch (error) {
       console.log(error)
        res.json({ success:false, message: error.message });
    }
};

export {
    verifyRazorpay,
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus
};