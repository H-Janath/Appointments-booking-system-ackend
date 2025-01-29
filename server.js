import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import addminRouter from './routes/adminRoute.js';
const app = express();
const port = process.env.PORT ||4000;
connectDB()
connectCloudinary();


app.use(express.json())
app.use(cors())


app.use('/api/admin',addminRouter);


app.get('/',(req,res)=>{
    res.send('API IS WORKING')
})

app.listen(port,()=>{
    console.log("Server Started",port)
})