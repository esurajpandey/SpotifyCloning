const db = require('../../models/db');
const { Plan } = require('../../models/plan');
const { Subscription } = require('../../models/subscription');
const {getHashPassword} = require('../auth/hashData');
const {User,Playlist,Settings,History,ActivityLog} = db;

exports.create = async(req,resp,next)=> {

    try {
        const password = await getHashPassword(req.body.userPassword);

        const users = await User.findAll();
        const username = req.body.name;
        if(users){
            username = username + users.length;
        }else{
            username = username + "1";
        }
        let user = {
            userName : username,
            name : req.body.name,
            userEmail : req.body.userEmail,
            userPhone : req.body.userPhone,
            userPassword : password,
            userLanguage : req.body.userLanguage,
            userDob : req.body.userDob,
            userProfile : req.body.userProfile
        };
        
        user = await User.create(user);
        try{
            //create setting table
            await Settings.create({
                userId: user.userId
            });

            //create playlist table
            await Playlist.create({
                title: 'Liked Song',
                cover : 'http/cover',
                userId : user.userId
            });
            //create history table
            await History.create({
                userId : user.userId,
            });

            //create activity table
            await ActivityLog.create({
                userId : user.userId
            });

            //searching the free plan to user
            const freePlan = await Plan.findOne({
                where :{
                    planName : "Free Plan"
                }
            });
            await Subscription.create({
                endDate :  new Date(),
                userId : user.userId,
                planId : freePlan.planId,
            });

            resp.status(200).send("Account created");
        }catch(err){
            console.log(err);
            resp.status(400).send(err);
        }
    }catch(err){
        console.log(err);
        resp.status(400).send(err);
    }
}


