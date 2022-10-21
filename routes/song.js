const song = require('../controllers/song');
const express = require('express');
const {authenticateToken} = require('../controllers/auth/verifyToken');
const route = express.Router();

route.get('/get',authenticateToken,song.getSong);
route.get('/getWithoutLogin',song.getSong);
route.get('/getAll',authenticateToken,song.getSongs);
route.post('/like',authenticateToken,song.likeSong);
route.post('/unlike',authenticateToken,song.unLikeSong);
route.get('/change/quality',authenticateToken,song.changeQuality);
route.get('/songTrack/:name',song.songTrack)
module.exports = route;