const cloudinary = require("cloudinary").v2;
const path = require('path');
//configuration

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.getUploadedUrl = async (file) =>{
    try{
        const res = await cloudinary.uploader.upload(file.tempFilePath);
        return res.url;
    }catch(err){
        return err;
    }
}