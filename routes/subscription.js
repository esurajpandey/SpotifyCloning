const subscription = require('../controllers/subscription/index');
const express = require('express');
const {authenticateToken} = require('../controllers/auth/verifyToken');
const route = express.Router();

route.get('/plans',subscription.allPlans);
route.get('/subscription',authenticateToken,subscription.getUserSubscription);
// route.post('/subscribe',authenticateToken,subscription.subscribePlan);
route.post('/payment',authenticateToken,subscription.makePayment);
route.get('/paymentDone/:planId/:userId',subscription.paymentDone)
route.get('/paymentCancel',subscription.paymentCancel);
module.exports = route;