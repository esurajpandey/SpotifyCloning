const db = require('../../models/db');
const {Settings} = db;

exports.editSettings = async (req,resp,next)=>{
    const userId = req.userId;
    try{
        const setting = await Settings.findOne({
            where : {
                userId : userId
            }
        });
        setting.productNews = req.body.productNews;
        setting.spotifyNewsAdnOffers= req.body.spotifyNewsAdnOffers;
        setting.recommendation= req.body.recommendation;
        setting.newMusic= req.body.newMusic;
        setting.playlistUpdate= req.body.playlistUpdate;
        setting.artistUpdate= req.body.artistUpdate;
        setting.concertNotification= req.body.concertNotification;
        setting = await setting.save();
        resp.status(200).send(setting);
    }catch(err){
        resp.status(400).send(err);
    }
}

exports.getSettings = async (req,resp,next)=>{
    const userId = req.userId;
    console.log(userId);
    try{
        const settings = await Settings.findOne({
            where : {
                userId : userId
            },
            attributes : ['productNews','spotifyNewsAdnOffers','recommendation','newMusic','playlistUpdate','artistUpdate','concertNotification','id']
        });
        resp.send(settings);
    }catch(err){
        resp.send(err.message);
    }
}
