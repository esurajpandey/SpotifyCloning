const db = require('../../models/db');
const {Playlist,Song,Artist,Album,SongQuality} = db;

exports.likedSongs = async (req,resp,next) =>{
    try{
        let userId = req.userId;
        const songs = await Playlist.findOne({
            where : {
                userId : userId,
                title : 'Liked Song'
            },
            attributes : [],
            include :[
                {
                    model : Song,
                    attributes : ['title','cover','playCount','duration','addedOn'],
                    through : {
                        attributes : ['addedOn']
                    },
                    include :[
                    {
                        model : SongQuality,
                        where :{
                            rate : 128 // assuming each song have 128kbps
                        }
                    },
                    {
                        model : Artist,
                        attributes : ['artistName'],
                        through:{
                            attributes:[],
                        }
                    },{
                        model : Album,
                        attributes : ['title']
                    }],
                }
            ]
        });
        resp.status(200).send(songs);
    }catch(err) {
        resp.status(400).send(err.message);
    }
}