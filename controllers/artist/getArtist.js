const db = require('../../models/db');
const {Artist,Song,History,SongQuality} = db;

exports.getArtist = async (req,resp,next) =>{
    const artistId =req.body.artistId
    const userId = req.userId;
    try{
        const artist = await Artist.findOne({
            where : {
                artistId : artistId
            },
            attributes : ['artistName','cover','followersCount'],
            include : [
                {
                    model : Song,
                    attributes : ['songId','title','playCount','duration'],
                    through : {
                        attributes :[]
                    },
                    include : [
                        {
                            model : SongQuality,
                            where :{
                                rate : 128 // assuming each song have 128kbps
                            }
                        }
                    ]
                }
            ]
        });
        if(userId){
            const history = await History.findOne({
                where : {
                    userId : userId,
                }
            });
            const art = await Artist.findByPk(artistId);

            let res = await history.addArtists([art]);
            console.log(res);
        }
        resp.status(200).send(artist);
    }catch(err){
        resp.status(400).send(err.message);
    }
}