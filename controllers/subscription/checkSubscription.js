const db = require('../../models/db');
const {Subscription} =  db;
const {deactivateUser} = require('./activate_DeactivateUser');

exports.checkSubscription = async(userId) =>{
    const subscription = await Subscription.findOne({
        where : {
            userId : userId,
        },
        attributes: ['endDate','planId']
    });
    let today = new Date();
    if(today > subscription.endDate){
        deactivateUser(userId);
    }
}



