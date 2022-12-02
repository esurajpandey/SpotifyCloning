const multer = require('multer');

module.exports = multer({
    storage : multer.diskStorage({}),
    fileFilter : (req,file,cb) => {
        if(!file.mimetype.match(/mp3|mpeg|jpeg|jpg|png|gif/)){
            cb(new Error("File not supported"),false);
            return;
        }
        cb(null,true);
    }
})