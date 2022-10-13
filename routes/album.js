const album = require('../controllers/album/index');
const express = require('express');
const {authenticateToken} = require('../controllers/auth/verifyToken');
const route = express.Router();

route.get('/allAlbums',album.albums);
route.get('/item',album.getAlbum);

module.exports = route;