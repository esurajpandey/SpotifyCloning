const Sequelize = require('sequelize');
const connection = require('../../config/connection.js');


exports.Settings = connection.define(
    'settings',
    {
        id : {
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
            primaryKey : true
        },
        productNews : {
            type : Sequelize.BOOLEAN,
            defaultValue : false
        },
        spotifyNewsAdnOffers : {
            type :Sequelize.BOOLEAN,
            defaultValue:false
        },
        recommendation : {
            type : Sequelize.BOOLEAN,
            defaultValue:false,
        },
        newMusic : {
            type :Sequelize.BOOLEAN,
            defaultValue : false,
        },
        playlistUpdate: {
            type : Sequelize.BOOLEAN,
            defaultValue:false,
        },
        artistUpdate : {
            type : Sequelize.BOOLEAN,
            defaultValue : false
        },
        concertNotification : {
            type: Sequelize.BOOLEAN,
            defaultValue : false
        },
        userId : Sequelize.INTEGER,
    }
);
