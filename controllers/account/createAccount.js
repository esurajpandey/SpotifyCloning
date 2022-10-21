const db = require('../../models/db');
const {getHashPassword} = require('../auth/hashData');
const { validateEmail } = require('../validation/email');
const { getUserByEmail } = require('./users');
const {User,Playlist,Settings,History,ActivityLog,Subscription} = db;

exports.createAccount = async(req,resp,next)=> {
    try {
        //check user is exits or not
        let email = req.body.userEmail;
        if(validateEmail(email)){
        
            let userExits =  await getUserByEmail(email);
            
            if(userExits) {
                resp.send({status : false, message : "Email is already registered"});
            }else{

                let password = await getHashPassword(req.body.userPassword);
                
                let  users = await User.findAll();

                let  username = req.body.name;
                if(users){
                    username = Date.now()+'_'+username+"_"+ users.length;
                }else{
                    username = username + "1";
                }
                let user = {
                    userName : username,
                    name : req.body.name,
                    userEmail : email,
                    userPassword : password,
                    userGender : req.body.userGender,
                    userDob : req.body.userDob,
                    
                };
                
                user = await User.create(user);
                    
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
                // const freePlan = await Plan.findOne({
                //     where :{
                //         planName : "Free Plan"
                //     }
                // });
                await Subscription.create({
                    endDate :  new Date(),
                    userId : user.userId,
                    planId : 1,
                });
                resp.status(200).send("Account created");
            }
        }else{
            resp.send({status : false,message : "Invalid Email"});
        }         
    }catch(err){
        console.log(err);
        resp.status(400).send(err.message);
    }
}


