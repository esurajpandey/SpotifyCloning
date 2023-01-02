const connection = require('../config/connection');
const {User} = require('./Account/user');
const {ActivityLog,LoginToken} = require('./History/activityLog');
const {Album} = require('./Media/album');
const {Artist} = require('./Artist/artist');
const {Plan} = require('./Subscription/plan');
const {Playlist} = require('./Media/playlist');
const {Settings} = require('./Account/settings');
const {Song} = require('./Media/song');
const {History} = require('./History/history');
const {Subscription} = require('./Subscription/subscription');
const {Tag} = require('./Media/tag');
const {Podcast} = require('./Podcast/podcast');
const {Episodes} = require('./Podcast/episode');
const {SongQuality} = require('./Media/songQuality');
const {currentPlaying} = require("./Player/currentPlaying");

const {
    SongTag,
    SongInPlaylist,
    sungBy,
    artistTag,
    ArtistFollows,
    AlbumTag,
    LikedPlaylist,
    LikedAlbum,
    Song_history,
    Album_history,
    Artist_history,
    Playlist_history,
    LikedSong,
    PlaylistTag,
    PodcastFollower,
    Podcast_History
} = require('./relationalModel');

const { ads } = require('./advertisement/ads');
const db = {};
db.connection = connection;
db.User = User;
db.Settings = Settings;
db.Artist = Artist;
db.Song = Song;
db.Album = Album;
db.Playlist = Playlist;
db.Tag = Tag;
db.Plan = Plan;
db.Subscription = Subscription;
db.History = History;
db.SongTag = SongTag;
db.SongInPlaylist = SongInPlaylist;
db.sungBy = sungBy;
db.artistTag = artistTag;
db.ArtistFollows = ArtistFollows;
db.LikedPlaylist = LikedPlaylist;
db.LikedAlbum = LikedAlbum;
db.Podcast = Podcast;
db.Episodes = Episodes;
db.ActivityLog = ActivityLog;
db.LoginToken = LoginToken;
db.Song_history = Song_history;
db.Album_history = Album_history;
db.Artist_history = Artist_history;
db.Playlist_history = Playlist_history;
db.AlbumTag = AlbumTag;
db.SongQuality = SongQuality;
db. LikedSong = LikedSong;
db.PlaylistTag = PlaylistTag;
db. PodcastFollower = PodcastFollower;
db.Podcast_History = Podcast_History;
db.ads = ads;
db.currentPlaying = currentPlaying;

/*----- One to One -----*/
User.hasOne(Settings,{
    foreignKey : "userId",
});

Settings.belongsTo(User,{
    foreignKey : "userId",
});

User.hasOne(currentPlaying,{
    foreignKey:"userId",
    constraints :true,
    onDelete : 'CASCADE'
});

currentPlaying.belongsTo(User,{
    foreignKey : "userId",
    constraints :true,
    onDelete : 'CASCADE'
});



/*-------for maintaining history of played song -------*/
User.hasOne(History,{
    foreignKey : "userId",
});


History.belongsTo(User,{
    foreignKey : "userId",
    constraints :true,
    onDelete : 'CASCADE'
});


//for premium plan subscriptions
User.hasOne(Subscription,{
    foreignKey : "userId",
});

Subscription.belongsTo(User,{
    foreignKey : "userId",
    constraints :true,
    onDelete : 'CASCADE'
});

User.hasOne(ActivityLog,{
    foreignKey : "userId"
});
ActivityLog.belongsTo(User,{
    foreignKey : "userId",
    constraints :true,
    onDelete : 'CASCADE'
});

/*------one to many-------*/
Song.hasMany(SongQuality,{
    foreignKey : 'songId'
});

SongQuality.belongsTo(Song,{
    foreignKey : 'songId'
});

ActivityLog.hasMany(LoginToken,{
    foreignKey : 'logId'
});

LoginToken.belongsTo(ActivityLog,{
    foreignKey : 'logId'
});

Podcast.hasMany(Episodes, {
    foreignKey : "podcastId"
});

Episodes.belongsTo(Podcast,{
    foreignKey : "podcastId"
});

Podcast.belongsTo(Artist,{
    foreignKey : "artistId"
});

Artist.hasMany(Podcast,{
    foreignKey : "artistId"
});

User.hasMany(Playlist,{
    foreignKey : "userId",
});

Playlist.belongsTo(User,{
    foreignKey : "userId",
    constraints :true,
    onDelete : 'CASCADE'
});

//plan
Subscription.belongsTo(Plan,{
    foreignKey : "planId",
});

Plan.hasMany(Subscription,{
    foreignKey : "planId",
});


//album to song
Song.belongsTo(Album,{
    foreignKey : "albumId"
});

Album.hasMany(Song,{
    foreignKey : "albumId",
});



/*-----------many to many ---------*/
//song tag
Tag.belongsToMany(Song,{
    through : "songTag",
    foreignKey : "tagId"
});

Song.belongsToMany(Tag,{
    through : "songTag",
    foreignKey : "songId"
});

//playlist has many song and song belongs to many playlist
Playlist.belongsToMany(Song,{
    through : "songInPlaylist",
    foreignKey : "playlistId"
});

Song.belongsToMany(Playlist,{
    through : "songInPlaylist",
    foreignKey : "songId"
});

//song can be sung by many artist and artist can sung many song
Song.belongsToMany(Artist,{
    through : "sungBy",
    foreignKey : "songId"
});

//artist can sung many songs
Artist.belongsToMany(Song,{
    through : "sungBy",
    foreignKey : "artistId"
});

//user can follow many artist and artist can followed by many user
User.belongsToMany(Artist,{
    through : "artistFollower",
    foreignKey : "userId"
})

Artist.belongsToMany(User,{
    through : "artistFollower",
    foreignKey : "artistId"
});

//artist tag
Artist.belongsToMany(Tag,{
    through : "artistTag",
    foreignKey : "artistId"
});

Tag.belongsToMany(Artist,{
    through:"artistTag",
    foreignKey : "tagId"
});

//album tag
Album.belongsToMany(Tag,{
    through : "albumTag",
    foreignKey : "albumId"
});

Tag.belongsToMany(Album,{
    through : "albumTag",
    foreignKey : "tagId"
});

Playlist.belongsToMany(Tag,{
    through : "playlistTag",
    foreignKey : "playlistId"
});

Tag.belongsToMany(Playlist,{
    through : "playlistTag",
    foreignKey : "tagId"
});

User.belongsToMany(Playlist,{
    through : "likedPlaylist",
    foreignKey : "userId"
});

Playlist.belongsToMany(User,{
    through : "likedPlaylist",
    foreignKey : "playlistId"
});

User.belongsToMany(Album,{
    through : "likedAlbum",
    foreignKey : "usedId"
});

Album.belongsToMany(User,{
    through : "likedAlbum",
    foreignKey : "albumId"
});

User.belongsToMany(Song,{
    through : "likedSong",
    foreignKey : 'userId',
});

Song.belongsToMany(User,{
    through: "likedSong",
    foreignKey : 'songId',
});

User.belongsToMany (Podcast,{
    through : 'podcastFollower',
    foreignKey : 'userId'
});

Podcast.belongsToMany(User,{
    through: "podcastFollower",
    foreignKey : 'podcastId',
});

//history

Podcast.belongsToMany(History,{
    through : 'podcastHistory',
    foreignKey : "podcastId"
});

History.belongsToMany(Podcast, {
    through : 'podcastHistory',
    foreignKey : "historyId"
});

Album.belongsToMany(History,{
    through : 'albumHistory',
    foreignKey : 'albumId'
});


History.belongsToMany(Album,{
    through : 'albumHistory',
    foreignKey : 'historyId'
});

Song.belongsToMany(History,{
    through : 'songHistory',
    foreignKey : 'songId'
});

History.belongsToMany(Song,{
    through : 'songHistory',
    foreignKey : 'historyId'
});

Playlist.belongsToMany(History,{
    through : 'playlistHistory',
    foreignKey : 'playlistId'
});

History.belongsToMany(Playlist,{
    through : 'playlistHistory',
    foreignKey : 'historyId'
});

Artist.belongsToMany(History,{
    through : 'artistHistory',
    foreignKey : 'artistId'
});

History.belongsToMany(Artist,{
    through : 'artistHistory',
    foreignKey : 'historyId'
});

(async () =>{
    try{
    await connection.sync({force : false})//force true means recreate the tables
    console.log('Connected');
    }
    catch(err){
        console.log(err)
    }
})();

// connection
//     .authenticate()
//     .then(() => {
//         console.log("Connected")
//     })
//     .catch((er) => {
//       console.log(er);
//     });
module.exports = db;
