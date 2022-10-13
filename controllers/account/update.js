const db = require('../../models/db');
const {User} = db;

exports.getUpdateUser = (req,resp,next) =>{
    const userId = req.userId;

    User.findByPk(userId)
    .then(user => {
       resp.status(200).send({
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

exports.postUpdateUser = (req,resp,next)=>{
    const userId = req.userId;

    const updated_name  =  req.body.name;
    const updated_userLanguage = req.body.userLanguage;
    const updated_userDob = req.body.userDob;
    const updated_userProfile = req.body.userProfile;

    User.findByPk(userId)
    .then(user => {
        console.log(user);
        user.name = updated_name;
        user.userLanguage = updated_userLanguage;
        user.userDob = updated_userDob;
        user.userProfile = updated_userProfile;
        return user.save();
    })
    .then(result =>{
        resp.status(200).send('Account updated');
    })
    .catch(err =>{
        resp.status(400).send(err);
    });
}