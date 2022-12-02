const db = require('../../models/db');
const { Playlist,User } = db;
const sequelize = require('sequelize');
exports.getUserPlaylist = async (req,resp,next) =>{
    const offset = req.params?.offset ?? 0;
    const userId = req.userId;
    console.log("Hello",userId);
    try{
        const playlist = await Playlist.findAll({
            limit : 10,
            offset : offset * 10,
            where: {
                userId : userId,
                isArchive : false,
                title :  { [sequelize.Op.not]: 'Liked Song'}
            },
            attributes : ['playlistId','title','cover','type'],
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