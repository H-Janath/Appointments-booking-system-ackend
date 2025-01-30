import express from 'express'

import {registerUser,loginUser} from '../controllers/userController.js'

const useRouter = express.Router();

useRouter.post('/register',registerUser);
useRouter.post('/login',loginUser);


export default useRouter

