const ads = require('../controllers/Ads/index');
const express = require('express');
const {authenticateToken} = require('../controllers/auth/verifyToken');

const route = express.Router();

route.get('/get',authenticateToken,ads.get_ads);
route.get('/skip',authenticateToken,ads.skipAd);

route.post('/upload',authenticateToken,ads.uploadAds);
route.post('/fullPlayed',authenticateToken,ads.fullPlayed);

module.exports = route;