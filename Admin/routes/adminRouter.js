const express = require('express');

const { createAlbum } = require('../../controllers/album');
const { uploadSong } = require('../Song/createSong');
const { uploadTrack,upload} = require('../Song/uploadSongTrack');
const route = express.Router();

route.post('/createSong',uploadSong);
route.post('/createAlbum',createAlbum)
route.post('/uploadTrack',upload.single('audio'),uploadTrack);
module.exports = route;