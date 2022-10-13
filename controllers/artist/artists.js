const db = require('../../models/db');
const {Artist} = db;

exports.artists = async(req,resp,next) =>{
    let offset = req.body.offset;
    try{
        const data = await Artist.findAll({
            limit : 2,
            offset : offset * 2,
        });
        resp.status(200).send(data);
    }catch(err){
        resp.status(400).send(err);
    }
}