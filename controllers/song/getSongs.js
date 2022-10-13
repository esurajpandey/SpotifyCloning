const db  = require('../../models/db');
const {Artist,Song,Tag,Album,SongQuality} = db;

//return the song with singers,tag,album
exports.getSongs = async(req,resp,next)=>{
    let offset = req.body.offset;
    let rate  = req.body.rate;
    try{
        let songData = await Song.findAll({
            limit : 10,
            offset : offset * 10,
            where : {
                language : req.body.userLanguage
            },
            attributes : ['title','cover','playCount','duration','addedOn'],
            include :[
            {
                model : SongQuality,
                attributes : ['url'],
                where :{
                    rate : rate
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
            }]
        });
        resp.send(songs);
    }catch(error){
        resp.status(400).send(error);
    }
}




