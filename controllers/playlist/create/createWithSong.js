const db = require('../../../models/db');

exports.createWithSong = async (req,resp,next)=>{
    const userId = req.userId;
    const songId = req.params.songId;
    try{
        const song = await db.Song.findByPk(songId);
        const playlist = await db.Playlist.create({
            title : song.title,
            type : "private",
            userId : userId
        });
        
        //add song to the playlist
        await playlist.addSongs([song]);
        resp.send({status : true,result : playlist});
    }catch(err){
        resp.send({status:false,result : err.message});
    }

}