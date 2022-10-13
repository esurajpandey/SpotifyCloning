const { ActivityLog } = require('../../models/activityLog');
const db = require('../../models/db');
const { SongQuality } = require('../../models/songQuality');
const { Subscription } = require('../../models/subscription');
const { downloadCheck } = require('./downloadCheck');
const {Song,Album,Artist} = db;

const isPremium = async(userId) =>{
    const result = {};
    try{
        const subscription = await Subscription.findOne({
            where : {
                userId : userId
            }
        });
        if(subscription.planId == 1){
            result.premium = false;
            result.message = "User has free Plan";
        }else{
            result.premium = true;
            result.message = "Premium User"
        }
        return result;
    }catch(err){
        result.premium = false;
        result.message = err.message;
        return result;
    }
}

exports.downloadSong = async(req,resp,next) =>{
    const userId = req.userId;
    const songId = req.body.songId;
    const rate = req.body.rate;
    try{
        const result = await isPremium(userId);
        if(result.premium){
            const download = await downloadCheck(userId);
            if(download.grant){
                const song = await Song.findOne({
                    where : {
                        songId : songId
                    },
                    include :[
                        {
                            model : SongQuality,
                            attributes : ['url','rate'],
                            where : {
                                rate :  rate
                            }
                        }
                    ]
                });
                //update logDatabase
                const log = await ActivityLog.findOne({
                    where : {
                        userId : userId
                    }
                });

                log.downloadCount = log.downloadCount+1;
                await log.save();
                resp.send(song);
            }else{
                resp.status(300).send('Download reached to the limit')
            }
        }
    }catch(err){
        resp.send(err.message);
    }
}

exports.downloadAlbum = async (req,resp,next) =>{
    const userId = req.userId;
    const albumId = req.body.albumId;
    try{
        const songs = await Song.findOne({ 
            include : [
                {
                    model : Album,
                    where : {
                        albumId : albumId
                    }
                },
                {
                    model : Artist,
                    attributes : ['artistName']
                }
            ]
        });
        
        const log = await ActivityLog.findOne({
            where  : {
                userId : userId
            }
        });

        log.downloadCount = log.downloadCount + songs.length;
        await log.save()//BUg
    }catch(err){
        resp.send(err.message);
    }
}
