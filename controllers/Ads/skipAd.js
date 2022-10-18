const db = require('../../models/db');

exports.skipAd = async (req,resp,next)=>{
    try{
        const ads = await db.ads.findOne({where : { adsId : req.body.adsId}});
        ads.skipped = ads.skipped + 1;
        await ads.save();
        resp.send({status :  true});
    }catch(err){
        resp.send({status : false, message : err.message});
    }
}