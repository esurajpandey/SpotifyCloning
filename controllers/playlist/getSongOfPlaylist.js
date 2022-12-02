const db = require('../../models/db');
const {Artist,Album,Song,Playlist,User,History,SongQuality} = db;

exports.getSongsOfUserPlaylist = async (req,resp,next) =>{
    const userId = req.userId;
    const playlistId = req.params.playlistId;
    const offset = req.params.offset;
    console.log(`Playlist : ${playlistId} -- offset ${offset}`);

    if(!userId){//if user want to create playlist without login
        resp.status(500).send('You have to login first');
    }
    try{
        // const songs = await Song.findAll({
        //     limit : 10,
        //     offset :offset * 10,
        //     attributes : ['songId','title','cover','playCount','duration'],
        //     include : [
        //         {
        //             model :  Playlist,
        //             attributes : ['title','cover','description','likes'],
        //             where : {
        //                 playlistId :  playlistId
        //             },
        //             through : {
        //                 attributes : ['addedOn']
        //             }
        //         },
        //         {
        //             model : Artist,
        //             attributes : ['artistName'],
        //             through: {
        //                 attributes : [],//sungBy
        //             },
        //         },
        //         {
        //             model : Album,
        //             attributes : ['title'],
        //         },
        //         {
        //             model :  SongQuality,
        //             attributes : ['url'],
        //             where : {
        //                 rate : 128
        //             }
        //         }
        //     ]
        // });
        const playlist = await Playlist.findOne({
            limit : 10,
            offset : offset * 10,
            where : { 
                playlistId : playlistId 
            },
            attributes : ['playlistId','title','cover','description','type'],
            include: [
                {
                    model : User,
                    attributes : ['name']
                },
                {
                    model: Song,
                    
                    through: {
                        attributes : ['addedOn'],//songInPlaylist
                    },
                    include : [
                        {
                            model : Artist,
                            attributes : ['artistName','artistId'],
                            through: {
                                attributes : [],//sungBy
                            },
                        },{
                            model : Album,
                            attributes : ['title','albumId'],
                        }                 
                    ]
                }
            ]
        });
        
        resp.send(playlist);
    }catch(err){
        resp.send(JSON.stringify({
            message : err.message
        }));
    }
}

exports.getSongsOfPublicPlaylist = async(req,resp,next) => {
    const userId = req.userId;
    console.log(userId);
    try{
        const playlist = await Playlist.findOne({
            where : { 
                playlistId : req.body.playlistId,
                type : 'public'
            },
            attributes : ['playlistId','title','cover','description','likes'],
            include: [
                {
                    model : User,
                    attributes : ['name']
                },
                {
                    model: Song,
                    attributes : ['title','playCount','duration'],
                    through: {
                        attributes : ['addedOn'],//songInPlaylist
                    },
                    include : [
                        {
                            model : SongQuality,
                            where :{
                                rate : 128 // assuming each song have 128kbps
                            }
                        },
                        {
                            model : Artist,
                            attributes : ['artistName'],
                            through: {
                                attributes : [],//sungBy
                            },
                        },{
                            model : Album,
                            attributes : ['title'],
                        }
                    ]
                }
            ]
        });
        if(playlist == null){
            resp.send({
                message : "Playlist is not accessible"
            })
        }else{
            if(userId){
                try{
                    const history = await History.findOne({
                        where : {
                            userId : userId,
                        }
                    });
                    console.log(history.historyId);
                    const playlistAdd = await Playlist.findByPk(playlist.playlistId);
                    console.log(playlistAdd.userId);
                    let res = await history.addPlaylists([playlistAdd]);
                    resp.status(200).send(playlist);
                }catch(err){
                    resp.status(400).send(err.message);
                }
            }else{
                resp.status(200).send(playlist);
            }
        }
    }catch(err){
        resp.status(400).send(err.message);
    }
}

