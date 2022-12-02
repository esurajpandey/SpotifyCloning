
const db = require('../../models/db');
const {Playlist,Song} = db;

exports.addSongToPlayList =  (req,resp,next) => {
    const userId = req.userId;
    const playlistId = req.params.playlistId;
    const songId =  req.params.songId;
    
    Playlist.findByPk(playlistId)
    .then(async playlist =>{
        try{
            if(playlist.userId === userId) {
                const song = await Song.findByPk(songId);
                if(song){
                    playlist = await playlist.addSongs([song]);
                    resp.status(200).send('Song added');
                }else{
                    resp.status(300).send('Something went wrong');
                }
            }else{
                resp.status(300).send('No rights to change');
            }
        }catch(err){
            resp.status(400).send(err.message);
        }
    })
    .catch(err => {
        resp.status(400).send(err.message);
    });
}