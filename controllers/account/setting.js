const {Settings} = require('../../models/user');

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

exports.getSettings = (req,resp,next)=>{
    Settings.findOne({
        where : {
            userId : req.userId
        }
    })
    .then(setting => {
        resp.json(setting);
    })
    .catch(err =>{
        resp.send(err);
    });
}
