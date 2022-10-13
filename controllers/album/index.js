const {getAlbum} = require('./getAlbum');
const {albums} = require('./albums');

const album = {};

album.albums = albums;
album.getAlbum = getAlbum;

module.exports = album;