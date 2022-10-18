const Sequelize = require('sequelize');
const connection = require('./connection.js');

exports.Podcast = connection.define(
    'podcast',
    {
        podcastId : {
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
            primaryKey : true
        },
        title : {
            type : Sequelize.STRING,
            allowNull : false,
            unique : true
        },
        cover : {
            type : Sequelize.STRING
        },
        description : {
            type : Sequelize.TEXT
        },
        studio : {
            type : Sequelize.STRING,
            allowNull : false,
            defaultValue : 'Spotify',
        },
        artistId :  { 
            type :  Sequelize.INTEGER,
            allowNull : false,
            references : {
                model : "artists",
                key : "artistId"
            }
        }
    },{
        timestamp : false
    }
);

