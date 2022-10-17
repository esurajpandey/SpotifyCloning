const {getAlbum} = require('./getAlbum');
const {albums} = require('./albums');
const {createAlbum, uploadSongDetails,uploadSRC,assignArtist} = require('./createAlbum');

const album = {};
album.albums = albums;
album.getAlbum = getAlbum;
album.createAlbum = createAlbum;
album.uploadSongDetails = uploadSongDetails;
album.uploadSRC = uploadSRC;
album.assignArtist = assignArtist;

module.exports = album;