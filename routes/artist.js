const artist = require('../controllers/artist/index');
const express = require('express');
const {authenticateToken} = require('../controllers/auth/verifyToken');
const route = express.Router();

route.post('/follow',authenticateToken,artist.followArtist);
route.get('/followedArtist',authenticateToken,artist.getFollowedArtist);
route.post('unfollow',authenticateToken,artist.unfollowArtist);
route.get('/artistData',authenticateToken,artist.getArtist);
route.get('/artists',artist.artists);
module.exports = route;
