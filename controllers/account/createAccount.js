const { DATEONLY } = require('sequelize');
const { currentPlaying } = require('../../models/db');
const db = require('../../models/db');
const {getHashPassword} = require('../auth/hashData');
const { validateEmail } = require('../validation/email');
const { getUserByEmail } = require('./users');
const {User,Playlist,Settings,History,ActivityLog,Subscription} = db;

exports.createAccount = async(req,resp,next)=> {
    try {
        //check user is exits or not
        let email = req.body.userEmail;
        console.log(req.body);
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

                const d = new Date(req.body.userDob);
                let user = {
                    userName : username,
                    name : req.body.name,
                    userEmail : email,
                    userPassword : password,
                    userGender : req.body.userGender,
                    userDob : d,
                    
                };
                
                user = await User.create(user);
                    
                //create setting table
                if(user){
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
        
                    await Subscription.create({
                        endDate :  new Date(),
                        userId : user.userId,
                        planId : 1,
                    });
    
                    await currentPlaying.create({userId : user.userId})
                    resp.send(JSON.stringify({
                        message :  "Account Created"
                    }));
                }else{
                    resp.send(JSON.stringify({
                        message :  "Something went wrong"
                    }));
                }
            }
        }else{
            resp.send({status : false,message : "Invalid Email"});
        }         
    }catch(err){
        resp.send(JSON.stringify({
            message:err.message
        }));
    }
}


