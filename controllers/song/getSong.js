const db = require('../../models/db');
const fs = require("fs");


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
                    attributes : ['artistId','artistName'],
                    through : {
                        attributes : []
                    }
                },
                {
                    model : Album,
                    attributes : ['albumId','title']
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

exports.songTrack = async(req, res) => {

    // Ensure there is a range given for the audio
    const range = req.headers.range;

    if (!range) {
      res.status(400).send("Requires Range header");
    }
    // get audio stats (about 10MB)
    const name = req.params.name + ".mp3";
    const audioPath = "/home/username/Spotify/audio/" + name;
    const audioSize = fs.statSync(audioPath).size;
  
    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, audioSize - 1);
  
    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${audioSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "audio/mp3",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);
    // create audio read stream for this particular chunk
    const audioStream = fs.createReadStream(audioPath, { start, end });
    // Stream the audio chunk to the client
    audioStream.pipe(res);
  }