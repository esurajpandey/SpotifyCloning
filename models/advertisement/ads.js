const Sequelize = require('sequelize');
const connection = require('../connection');

exports.ads = connection.define(
    'ads',{
        adsId : {
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
            primaryKey : true
        },

        title : Sequelize.STRING,
        type : Sequelize.STRING,//song,image,video,
        src : Sequelize.STRING,
        duration : Sequelize.STRING,

        received : {
            type : Sequelize.INTEGER,
            defaultValue : 0
        },
        skipped : {
            type : Sequelize.INTEGER,
            defaultValue : 0
        },
        fullPlayed : {
            type : Sequelize.INTEGER,
            defaultValue : 0
        },
    },{
        timestamp : false
    }
);