const db = require('../../models/db');
const {Playlist,Song} = db;

exports.removeSongFromPlaylist = async (req,resp,next) =>{
    
    if(!req.userId){//if user want to create playlist without login
        resp.status(500).send('You have to login first');
    }

    let playlistId = req.body.playlistId;
    let songId = req.body.songId;
    let userId = req.userId;

    try{
        let playlist = await Playlist.findByPk(playlistId);
        const song = await Song.findByPk(songId);
        
        if(playlist.userId === userId){

            playlist = await playlist.removeSongs([song]);
            resp.status(200).send('song Removed');

        }else{
            resp.send(`You have no rights to delete`);
        }
    }catch(err) {
        resp.status(400).send(err);
    }
}