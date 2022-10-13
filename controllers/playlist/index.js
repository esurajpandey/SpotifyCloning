const {addSongToPlayList} =require('./addSongToPlaylist');  
const {createUserPlaylist} = require('./createPlaylist');
const {editPlaylist} = require('./editPlaylist');
const {getEditPlaylist} = require('./editPlaylist');
const {getSongsOfPublicPlaylist} = require('./getSongOfPlaylist')
const {getSongsOfUserPlaylist} = require('./getSongOfPlaylist');
const {likePlaylist,unlikePlaylist} = require('./likePlaylist');
const {removeSongFromPlaylist} = require('./removeSongFromPlaylist');
const {getUserPlaylist} = require('./getUserPlaylists');
const {removePlaylist} = require('./removePlaylist');
const { publicPlaylist } = require('./publicPlaylist');

const playlist = {};
playlist.addSongToPlayList = addSongToPlayList;
playlist.createUserPlaylist = createUserPlaylist;
playlist.editPlaylist = editPlaylist;
playlist.getEditPlaylist = getEditPlaylist;
playlist.getSongsOfUserPlaylist = getSongsOfUserPlaylist;
playlist.getSongsOfPublicPlaylist = getSongsOfPublicPlaylist;
playlist.removePlaylist = removePlaylist;
playlist.removeSongFromPlaylist= removeSongFromPlaylist;
playlist.getUserPlaylist = getUserPlaylist;
playlist.likePlaylist = likePlaylist;
playlist.unlikePlaylist = unlikePlaylist;
playlist.publicPlaylist = publicPlaylist;
module.exports = playlist;