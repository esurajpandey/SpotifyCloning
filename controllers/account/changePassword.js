const bcrypt = require("bcrypt");
const {User} = require('../../models/user');
const {getHashPassword} = require('../auth/hashData');

exports.changePassword = (req,resp,next) =>{
    const newPassword = req.body.newPassword;

    User.findByPk(req.userId)
    .then(async user =>{
        try{
            if(await bcrypt.compare(req.body.userPassword,user.userPassword)){
                const hashPassword = await getHashPassword(newPassword);
                
                user.userPassword = hashPassword;
                return user.save();
            }else{
                resp.status(500).send('Password not matched');
            }
        }catch(err){
            resp.status(400).send(` Error in change password ${err.name}`);
        }
    })
    .then(result => {
        resp.status(200).send('Password Changed');
    })
    .catch(err =>{
        resp.status(500).send(err);
    })

}
