import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try{
        const { token } = req.headers
        if(!token){
           return res.json({success:false,message:'Unauthorized! Login Again'})
        }
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded:', token_decoded);
        console.log('Expected:', process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD);
        if(token_decoded.email !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:'Unauthorized! You are not admin! Login Again'})
        }
        next()
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default adminAuth;