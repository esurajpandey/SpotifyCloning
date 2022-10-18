const db = require('../../models/db');

exports.fullPlayed = async (req,resp,next)=>{
    try{
        const ads = await db.ads.findOne({where : { adsId : req.body.adsId}});
        ads.fullPlayed = ads.fullPlayed + 1;
        await ads.save();
        resp.send({status :  true});
    }catch(err){
        resp.send({status : false, message : err.message});
    }
}