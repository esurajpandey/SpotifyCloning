const db = require('../../models/db');
const {Podcast,User} = db;

exports.unfollowPodcast = async (req,resp,next) =>{
    try{
        const podcast = await Podcast.findByPk(req.body.artistId);
        const user = await User.findByPk(req.userId);

        await podcast.removeUsers(user);
        resp.status(200).send(result);

    }catch(err){
        resp.status(400).send(err.message);
    }
}