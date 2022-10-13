const db = require('../../models/db');
const {LoginToken,User,Settings,Playlist,ActivityLog,Subscription} = db;

exports.deleteAccount = async (req,resp,next)=>{
    const userId = req.userId;
    try{
        const user = await User.findByPk(userId);
        const code = await user.destroy();

        const likedPlaylist = await Playlist.findOne({
            where: {
                userId : userId,
                title : 'Liked Song'
            }
        });
        const setting = await Settings.findOne({
            where: {
                userId : userId,
            }
        });
        const log = await ActivityLog.findOne({
            where : {
                userId : userId
            }
        });
        const sub = await Subscription.findOne({
            where : {
                userId : userId
            }
        });

        const tokens = await LoginToken.findOne({
            where : {
                logId : log.logId
            }
        });

        await setting.destroy();
        await likedPlaylist.destroy();
        await sub.destroy();
        await tokens.destroy();
        await log.destroy();

        resp.setStatus(200);
    }catch(err){
        resp.status(400).send(err.message);
    }
}