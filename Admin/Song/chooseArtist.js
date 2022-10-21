const db = require('../../models/db');

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