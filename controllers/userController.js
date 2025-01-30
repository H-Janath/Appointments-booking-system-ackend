import validator from "validator";
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudanary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js";
import appointmentModel from '../models/appointmentModel.js'
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }
    if (!validator.isEmail(email)) {
        return res.json({success: false, message:"Enter a valid email"})
    }
    if(password.length<8){
        return res.json({success: false, message:"Enter a strong password"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const userData = {
        name,
        email,
        password: hashedPassword
    }

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
    
    res.json({success:true,token})

     
  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }
};


const loginUser = async (req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({success:true,message:"User does not exit"})
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(isMatch){
      const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
      res.json({success:true,token})
    }else{
      res.json({success:false,message:"Invalid credentials"})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

const getProfile = async(req,res)=>{
  try {
    const {userId} = req.body;
    const userData = await userModel.findById(userId).select('-password');
    res.json({success: true,userData});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

const updateProfle = async(req,res)=>{
  try {
    const {userId,name,phone,address,dob,gender} = req.body;
    const imageFile = registerUser.file;
    if(!name|| !phone || !address || !dob || !gender){
      return res.json({success:false,message:"Data missing"});
    }

    await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

    if(imageFile){
      const imageUpload =  await cloudanary.uploader.upload(imageFile.path,{resource_type:'image'});
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId,{image:imageUrl});
    }

    res.json({success: true,message:"Profile Updated"});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

const bookAppointment = async(req,res)=>{
  try {
    const {userId,docId,slotDate,slotTime} = req.body;
    const docData = await doctorModel.findById(docId).select('-password');
    if(!docData.available){
      return res.json({success:false,message:"Doctor not available"})
    }
    let slots_booked = docData.slots_booked;
     //chaking slot availability
     if(slots_booked[slotDate]){
        if(slots_booked[slotDate].includes(slotTime)){
          return res.json({success:false,message:"Slot not available"})
        }else{
          slots_booked[slotDate].push(slotTime);
          return res.json({success:false,message:"Slot not available"})
        }
     }else{
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
     }
     const userData = await userModel.findById(userId).select('-password')
      delete docData.slots_booked

      const appoinmentData={
        userId,
        docId,
        userData,
        docData,
        ammount:docData.fees,
        slotTime,
        slotDate,
        date:Date.now()
      }

      const newAppointment  = new appointmentModel(appoinmentData);
      await newAppointment.save();

      await doctorModel.findByIdAndUpdate(docId,{slots_booked})

      res.json({success:true,message:"Appointment Booked"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}
export {registerUser,loginUser,getProfile,updateProfle,bookAppointment}