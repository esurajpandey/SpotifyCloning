require('dotenv').config();
const express = require('express');
const db = require('../../../models/db');
const {Plan,Subscription} = db;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.makePayment = async(req,resp,next) => {
    const data = await Plan.findByPk(req.body.planId);
    let plan = [{
        planName : data.planName,
        amount : data.amount,

    }]
    console.log(req.userId);
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types : ['card'],
            mode : 'payment',
            line_items : plan.map(p => {
                return {
                    price_data : {
                        currency : 'inr',
                        product_data : {
                            name : p.planName,
                        },
                        unit_amount : p.amount * 100
                    },
                    quantity : 1
                }
            }),
            success_url : `${process.env.SERVER_URL_SUCCESS}/${data.planId}/${req.userId}`,
            cancel_url : `${process.env.SERVER_URL_CANCEL}`,
        });
        resp.json ({ url : session.url });
    }catch(err){
        resp.send(err.message);
    }
}


function getEndDate(days){

    let today = new Date();
    let day = today.getDate() + days;
    let endDate = new Date(today.getFullYear(),today.getMonth(),day);
    console.log(endDate);
    return endDate;

}

exports.paymentDone = async (req,resp,next)=> {

    const planId = req.params.planId;
    const userId = req.params.userId;

    console.log("Hi I am here" + planId);
    console.log(userId);

    try{
        // const plan = await Plan.findByPk(planId);
        const subscription = await Subscription.findOne({
            where : {
                userId : userId
            }
        });
        const plan = await Plan.findByPk(subscription.planId);
        //update subscription details
        subscription.endDate = getEndDate(plan.durationDay);
        subscription.planId =  planId;
        result = await subscription.save();

        resp.status(200).send('Your subscription will start now...');
    }catch(err){
        resp.status(400).send(err);
        console.log(err.message);
    }
}
exports.paymentCancel = (req,resp,next) =>{
    resp.redirect('subscription/plan')
}
