const db = require('../../models/db');
const cloudinary = require('cloudinary');
const {getUploadedUrl} = require('../../helper/getUrlFromCloudinary');
exports.createArtist = async(req,resp,next)=>{
    try{
        const res = await cloudinary.v2.uploader.upload(req.file.path);
        let artist = {
            artistName : req.body.artistName,
            cover : res.url,
            dob : new Date(req.body.dob)
        };
        const data = await db.Artist.create(artist);
        resp.send(data);
    }catch(err){
        resp.send(err.message);
    }
}
