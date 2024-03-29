require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("./users");
const db = require("../../models/db");
const { Plan, ActivityLog, Subscription, LoginToken,User } = db;

const checkValidation = async(userId,deviceId)=>{
  const subscription = await Subscription.findOne({
    where : {
      userId : userId
    }
  });

  let data = {
    userId: userId,
  };
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);

  //get plan
  const plan = await Plan.findOne({
    where : {
      planId : subscription.planId
    }
  });

  //get data from logActivity files
  const log = await ActivityLog.findOne({
    where : {
      userId : userId
    }
  });

  //check logIn Count on devices
  if(plan.accountCount <= log.logCount){
    return {
        accessToken:null,
        isAccess:false,
        message: "This account is already login in many devices"
    }
  }else{

    //create the login activity 
    
    if(log?.logCount == 0){
      log.logCount = 1;
    }else{
      log.logCount = log?.logCount + 1;
    }
    
    await log.save();

    //create login Token 
    await LoginToken.create({
      token: accessToken,
      logId: log.logId,
      deviceId: deviceId,
    });

    return {
      accessToken:accessToken,
      isAccess:true,
      message: "User can login"
    }
  }
}



exports.login = async (req, resp, next) => {

  const email = req.body.userEmail;
  const deviceId = req.body.deviceId;
  try {
      const user = await getUserByEmail(email);
      if (user == null) {
        return resp.status(400).send(JSON.stringify({message : "Cannot find user"}));
      }

      if (await bcrypt.compare(req.body.userPassword, user.userPassword)) {

        const checkData = await checkValidation(user.userId,deviceId);
        if(checkData.isAccess){
          resp.send(JSON.stringify({
            user : user,
            token :checkData.accessToken,
            message : checkData.message,
          }));
        }else{
          resp.status(300).send(JSON.stringify(checkData.message));
        }
      } else {
        throw new Error('Incorrect email or password');
      }
  }catch (err) {
    if(err.name == "SequelizeUniqueConstraintError"){
      console.log('Already login')
      resp.status(300).send(JSON.stringify({message  :  'already Login'}));//or return the same tokens from token tables
    }else{
      resp.send(JSON.stringify({
        message :  err.message
      }));
    }
  }
}
