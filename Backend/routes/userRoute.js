import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/useController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/adminLogin', adminLogin);

export default userRouter;
