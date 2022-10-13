const db = require('../../models/db');
//albums and playlist by tags (with song and singers)
const {Playlist,Song,Artist,Album,Tag} = db;

exports.tagsItems = async (req,resp,next) =>{
    let offset = req.body.offset;
    try{
        let result = await Tag.findOne({
            where :{ tagId : req.body.tagId},
            attributes : ['tagName'],
            include : [
                {
                    model : Playlist,
                    through : {
                        attributes : []//through songTag
                    }
                },
                {
                    model : Album,
                    through : {
                        attributes : [] //album tag
                    },
                },
                {
                    model : Song,
                    through : {
                        attributes :[]//song tag
                    }
                },
                {
                    model :Artist,
                    through :{
                        attributes : []
                    }
                }
            ]
        });
        resp.status(200).send(result);
    }catch(err){
        resp.status(400).send(err.message);
    }
}
