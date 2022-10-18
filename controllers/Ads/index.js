const { get_ads } = require("./get_ads");
const { skipAd } = require("./skipAd");
const { uploadAds } = require("./uploadAds");
const {fullPlayed} = require('./fullPlayed');
const ads = {};
ads.get_ads = get_ads;
ads.skipAd = skipAd;
ads.uploadAds = uploadAds;
ads.fullPlayed = fullPlayed;

module.exports = ads;
