const db = require("../../models/db");
exports.saveLastPlayed = async (songId,userId) => {
    try {
        const lastPlayed =  await db.currentPlaying.findOne({
            where : {
                userId :  userId
            }
        });

        lastPlayed.songId  = songId;
        await lastPlayed.save();
        return;
    }catch(err){
        return err;
    }
};