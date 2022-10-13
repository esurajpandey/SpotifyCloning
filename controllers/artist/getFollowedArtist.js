const db = require('../../models/db');
const {Artist,User} = db;

exports.getFollowedArtist = async (req,resp,next)=>{
    const userId = req.userId;
    try{
        const artist = await User.findOne({
            where : {userId : userId},
            attributes:[],
            include : [
                {
                    model : Artist,
                    attributes : ['artistName','cover'],
                    through : {
                        attributes : []
                    }

                }
            ]
        });
    resp.status(200).send(artist);
    }catch(err){
        resp.status(400).send(err);
    }
}