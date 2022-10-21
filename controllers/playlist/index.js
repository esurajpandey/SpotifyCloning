const {addSongToPlayList} =require('./addSongToPlaylist');  
const {createUserPlaylist} = require('./create/createPlaylist');
const {editPlaylist} = require('./editPlaylist');
const {getEditPlaylist} = require('./editPlaylist');
const {getSongsOfPublicPlaylist} = require('./getSongOfPlaylist')
const {getSongsOfUserPlaylist} = require('./getSongOfPlaylist');
const {likePlaylist,unlikePlaylist} = require('./likePlaylist');
const {removeSongFromPlaylist} = require('./removeSongFromPlaylist');
const {getUserPlaylist} = require('./getUserPlaylists');
const {removePlaylist} = require('./removePlaylist');
const { publicPlaylist } = require('./publicPlaylist');
const { archivePlaylists } = require('./archive/getArchivePlaylist');
const {recoverPlaylist} = require('./archive/recoverPlaylist');
const { createWithSong } = require('./create/createWithSong');
const playlist = {};
playlist.addSongToPlayList = addSongToPlayList;
playlist.createUserPlaylist = createUserPlaylist;
playlist.createWithSong = createWithSong;

playlist.editPlaylist = editPlaylist;
playlist.getEditPlaylist = getEditPlaylist;

playlist.getSongsOfUserPlaylist = getSongsOfUserPlaylist;
playlist.getSongsOfPublicPlaylist = getSongsOfPublicPlaylist;

playlist.removePlaylist = removePlaylist;
playlist.removeSongFromPlaylist= removeSongFromPlaylist;

playlist.getUserPlaylist = getUserPlaylist;
playlist.publicPlaylist = publicPlaylist;

playlist.likePlaylist = likePlaylist;
playlist.unlikePlaylist = unlikePlaylist;

playlist.archivePlaylists = archivePlaylists;
playlist.recoverPlaylist = recoverPlaylist;

module.exports = playlist;