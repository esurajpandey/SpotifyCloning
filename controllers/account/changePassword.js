const bcrypt = require("bcrypt");
const db = require('../../models/db');
const {User} = db;
const {getHashPassword} = require('../auth/hashData');

exports.changePassword = async (req,resp,next) =>{
    const newPassword = req.body.newPassword;
    console.log(req.userId);
    const res = {};

    if(newPassword === req.body.userPassword){
        res.status = true;
        res.result = "Password Changed";
    }else{
        try{
            const user = await User.findByPk(req.userId)
            if(await bcrypt.compare(req.body.userPassword,user.userPassword)){
                const hashPassword = await getHashPassword(newPassword);
                user.userPassword = hashPassword;
                await user.save();
                res.status = true;
                res.result = "Password Changed";
            }else{
                res.status = false;
                res.result = "Password not matched";
            }
            resp.send(res);
        }catch(err){
            res.status = false;
            res.result = "Something went wrong";
            resp.send(res);
        }
    }
}
