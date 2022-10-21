const db = require('../../models/db');
const {Playlist,User} = db;

exports.likePlaylist = async(req,resp,next)=>{
    const playlistId = req.params.playlistId;
    let userId = req.userId;
    try{
        let playlist = await Playlist.findOne({
            where : {
                playlistId : playlistId,
                type : "public"
            }
        });

        if(playlist == null){
            resp.send({
                message : "You can't Like the Private Playlist"
            })
        }else{
            let likesCount = playlist.likes;
            const user = await User.findByPk(userId);            
            playlist.likes = likesCount +1;
            playlist =  await playlist.save();
            
            //adding to userLiked playlist
            const result = await playlist.addUsers([user]);
            console.log(result);
            resp.status(200).send({
                message : "Playlist is added to your library"
            });
        }
    }catch(error){
        resp.status(400).send(error);
    }
}

exports.unlikePlaylist = async (req,resp,next) =>{
    try{
        let playlist = await Playlist.findOne({
            where : {
                playlistId : req.body.playlistId,
                type : "public"
            }
        });

        if(playlist == null){
            resp.send({
                message : "No access"
            })
        }else{
            let likesCount = playlist.likes;
            let userId = req.userId;
            const user = await User.findByPk(userId);            
            playlist.likes = likesCount - 1;
            playlist =  await playlist.save();
            //adding to userLiked playlist
            const result = await playlist.removeUsers([user]);
            resp.status(200).send({
                message : "Playlist is removed from your library"
            });
        }
    }catch(error){
        resp.status(400).send(error);
    }
}