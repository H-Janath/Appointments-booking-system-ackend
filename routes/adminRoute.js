import express from 'express'
import { addDoctor, allDoctors, loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js';


const addminRouter = express.Router();

addminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
addminRouter.post('/login',loginAdmin);
addminRouter.post('/all-doctors',authAdmin,allDoctors);
addminRouter.post('/change-availabity',authAdmin,changeAvailability);

export default addminRouter