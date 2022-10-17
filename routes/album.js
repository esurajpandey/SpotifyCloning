const album = require('../controllers/album/index');
const express = require('express');
const {authenticateToken} = require('../controllers/auth/verifyToken');
const route = express.Router();

route.get('/allAlbums',album.albums);
route.get('/item',album.getAlbum);
route.post('/create',album.createAlbum);
route.post('/upload/songDetails',album.uploadSongDetails);
route.post('/song/artists',album.assignArtist);
route.post('/song/src',album.uploadSRC);
module.exports = route;