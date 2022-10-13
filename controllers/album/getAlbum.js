const db = require('../../models/db');
const {Album,Artist,Song,History} = db;

exports.getAlbum = async (req,resp,next) => {
    try{
        let album = await Album.findOne({
            where : {
                albumId :req.body.albumId,
            },
            include: [
                {
                    model : Song,
                    attributes : ['title','cover','playCount','duration'],
                    limit : 10,
                    offset : offset * 10,
                    include : [
                        {
                            model : Artist,
                            attributes : ['artistName'],
                            through : {
                                attributes :[],
                            }
                        },
                        {
                            model : SongQuality,
                            where :{
                                rate : 128 // assuming each song have 128kbps
                            }
                        }
                    ]
                }
            ]
        });
        let alb = await Album.findByPk(req.body.albumId);
        let history = await History.findOne({
            where : {
                userId : req.userId,
            }
        });
        let result = await history.addAlbums([alb]);
        resp.status(200).send(album);
    }catch(err){
        resp.status(400).send(err);
    }
}