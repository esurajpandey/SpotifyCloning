const db = require('../../models/db');
const {Playlist} = db;

exports.removePlaylist = async (req,resp,send) =>{
    const playlistId = req.params.playlistId; 
    const userId = req.userId;
    if(!req.userId){//if user want to create playlist without login
        resp.status(500).send('You have to login first');
    }

    try {
        const playlist = await Playlist.findByPk(playlistId);
        if(playlist.userId === req.userId){
            playlist.isArchive = true;
            resp.status(200).send(`Playlist deleted`);
        }else{
            resp.send(`You have no rights to delete`);
        }
    }catch(err){
        resp.status(400).send(err.message);
    }   
}

