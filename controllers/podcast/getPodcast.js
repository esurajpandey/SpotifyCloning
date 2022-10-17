const db = require('../../models/db');
const {Podcast,Episode,Artist,History} = db;

exports.getPodcast = async(req,resp,next) => {

    const podId = req.body.podcastId;
    const offset = req.body.offset;
    const userId = req.userId;
    console.log(`${podId}-- ${offset}-- ${userId}`);
    try{
        const podcast = await Podcast.findOne({
            where : {
                podcastId : podId
            },
            include : [
                {
                    model : Episode,
                },
                {
                    model : Artist,
                    attributes : ['artistId','artistName'],
                }
            ]
        });
        console.log(podcast);

        //adding into history
        if(userId){
            const history = await History.findOne({
                where :{
                    userId : userId
                }
            });
            await history.addPodcasts([podcast]);
        }
        resp.send(podcast);
    }catch(err){
        resp.status(400).send(err.message);
    }
}