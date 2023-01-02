const db = require('../../models/db');
const { validateEmail } = require('../validation/email');
const { getUserByEmail } = require('./users');

exports.isEmailExits = async (req,resp,next) =>{
    if(req.body.userEmail){
        try{
            if(getUserByEmail(req.body.userEmail)){
                resp.send(JSON.stringify({status: true,result : "Email aleady exist"}));
            }else{
                resp.send(JSON.stringify({status : false,result : "Email doesn't exist"}));
            }
        }catch(err){
            resp.send(JSON.stringify({
                message : err.message
            }));
        }
    }else{
        resp.send(JSON.stringify({status : false}))
    }
}