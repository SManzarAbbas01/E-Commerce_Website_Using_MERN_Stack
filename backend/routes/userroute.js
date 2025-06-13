import express from 'express';
// You'll likely need to import your user controller functions here
// import { registerUser, loginUser, getUserProfile } from '../controllers/usercontroller.js';
import {loginUser , registerUser, adminLogin} from '../controllers/usercontroller.js';
const userRouter = express.Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
export default userRouter;