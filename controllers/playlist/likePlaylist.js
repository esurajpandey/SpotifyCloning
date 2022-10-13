const db = require('../../models/db');
const {Playlist,User} = db;

exports.likePlaylist = async(req,resp,next)=>{
    try{
        let playlist = await Playlist.findByPk(req.body.playlistId);
        let likesCount = playlist.likes;
        let userId = req.userId;
        const user = await User.findByPk(userId);

        
        playlist.likes = likesCount +1;
        try{
            playlist =  await playlist.save();
            //adding to userLiked playlist
            const result = await playlist.addUsers([user]);
            console.log(result);
            resp.status(200).send(result);
        }catch(error){
            resp.status(300).send(err.name);
        }
    }catch(error){
        resp.status(400).send(error);
    }
}

exports.unlikePlaylist = async (req,resp,next) =>{
    try{
        let playlist = await Playlist.findByPk(req.body.playlistId);
        let user = await User.findByPk(req.userId);
        let likesCount = playlist.likes;
        playlist.likes = likesCount - 1;
        try{
            playlist =  await playlist.save();
            let result = playlist.removeUsers([user]);//removing playlist from user liked 
            resp.status(200).send(playlist);
        }catch(error){
            resp.status(300).send(err.name);
        }
    }catch(error){
        resp.status(400).send(error);
    }
}