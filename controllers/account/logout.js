const db = require('../../models/db');
const { User,Plan,ActivityLog,Subscription,LoginToken } = db;


const clearLogEntry = async (userId,deviceId) =>{
    console.log(`User ${userId} deviceId ${deviceId}`);
    //check subscription
    const subscription = await Subscription.findOne({
        where :{
            userId : userId
        }
    });

    const log = await ActivityLog.findOne({
        where : {
            userId : userId
        }
    });

    // const plan = await Plan.findByPk(subscription.planId);
    //search for LoginToken
    const token = await LoginToken.findOne({
        where : {
            logId : log.logId,
            deviceId : deviceId
        }
    });

    //remove the token
    await token.destroy();

    //update the logData
    log.logCount = log.logCount-1;
    await log.save();

    return {
        code : 200,
        message : "Log out successful"
    };
}

exports.logout = async (req,resp,next) =>{
    const userId = req.userId;
    const deviceId = req.body.deviceId;
   
    try{
        let res = await clearLogEntry(userId,deviceId);
        resp.status(res.code).send(res.message);
    }catch(err){
        resp.status(400).send(err.message);
        console.log(err.message);
    }
}

exports.logoutFromEverywhere = async (req,resp,next) =>{
    try{    
        

    }catch(err){
        resp.send({status : false,message : err.message});
    }
}