const express = require('express');
const uploadImage =  require("../Handler/multerImage");
const { createAlbum } = require('../../controllers/album');
const {uploadSong} = require('../Song/upload');
const {getArtistsList} = require('../Artist/getArtist');
const {createArtist} = require('../Artist/createArtist');
const { uploadTrack,upload} = require('../Song/uploadSongTrack');

const route = express.Router();

route.post('/createSong',uploadSong);
route.post('/createAlbum',uploadImage.single("cover"),createAlbum);

route.post('/addArtist',uploadImage.single("cover"),createArtist)
route.get('/getArtistsList',getArtistsList);

route.post('/uploadSong',uploadImage.single('cover'),uploadSong);
route.post('/uploadTrack',upload.single('audio'),uploadTrack);

module.exports = route;