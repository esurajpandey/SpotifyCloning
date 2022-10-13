const e = require('express');
const db = require('../../models/db');
const { Plan } = require('../../models/plan');
const {Subscription,ActivityLog} = db;

exports.downloadCheck = async(userId) =>{
    try{
        const log = await ActivityLog.findOne({
            where : {
                userId : userId,            
            }
        });

        const subscription = await Subscription.findOne({
            where : {
                userId : userId
            }
        });

        const plan = await Plan.findByPk(subscription.planId);
        result = {};

        if(log.downloadCount >= plan.downloadCount){
            result.grant = false;
            result.message = "Your download limit is over";
        }else{
            result.grant = true;
            result.message = "User can download";
        }
        return result;
    }catch(err){
        resp.send(err.message);
    }
}