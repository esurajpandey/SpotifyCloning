const connection = require('../connection');
const sequelize = require('sequelize');
exports.History = connection.define(
    'history',
    {
        historyId : {
            type: sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
            primaryKey : true
        },
        userId : sequelize.INTEGER,
    }
);





// exports.Song_history = connection.define(
//     'songHistory',{

//     }
// );
// exports.Playlist_history = connection.define(
//     'playlistHistory',

// );
// exports.Artist_history = connection.define(
//     'artistHistory',{

//     }
// );

// exports.Album_history = connection.define(
//     'albumHistory',{

//     }
// )