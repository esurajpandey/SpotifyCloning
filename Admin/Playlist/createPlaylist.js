const { getUploadedUrl } = require('../../helper/getUrlFromCloudinary');
const db = require('../../models/db');

exports.createPlaylist = async(req,resp,next) =>{
    
    try{
        const file = req.file.cover;
        const url = await getUploadedUrl(file);
        const playlist = await db.Playlist.create({
            title : req.body.title,
            cover : url,
            description : req.body.description,
            type : "public",
        });
        resp.send(playlist);
    }catch(err){
        resp.send(err.message);
    }
}