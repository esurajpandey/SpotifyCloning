const playlist = require('../controllers/playlist/index');

const {authenticateToken} = require('../controllers/auth/verifyToken');
const express = require('express');

const route = express.Router();

route.post('/addSong',authenticateToken,playlist.addSongToPlayList);
route.post('/create',authenticateToken,playlist.createUserPlaylist);
route.post('/edit',authenticateToken,playlist.editPlaylist);
route.get('/edit',authenticateToken,playlist.getEditPlaylist);
route.get('/public/song',playlist.getSongsOfPublicPlaylist);
route.get('/private/song',authenticateToken,playlist.getSongsOfUserPlaylist);
route.get('/userPlaylist',authenticateToken,playlist.getUserPlaylist);
route.get('/public/playlists',authenticateToken,playlist.publicPlaylist)
route.post('/like',authenticateToken,playlist.likePlaylist);
route.post('/unlike',authenticateToken,playlist.unlikePlaylist);
route.delete('/remove',authenticateToken,playlist.removePlaylist);
route.delete('/removeSong',authenticateToken,playlist.removeSongFromPlaylist);

module.exports = route;