const db = require('../../../models/db');
const {Playlist,Song} = db;

exports.createUserPlaylist = async (req,resp,next) => {
    const user_Id = req.userId;
    try{
        const userPlaylists = await Playlist.findAll({
            where:{
                userId: user_Id
            }
        });
        let type = req.body.playlistType;
        if(type == undefined){
            type = 'private'
        }
        let playlist = {
            title: `User Playlist #${userPlaylists.length+1}`,
            type : type,
            userId : user_Id,
        };
        playlist = await Playlist.create(playlist);
        //if request coming after selecting a song to create the playlist
        if(req.body.songId){
            const song = await Song.findByPk(req.body.songId);
            await playlist.addSongs([song]);
        }
        resp.status(200).send(playlist);
    }catch(err){
        resp.status(500).send(err);
    }
}



