const db = require('../../../models/db');

exports.recoverPlaylist = async ( req,resp,next) =>{
    const userId = req.userId;
    const playlistId = req.params.playlistId;
    try{ 
        const playlist = await db.Playlist.findByPk(playlistId);
        playlist.isArchive = false;
        await playlist.save();
        resp.send({status : true,result : "Playlist restored"});
    }catch(err){
        resp.send({status : false, result : err.message});
    }
}