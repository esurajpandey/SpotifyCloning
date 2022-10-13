const db = require('../../models/db');
const { Playlist,User } = db;

exports.getUserPlaylist = async (req,resp,next) =>{
    const offset = req.body.offset;
    const userId = req.userId;
    try{
        const playlist = await Playlist.findAll({
            limit : 5,
            offset : offset * 5,
            where: {
                userId : userId,
            },
            attributes : ['title','cover'],
            include : [
                {
                    model : User,
                    attributes : ['name'],
                }
            ]
        });
        resp.status(200).send(playlist);
    }catch(err){
        resp.status(400).send(err);
    }
}