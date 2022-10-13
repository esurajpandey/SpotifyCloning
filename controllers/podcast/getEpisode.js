const db = require('../../models/db');
const {Episode,Artist} = db;

exports.getEpisode = async(req,resp,next) =>{
    const offset = req.body.offset ;
    const podId = req.body.podcastId;
    const episodeId = req.body.episodeId;

    try{
        const data = await Episode.findOne({
            limit : 10,
            offset : offset * 10,
            where :{
                podcastId : podId,
                episodeId : episodeId
            },
            include : [
                {
                    model : Artist,
                    through : {
                        attributes: []
                    }
                }
            ]
        });
        
        resp.status(200).send(data);
    }catch(err){
        resp.status(400).send(err.message);
    }
}