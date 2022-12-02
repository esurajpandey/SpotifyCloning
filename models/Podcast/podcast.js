const Sequelize = require('sequelize');
const connection = require('../../config/connection.js');

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
            type : Sequelize.STRING(1000),
            allowNull : false
        },
        description : {
            type : Sequelize.TEXT
        },
        studio : {
            type : Sequelize.STRING,
            allowNull : false,
            defaultValue : 'Spotify',
        }
    },{
        timestamps : false
    }
);

