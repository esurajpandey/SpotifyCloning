const db = require("../../models/db");
const {getSongUrl} = require('../song/getSongUrl');

exports.lastPlayed = async (req, resp) => {
  const userId = req?.userId;

  try {
    let data = await db.currentPlaying.findOne({
      where: {
        userId: userId,
      },
    });
    //getting the song details
    //getting the album data 
    //getting the data from Artists
    let songData;
    let songUrl;
    if(data?.songId){
        songData= await db.Song.findOne({
            where : {
                songId : data?.songId
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
        songUrl = await getSongUrl(songId);

        resp.send(JSON.stringify({
            songData : songData,
            songUrl : songUrl
        }));

    }else{
        resp.send(JSON.stringify({
            message : 'No song in last played'
        }));
    }
  } catch (err) {
    resp.send(JSON.stringify ({
        message : err.message
    }))
  }
};


