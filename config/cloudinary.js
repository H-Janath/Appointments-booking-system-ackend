import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUINARY_NAME,
    api_key: 359225513557451,
    api_secret: process.env.CLOUINARY_SECRET_KEY,
  });
};


export default connectCloudinary;