const cloudinary = require("cloudinary").v2;
const path = require('path');
//configuration



exports.getUploadedUrl = async (file) =>{
    try{
        const res = await cloudinary.uploader.upload(file.tempFilePath);
        return res.url;
    }catch(err){
        return err;
    }
}