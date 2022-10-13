const db = require('../../models/db');
const {History,Album,Playlist,Artist,Song} = db;
exports.getHistory  = async (req,resp,next) =>{
    let offset = req.body.offset;
    try {
        let data = await History.findOne({
            // order : [['updatedAt','DESC']],
            limit : 10,
            offset : offset * 10,
            // // subQuery:false,
            
            attributes : [],
            where : {
                userId : req.userId
            },
            include : [
                {
                    model : Album,
                    through : {
                        attributes : [],
                        
                    },
                },
                {
                    model : Song,
                    order : [['updatedAt','DESC']],
                    through : {
                        attributes : [],
                    },
                },
                {
                    model : Playlist,
                    through : {
                        attributes : [],
                        // order : [['updatedAt','ASC']],
                    },
                },
                {
                    model : Artist,
                    through : {
                        attributes : [],
                        // order : [['updatedAt','ASC']],
                    },
                }
            ]
        });
        resp.status(200).send(data);
    }catch(err){
        console.log(err);
        resp.status(400).send(err);
    }
}