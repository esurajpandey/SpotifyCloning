const connection = require('./connection');

const SongTag = connection.define('songTag',{
},{ timestamps : false}
);

const SongInPlaylist = connection.define('songInPlaylist',{
},{createdAt: 'addedOn'});

const sungBy = connection.define('sungBy',{
    
},{timestamps: false});

const artistTag = connection.define('artistTag',{
},{timestamps: false});

const AlbumTag = connection.define('albumTag',{
},{
    timestamps : false,
});
const PlaylistTag = connection.define('playlistTag',{
    
},{timestamps : false});

const ArtistFollows = connection.define('artistFollower',{
},{
    createdAt: 'followedAt',
});

const LikedPlaylist = connection.define('likedPlaylist',{},{createdAt : 'addedAt'});
const LikedAlbum = connection.define('likedAlbum',{},{createdAt : 'addedAt'});
const LikedSong = connection.define('likedSong',{},{createdAt : 'addedAt'});
const PodcastFollower = connection.define('podcastFollower',{},{createdAt : 'followAt'});

const Song_history = connection.define('songHistory',{});
const Album_history = connection.define('albumHistory',{});
const Artist_history =connection.define('artistHistory',{});
const Playlist_history =connection.define('playlistHistory',{});
const Podcast_History = connection.define('podcastHistory',{});
module.exports = {
    SongTag,
    SongInPlaylist,
    sungBy,
    artistTag,
    ArtistFollows,
    AlbumTag,
    LikedPlaylist,
    LikedAlbum,
    PodcastFollower,
    Song_history,
    Album_history,
    Artist_history,
    Playlist_history,
    Podcast_History,
    LikedSong,
    PlaylistTag,
}
