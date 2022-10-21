const db = require('../../models/db');
const {getUploadedUrl} = require('../../helper/getUrlFromCloudinary');
exports.createArtist = async(req,resp,next)=>{
    try{
        const file = req.file.cover;
        const url = await getUploadedUrl(file);

        const artist = {
            artistName : req.body.artistName,
            cover : url,
            dob : req.body.dob
        };
        
        artist = await db.Artist.create(artist);
        resp.send(artist);

    }catch(err){
        resp.send(err.message);
    }
}
