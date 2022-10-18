const db = require('../../models/db');

exports.uploadAds = async(req,resp,next) => {
    try{
        const ads = {
            title :  req.body.title,
            type : "song",
            duration : req.body.duration
        }
        const res = await db.ads.create(ads);
        resp.send({status : true, result : res});
    }catch(err){
        resp.send({status : false,message : err.message});
    }
}