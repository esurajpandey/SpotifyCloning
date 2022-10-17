const db = require('../../models/db');
const { Playlist,User } = db;

exports.publicPlaylist = async(req,resp,next) =>{
    const userId = req.userId;
    const offset = req.body.offset;
    try{
        const playlists = await Playlist.findAll({
            limit : 10,
            offset : offset * 10,
            where : {
                type : 'public'
            },
            attributes : ['playlistId','title','cover'],
            include : [
                {
                    model : User,
                    attributes : ['name']
                }
            ]
        });
        resp.send(playlists);
    }catch(err){
        resp.send(err.message);
    }
}