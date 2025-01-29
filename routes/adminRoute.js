import express from 'express'
import { addDoctor } from '../controllers/adminController'
import upload from '../middlewares/multer.js'

const addminRouter = express.Router();

addminRouter.post('/add-doctor',upload.single('image'),addDoctor);

export default addminRouter