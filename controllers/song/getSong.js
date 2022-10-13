const db = require('../../models/db');
const { getSongUrl } = require('./getSongUrl');
const {Song,Artist,Album,User,History,SongQuality} = db;

exports.getSong = async(req,resp,next) =>{
    let userId = req.userId;

    let rate = req.body.rate;//song rate 128 kbps/312 kbps/420 kbps
    
    let songId = req.body.songId;
    // console.log("Hi in the get song");
    const song = {};
    try{
        const songData = await Song.findOne({
            where : {
                songId : songId
            },
            include : [
                {
                    model : Artist,
                    attributes : ['artistName'],
                    through : {
                        attributes : []
                    }
                },
                {
                    model : Album,
                    attributes : ['title']
                }
            ]
        });
        
        song.data = songData;

        song.url = await getSongUrl(songId);

        songData.playCount = songData.playCount + 1;

        await songData.save();

        if(userId){//saving into history
            try{
                const history = await History.findOne({
                    where : {
                        userId: userId,
                    }
                });
                let result = await history.addSongs([songData]);
            }catch(err){
                resp.status(400).send(err);
            }
        }
        resp.status(200).send(song);
    }catch(err){
        resp.status(400).send(err.message);
        console.log(err);
    }
}
