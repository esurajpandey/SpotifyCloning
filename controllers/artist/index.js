const {followArtist} = require('./followArtist');
const {unfollowArtist} = require('./unfollowArtist');
const {getFollowedArtist} = require('./getFollowedArtist');
const {getArtist} = require('./getArtist');
const {artists} = require('./artists');

const artist = {};
artist.followArtist = followArtist;
artist.unfollowArtist = unfollowArtist;
artist.getFollowedArtist = getFollowedArtist
artist.getArtist = getArtist;
artist.artists = artists;

module.exports = artist;