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
        duration : Sequelize.INTEGER
    }
);