const {likedPlaylists} = require('./likedPlaylists');
const {likedSongs} = require('./likedSongs');
const {likedPodcasts} = require('./likedPodcasts')
const {likedAlbums} = require('./likedAlbums')
const {likedArtists} = require('./likedArtists');

const library = {};
library.likedPlaylists = likedPlaylists;
library.likedSongs = likedSongs;
library.likedAlbums = likedAlbums;
library.likedArtist = likedArtists;
library.likedPodcasts = likedPodcasts;

module.exports = library;