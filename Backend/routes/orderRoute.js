import express from 'express';
import {
    verifyRazorpay,
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus
} from '../controllers/orderController.js';
import  adminAuth  from '../middleware/adminAuth.js';
import  userAuth  from '../middleware/auth.js';
import authUser from '../middleware/auth.js';


const orderRouter = express.Router();

//admin features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

//payment routes
orderRouter.post('/place',authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

//user features
orderRouter.post('/userOrders', authUser, userOrders);

//verify payment
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

export default orderRouter;

