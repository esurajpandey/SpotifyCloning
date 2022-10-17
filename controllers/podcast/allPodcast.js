const db = require('../../models/db');
const {Podcast} = db;

exports.allPodcasts = async(req,resp,next) =>{
    const userId = req.userId;
    const offset = req.body.offset;
    try{
        const pods = await Podcast.findAll({
            limit : 10,
            offset : offset * 10,
            attributes : ['podcastId','studio','cover','title']
        });
        resp.send(pods);
    }catch(err){
        resp.status(400).send(err.message);
    }
}