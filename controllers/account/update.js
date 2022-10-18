const db = require('../../models/db');
const {User} = db;
const cloudinary = require('cloudinary').v2;

//configuration

cloudinary.config({ 
    cloud_name: 'durmhsdmz', 
    api_key: '939679267961565', 
    api_secret: 'A2M7U90paLbLUwUztgJsdeDc04M' 
});


exports.getUpdateUser = async (req,resp,next) =>{
    const userId = req.userId;
    User.findByPk(userId)
    .then(user => {
       resp.status(200).send({
            userName :  user.userName,
            name : user.name,
            userLanguage: user.userLanguage,
            userDob :user.userDob,
            userProfile :user.userProfile,
       })
    })
    .catch(err =>{
        resp.status(400).send(err.name);
    })
    .catch(err =>{
        resp.status(400).send(err);
    });
}

exports.postUpdateUser = async (req,resp,next)=>{
   try{
    const user = await User.findByPk(req.userId);
    user.gender =  req.body.gender;
    user.userDob = req.body.userDob;
    
    //resp.send({status : true , result : });
   }catch(err){
    resp.send({status : false, message : err.message});
   }
}

exports.setProfile = async (req,resp,next) =>{
    try{
        const user = await User.findByPk(req.userId);
        const file = req.files.mypic;
        const res =  await cloudinary.uploader.upload(file.tempFilePath);
        user.name = req.body?.name ?? user.name;
        user.userProfile = res.url;
        resp.send({status : true,result : "Profile Updated"});
    }catch(err) {
        resp.send({status : false, result : err.message});
    }
}

exports.getProfile = async (req,resp,next) =>{
    try{
        const user = await User.findByPk(req.userId);
        resp.send({name : user.name,profile : user.userProfile});
    }catch(err) {
        resp.send({status : false, result : err.message});
    }
}