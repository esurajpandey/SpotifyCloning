const db = require('../../models/db');

exports.getArtistsList = async(req,resp)=>{
    try{
        const artist = await db.Artist.findAll();
        resp.send(artist);
    }catch(err){
        resp.send(err.message);
    }
}