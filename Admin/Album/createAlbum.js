const { getUploadedUrl } = require('../../helper/getUrlFromCloudinary');
const db = require('../../models/db');
const cloudinary = require('cloudinary');
const {Album} = db;

exports.createAlbum = async (req,resp,next) =>{
    try{
        const res = await cloudinary.v2.uploader.upload(req.file.path);
        const album = {
            title : req.body.title,
            copyRight : req.body.copyRight,
            description : req.body.description,
            cover : res.url,
            releasedOn : req.body.releasedOn
        };
        const albumData = await Album.create(album);
        resp.send(albumData);
    }catch(err){
        resp.send(err.message);
    }
}