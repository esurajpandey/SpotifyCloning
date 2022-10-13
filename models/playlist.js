const Sequelize = require('sequelize');
const connection = require('./connection.js');

exports.Playlist = connection.define(
    'playlist',
    {
        playlistId:{
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
            primaryKey : true,
        },
        title :{
            type:Sequelize.STRING,
        },
        cover : {
            type : Sequelize.STRING,
            allowNull : true
        },
        description : {
            type : Sequelize.STRING
        },
        type :{
            type:Sequelize.STRING//public private, radio
        },
        likes : {
            type : Sequelize.INTEGER.UNSIGNED,
            defaultValue : 0
        }
    }
);
