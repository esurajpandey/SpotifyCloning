const db = require('../../models/db');
const multer = require("multer");
const path = require("path");

const fileStorageEngine = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null,"./audio");
    },
    filename : (req,file,cb) => {
        const url = file.fieldname+ '_' + Date.now()+ path.extname(file.originalname);
        req.url = url;
        cb(null,url);
    }
});

exports.upload = multer({
    storage : fileStorageEngine,
    limits: {
        // fileSize: 1000000, // 1000000 Bytes = 1 MB
        fileSize : 10000000,//for audio
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(mp3)$/)) {//upload only audio mp3
          return cb(new Error("Please upload a Audio")); 
        }
        cb(undefined, true);
    },
});



exports.uploadTrack = async(req,resp,next) =>{
    try{
        const url = req.url;
        const res = await db.SongQuality.create({
            url : url,
            rate :req.body.rate,
            songId :  req.body.songId
        });
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}