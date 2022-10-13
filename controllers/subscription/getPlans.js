const db = require('../../models/db');
const sequelize = require('sequelize');
const {Plan} = db;

exports.allPlans = async(req,resp,next) =>{
    try{
        const plans = await Plan.findAll({
            where : {
                planName : {
                    [sequelize.Op.ne] : 'Free Plan',
                }
            }
        });
        resp.send(plans);
    }catch(err){
        resp.status(400).send(err.message);
    }
}

