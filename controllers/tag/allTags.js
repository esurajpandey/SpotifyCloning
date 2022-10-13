const db = require('../../models/db');
const {Tag} = db;
exports.allTags = async (req,resp,next) =>{
    let offset = req.body.offset;
    try{
        const tags = await Tag.findAll({
            limit : 10,
            offset : offset *10,
        });
        resp.status(200).send(tags);
    }catch(err){
        resp.status(400).send(err.message);
    }
}