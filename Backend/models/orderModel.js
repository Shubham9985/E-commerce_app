import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: {type: Array, required: true},
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'Pending',required: true },
    paymentMethod: { type: String, required: true },
    payment:{type: Boolean, default: false,required: true },
    date: { type: Number, required: true  },
    
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema); 
export default orderModel;
// This model defines the structure of an order in the database.
// It includes references to the user who placed the order, the items in the order, and the total amount.