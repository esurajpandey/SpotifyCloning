const library = require('../controllers/library/index');
const express = require('express');
const {authenticateToken} = require('../controllers/auth/verifyToken');
const route = express.Router();

route.get('/likedSongs',authenticateToken,library.likedSongs);
route.get('/likedArtists',authenticateToken,library.likedArtist);
route.get('/likedAlbums',authenticateToken,library.likedAlbums);
route.get('/likedPlaylists',authenticateToken,library.likedPlaylists);
route.get('/likedPodcasts',authenticateToken,library.likedPodcasts);

module.exports = route;