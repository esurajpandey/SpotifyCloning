const express = require('express');
const {authenticateToken} = require('../controllers/auth/verifyToken');
const route = express.Router();
const podcast = require('../controllers/podcast/index');

route.get('/all',authenticateToken,podcast.allPodcasts);
route.get('/episode',authenticateToken,podcast.getEpisode);
route.get('/podcast',authenticateToken,podcast.getPodcast);
route.post('/follow',authenticateToken,podcast.followPodcast);
route.post('/unfollow',authenticateToken,podcast.unfollowPodcast);

module.exports = route;
