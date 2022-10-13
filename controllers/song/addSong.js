const db = require('../../models/db');
const {Artist,Song} = db;

exports.addSong = (req,resp,next) =>{
    Song.create({
        title : req.body.title,
        src : req.body.src,
        releasedYear : req.body.releasedYear,
        albumId : req.body.albumId,
    })
    .then( res =>{
       resp.send(res);
    })
    .catch(err =>{
        resp.status(400).send(`Adding song ${err}`);
    })
}