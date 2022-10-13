const db = require('../../models/db');
const {User,Artist} = db;

exports.likedArtists = async (req,resp,next) =>{
    try{
        const artists = await User.findAll({
            where : {userId : req.userId},
            attributes : [],
            include : [
                {
                    model : Artist,
                    attributes :['artistName','cover'],
                    through : {
                        attributes : [],
                    }
                }
            ]
        });
        resp.status(200).send(artists);

    }catch(err){
        resp.status(400).send(err);
    }
}
