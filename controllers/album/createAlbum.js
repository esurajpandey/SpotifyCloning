const db = require('../../models/db');
const {Artist,Album,Song,SongQuality,sungBy} = db;


exports.assignArtist = async (req,resp,next) =>{
    try{

        const artists = req.body.artists;
        const res = await sungBy.bulkCreate(artists);
        resp.send(res);

    }catch(err){
        console.log(err);
        resp.send(err.message);
    }
}
exports.uploadSongDetails = async (req,resp,next)=>{
    try{
        const songs = req.body.songs;
        const res = await Song.bulkCreate(songs);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}
exports.uploadSRC = async(req,resp,next) =>{
    try{
        const srcs = req.body.src;
        const res = await SongQuality.bulkCreate(srcs);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}

exports.createAlbum = async (req,resp,next) =>{
    try{
        const album = {
            title : req.body.title,
            copyRight : req.body.copyRight,
            description : req.body.description,
            cover : req.body.cover,
            releasedOn : req.body.releasedOn
        };
        const albumData = await Album.create(album);
        resp.send(albumData);
    }catch(err){
        resp.send(err.message);
    }
}