const playlist = require('../controllers/playlist/index');

const {authenticateToken} = require('../controllers/auth/verifyToken');
const express = require('express');

const route = express.Router();

route.post('/create',authenticateToken,playlist.createUserPlaylist);
route.post('/create/withSong/:songId',authenticateToken,playlist.createWithSong);

route.post('/addSong/:songId/:playlistId',authenticateToken,playlist.addSongToPlayList);

route.post('/edit/:playlistId',authenticateToken,playlist.editPlaylist);
route.get('/edit/:playlistId',authenticateToken,playlist.getEditPlaylist);

route.get('/public/song/:playlistId/:offset',playlist.getSongsOfPublicPlaylist);
route.get('/private/song/:playlistId/:offset',authenticateToken,playlist.getSongsOfUserPlaylist);

route.get('/userPlaylist/:offset',authenticateToken,playlist.getUserPlaylist);
route.get('/public/playlists/:offset',playlist.publicPlaylist);

route.post('/like/:playlistId',authenticateToken,playlist.likePlaylist);
route.post('/unlike/:playlistId',authenticateToken,playlist.unlikePlaylist);

route.delete('/remove/:playlistId',authenticateToken,playlist.removePlaylist);
route.delete('/removeSong/:playlistId/:songId',authenticateToken,playlist.removeSongFromPlaylist);

route.get('/archived/lists/:offset',authenticateToken,playlist.archivePlaylists);
route.patch('/recover',authenticateToken,playlist.recoverPlaylist);

module.exports = route;