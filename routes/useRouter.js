import express from 'express'

import {bookAppointment,registerUser,loginUser, getProfile, updateProfle,listAppointment} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js'
const useRouter = express.Router();

useRouter.post('/register',registerUser);
useRouter.post('/login',loginUser);
useRouter.get('/get-profile',authUser,getProfile);
useRouter.post('/update-profile',upload.single('image'),authUser,updateProfle);
useRouter.post('/book-appointment',authUser,bookAppointment);
useRouter.get('/appointments',authUser,listAppointment);

export default useRouter

