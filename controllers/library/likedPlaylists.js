const db = require('../../models/db');

const {User,Playlist} = db;

exports.likedPlaylists = async (req,resp,next) =>{
    try{
        const playlists = await User.findAll({
            where : {userId : req.userId},
            attributes : [],
            include : [
                {
                    model : Playlist,
                    attributes :['title','cover','description','likes'],
                    through : {
                        attributes : ['addedAt'],
                    },
                    include : [
                        {
                            model : User,
                            attributes :['name']
                        }

                    ]
                }
            ]
        });
        resp.status(200).send(playlists);

    }catch(err){
        resp.status(400).send(err);
    }
}
