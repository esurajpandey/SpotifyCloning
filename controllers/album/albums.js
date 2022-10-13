const db = require('../../models/db');

const {Album} = db;
exports.albums = async (req,resp,next) =>{
    let offset = req.body.offset;
    try{
        const albums = await Album.findAll({
            limit : 10,
            offset :offset * 10 ,
        });
        resp.status(200).send(albums);
    }catch(err) {
        resp.status(400).send(err);
    }
}