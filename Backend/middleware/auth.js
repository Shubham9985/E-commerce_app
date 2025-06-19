import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Middleware to authenticate user using JWT
const authUser = async(req,res,next) =>{
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: 'No token provided, authorization denied' });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId  = token_decode.id;
        next();
    }
    catch(error){
        console.error(error);
        res.json({ success: false, message: 'Token is not valid' });
    }
}

export default authUser;