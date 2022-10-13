const db = require('../../models/db');
const {Song,User,Playlist} = db;

exports.unLikeSong = async(req,resp,next) =>{
    try{
        let song = await Song.findByPk(req.body.songId);
        let user = await User.findByPk(req.userId);
        let likedPlaylist = await Playlist.findOne({
            where :{
                userId : user.userId,
                title : 'Liked Song',
            }
        });

        try{
            song.playCount = song.playCount - 1;
            song = await song.save();
            await song.removeUsers([user]);
            await likedPlaylist.removeSongs([song]);
            resp.status(200).send(song);
        }catch(err){
            resp.status(300).send(err);
        }
    }catch(err){
        resp.status(400).send(err);
    }
}
