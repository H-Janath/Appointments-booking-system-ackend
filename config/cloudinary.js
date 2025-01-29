import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  cloudinary.config({
    cloude_name: process.env.CLOUINARY_NAME,
    api_key: process.env.CLOUINARY_API_KEY,
    api_secret: process.env.CLOUINARY_SECRET_KEY,
  });
};


export default connectCloudinary;