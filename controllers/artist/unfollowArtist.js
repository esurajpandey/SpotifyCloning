const db = require('../../models/db');
const {Artist,User} = db;

exports.unfollowArtist = async (req,resp,next) =>{
    try{
        let artist = await Artist.findByPk(req.body.artistId);
        const user = await User.findByPk(req.userId);

        try{
            artist.followersCount = artist.followersCount - 1;
            artist = await artist.save();
            let result = await artist.removeUsers(user);
            resp.status(200).send(result);
        }catch(err){
            resp.status(300).send(err);
        }
    }catch(err){
        resp.status(400).send(err);
    }
}