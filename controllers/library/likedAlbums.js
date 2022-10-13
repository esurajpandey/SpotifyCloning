const db = require('../../models/db');
const {User,Album} = db;

exports.likedAlbums= async (req,resp,next) =>{
    try{
        const albums = await User.findAll({
            where : {userId : req.userId},
            attributes : [],
            include : [
                {
                    model : Album,
                    attributes :['title','cover'],
                    through : {
                        attributes : [],
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
        resp.status(200).send(albums);

    }catch(err){
        resp.status(400).send(err);
    }
}
