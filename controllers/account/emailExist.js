const db = require('../../models/db');
const { validateEmail } = require('../validation/email');
const { getUserByEmail } = require('./users');

exports.isEmailExits = async (req,resp,next) =>{
    try{
        if(getUserByEmail(req.body.userEmail)){
            resp.send({status: true,result : "Email Exist"});
        }else{
            resp.send({status : false,result : "Email doesn't Exist"});
        }
    }catch(err){
        resp.send({status: false,result : "pending"});
    }
}