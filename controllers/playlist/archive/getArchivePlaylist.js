const db = require('../../../models/db');

exports.archivePlaylists = async (req,resp,next) =>{
    const userId = req.userId;
    const offset = req.params.offset;
    try{    
        
        const playlists = await db.Playlist.findAll({
            limit :  10,
            offset : offset * 10,
            where : {
                userId : userId,
                isArchive : true
            },
            attributes : ['playlistId','title','updatedAt'],
        });

        resp.send({status : true,result : playlists});
    }catch(err){
        resp.send({status: false,result : err.message});
    }
}
