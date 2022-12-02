const db = require("../../models/db");
const cloudinary = require("cloudinary");

exports.uploadSong = async (req, resp, next) => {
  try {
    const res = await cloudinary.v2.uploader.upload(req.file.path);
    let song = {
      title: req.body.title,
      duration: req.body.duration,
      language: req.body.language,
      cover: res.url,
      albumId: req.body.albumId,
    };
    // //creating song
    song = await db.Song.create(song);

    //getting singers data
    const singers = req.body.artists.split(",");
    let sungBy;
    if (singers.length == 1) {
      sungBy = {
        songId: song.songId,
        artistId: singers[0],
      };
      await db.sungBy.create(sungBy);
    } else {
      //if more than one singer
      sungBy = singers.map((artist) => {
        return {
          songId: song.songId,
          artistId: +artist,
        };
      });
      await db.sungBy.bulkCreate(sungBy);
    }
    resp.send(song);
  } catch (err) {
    resp.send(err.message);
  }
};
