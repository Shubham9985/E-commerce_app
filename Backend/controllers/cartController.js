import userModel from "../models/userModel.js";

//add prodcust to user cart
const addToCart = async (req, res) => {
   

  try {
    const {userId , itemId, size} = req.body;

    const userData = await userModel.findById(userId);
    // Check if the product exists
    const cartData = await userData.cartData;
    if( cartData[itemId] ) {
      if(cartData[itemId][size]){
        cartData[itemId][size] += 1; // Increment quantity if item already exists
      }
      else {
        cartData[itemId][size] = 1; // Add new size with quantity 1
      }
    }
    else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1; // Add new item with size and quantity 1
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: 'Item added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.json({success: false, message: error.message});
  }
};


const updateCart = async (req, res) => {

  try{
    
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    cartData[itemId][size] = quantity; // Update the quantity for the specified item and size
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: 'Cart updated successfully' });
    
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

const getUserCart = async (req, res) => {
  try{
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    res.json({ success: true, cartData});
    
  }catch(error){
    console.error(error);
    res.json({ success: false, message: error.message });
  }

}

export { addToCart, updateCart, getUserCart };
