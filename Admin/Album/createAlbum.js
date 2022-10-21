const { getUploadedUrl } = require('../../helper/getUrlFromCloudinary');
const db = require('../../models/db');
const {Album} = db;

exports.createAlbum = async (req,resp,next) =>{
    try{
        const file = req.files.cover;
        const url = await getUploadedUrl(file);
        console.log(url);
        const album = {
            title : req.body.title,
            copyRight : req.body.copyRight,
            description : req.body.description,
            cover : url,
            releasedOn : req.body.releasedOn
        };
        const albumData = await Album.create(album);
        resp.send(albumData);
    }catch(err){
        resp.send(err.message);
    }
}