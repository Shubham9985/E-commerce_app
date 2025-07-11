import userModel from '../models/userModel.js';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


//login for user
const loginUser = async (req, res) => {
    try{
        const {email , password} = req.body;
        const user = await userModel.findOne({ email });
        if(!user){
            return res.json({succes: false , message: "User doesn't exists"})
        }
        const isMatch = await bcrypt.compare(password , user.password);
        if(isMatch){
            const token = createToken(user._id)
            res.json({success: true , token})

        }
        else{
            res.json({success:false, message: 'Invalid credentials'})
        }
    }catch(error){
        console.log(error);
        res.json({success: false , message: error.message})
    }
}

//for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: 'User already exists' });
        }

        //validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Invalid email' });
        } //validating email format
        if (password.length < 8) {
            return res.json({ success: false, message: 'Password is not strong enough' });
        }

        //password bycrypting
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,

        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

//for admin login
const adminLogin = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign({email: email+password}, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else{
            res.json({ success: false, message: 'Invalid credentials' })
        }

    }
    catch(error){
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { loginUser, registerUser, adminLogin };