import express from 'express'
import { doctorList } from '../controllers/doctorController.js'

const doctoRouter = express.Router()

doctoRouter.get('/list',doctorList);

export default doctoRouter