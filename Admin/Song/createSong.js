const { getUploadedUrl } = require('../../helper/getUrlFromCloudinary');
const db = require('../../models/db');

exports.uploadSongDetails = async (req,resp,next)=>{
    try{
        const songs = req.body.songs;
        const res = await db.Song.bulkCreate(songs);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}

exports.uploadSong = async (req,resp,next)=>{
    try{
        const file = req.files.cover;
        const url = await getUploadedUrl(file);
        const res = await db.Song.create({
            title : req.body.title,
            duration : req.body.duration,
            language : req.body.language,
            cover : url,
            albumId : req.body.albumId,
        });
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}

