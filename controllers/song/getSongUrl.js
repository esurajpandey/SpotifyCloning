const db = require('../../models/db');
const {SongQuality} = db;

exports.getSongUrl = async (songId,rate) => {
    if(rate == undefined){
        rate = 128;
    }
    const songUrls = await SongQuality.findAll({
        where : {
            songId : songId,
        },
        attributes: ['url','rate']
    });

    let songUrl = songUrls.find(url => url.rate ==  rate );
    if(songUrl){
        return songUrl;
    }else{

        let r = songUrls[0].rate;
        for(let i=0;i<songUrls.length;i++){
            let rt = +songUrls[i].rate;
            if(rt > r){
                r = rt;
            } 
        }

        //finding next lesser
        songUrl = songUrls.find(url => url.rate == r);
        return songUrl;
    }   
}