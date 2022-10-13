const {allPlans} = require('./getPlans');
const {getUserSubscription} = require('./getUserSubscription');
const {makePayment,paymentDone,paymentCancel} = require('./payment/pay');

const subscription = {};
subscription.allPlans = allPlans;
// subscription.subscribePlan = subscribePlan;
subscription.getUserSubscription  = getUserSubscription;
subscription.makePayment = makePayment;
subscription.paymentCancel = paymentCancel;
subscription.paymentDone = paymentDone;

module.exports = subscription;
