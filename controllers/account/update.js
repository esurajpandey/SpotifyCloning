const db = require("../../models/db");
const bcrypt = require("bcrypt");
require('dotenv').config();
const { getUserByEmail } = require("./users");
const { getUploadedUrl } = require("../../helper/getUrlFromCloudinary");
const { User } = db;

exports.getUpdateUser = async (req, resp, next) => {
  // const userId = req.userId;
  const userId = req.userId;
  try{
    const user = await User.findByPk(userId);
    const subscription = await db.Subscription.findOne({
      where : {
        userId : userId
      }
    });

    const plan = await db.Plan.findByPk(subscription.planId); 
    const planData = {};
    planData.name = plan.planName;
    
    if(plan.planId != 1){
      planData.expiryDate = subscription.endDate;
    }else{
      planData.message = "Play any song, any time, with ads."
    }
    resp.send({
      userData : {
          userId :user.userId,
          userName: user.userName,
          userEmail: user.userEmail,
          userGender: user.userGender,
          userLanguage: user.userLanguage,
          userDob: user.userDob,
          userCountry: user.userCountry,
      },
      planData
    })
  }catch(err){
    resp.send({status : false,result : err.message});
  }
  
};

exports.postUpdateUser = async (req, resp, next) => {
    const rd = {};
    console.log(`userId : ${req.userId} body ${req.body.userEmail}`);
  try {
    const user = await User.findByPk(req.userId);
    if (await bcrypt.compare(req.body.userPassword, user.userPassword)) {
      //checking email is exist or not
      console.log(req.body.userEmail);
      user.userEmail = req.body?.userEmail ?? user.userEmail;
      user.userGender = req.body?.userGender ?? user.userGender;
      user.userDob = req.body?.userDob ?? user.userDob;
      
      // user.userLanguage = req.body.userLanguage;
      const d = await user.save();
      rd.status = true;
      rd.message = "User Updated"
      console.log(d);
    }else{
        rd.status = false;
        rd.message = "Password is wrong"
    }
    resp.send(rd);
  } catch (err) {
    resp.send({ status: false, message: err.message });
  }
};

exports.setProfile = async (req, resp, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const file = req.files.profile;
    const url = await getUploadedUrl(file);
    user.name = req.body?.name ?? user.name;
    user.userProfile = url;

    await user.save();
    resp.send({ status: true, result: "Profile Updated" });
  } catch (err) {
    console.log(err);
    resp.send({ status: false, result: err.message });
  }
};

exports.getProfile = async (req, resp, next) => {
  try {
    const user = await User.findByPk(req.userId);
    resp.send({ name: user.name, profile: user.userProfile });
  } catch (err) {
    resp.send({ status: false, result: err.message });
  }
};
