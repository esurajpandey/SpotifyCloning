const {addSong} = require('./addSong');
const { changeQuality } = require('./changeQuality');
const {getSong} = require('./getSong');
const {getSongs} = require('./getSongs');
const {likeSong} = require('./likeSong');
const {unLikeSong} = require('./unlikeSong');

const song = {
    addSong,
    getSong,
    getSongs,
    likeSong,
    unLikeSong,
    changeQuality
};

module.exports = song;



