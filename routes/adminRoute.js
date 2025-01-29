import express from 'express'
import { addDoctor, loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'

const addminRouter = express.Router();

addminRouter.post('/add-doctor',upload.single('image'),addDoctor);
addminRouter.post('/login',loginAdmin);

export default addminRouter