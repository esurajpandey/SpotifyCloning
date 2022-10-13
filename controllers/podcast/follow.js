const db = require('../../models/db');
const {Podcast,User} = db;

exports.followPodcast = async (req,resp,next) =>{
    const podId = req.body.podcastId;
    const userId = req.userId;
    try{
        const podcast = await Podcast.findByPk(podId);
        const user = await User.findByPk(userId);

        try{//adding into Podcast follower
            
            await podcast.addUsers(user);
            resp.status(200).send(`${user.name} Followed  ${podcast.title}`);

        }catch(err){
            console.log(err.message);
            resp.status(300).send(err.message);
        }
    }catch(err){
        resp.status(400).send(err.message);
    }
}