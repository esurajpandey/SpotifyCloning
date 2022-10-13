const db = require('../../models/db');
const {Subscription} = db;

exports.getUserSubscription = async (req,resp,next) => {
    console.log("heloo stark");
    try{
        let subscriptions = await Subscription.findOne({
            where : {userId : req.userId},
        });
        if(subscriptions)
            resp.status(200).send(subscriptions);
        else{
            resp.status(300).send("No Subscriptions");
        }
    }catch(err){
        resp.status(400).send(err);
    }
}
