const db = require('../../models/db');
const { getSongUrl } = require('./getSongUrl');
const {SongQuality} = db;

//only src
exports.changeQuality = async(req,resp,next) =>{
    const songId = req.body.songId;
    const rate = req.body.rate;
    try{  
        songUrl = await getSongUrl(songId,rate);
        resp.send(songUrl);
    }catch(err){
        resp.status(400).send(err);
    }
}
