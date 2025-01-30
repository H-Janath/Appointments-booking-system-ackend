import express from 'express'

import {registerUser,loginUser, getProfile, updateProfle} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js'
const useRouter = express.Router();

useRouter.post('/register',registerUser);
useRouter.post('/login',loginUser);
useRouter.get('/get-profile',authUser,getProfile);
useRouter.post('/update-profile',upload.single('image'),authUser,updateProfle);

export default useRouter

