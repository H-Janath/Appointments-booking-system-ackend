import validatro from 'validator'
import bycrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
//API or adding docotr

const addDoctor = async (req,res)=>{

    try {
        const {name,email,password,speciality,degree, experience,about,fees,address} = req.body;
        const imageFile = req.file;
        
        // checking for all data to add doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false,message:'Missing details'})
        }

        //validate email format
        if(validatro.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid Email"})
        }

        //validating strong password
        if(password.length < 8){
            return res.json({success: false, message:"Please enter a strong password"})
        }

        const salt = await bycrypt.genSalt(10)
        const hasedPassword = await bycrypt.hash(password,salt);

        //upload image to cloudanary
        const imageUploader = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
        const imageUrl = imageUploader.secure_url;

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hasedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({success:true, message:"Doctor added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


const loginAdmin = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        }else{
            res.json({success:false, message:"Invalid credntials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addDoctor,loginAdmin}


