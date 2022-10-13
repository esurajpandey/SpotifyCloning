const db = require('../../models/db');4
const {User,Podcast,Artist} = db;

exports.likedPodcasts = async (req,resp,next) =>{
    try{
        const podcasts = await User.findAll({
            where : {userId : req.userId},
            attributes : [],
            include : [
                {
                    model : Podcast,
                    attributes :['title','cover'],
                    through : {
                        attributes : [],
                    },
                    include : [
                        {
                            model : Artist,
                            attributes :['artistName']
                        }

                    ]
                }
            ]
        });
        resp.status(200).send(podcasts);
    }catch(err){
        resp.status(400).send(err);
    }
}
