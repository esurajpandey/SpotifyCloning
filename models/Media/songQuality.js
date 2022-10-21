const connection = require('../connection');
const sequelize = require('sequelize');
const { Song } = require('./song');
exports.SongQuality = connection.define(
    'songQuality',
    {
        id : {
            type: sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
            primaryKey : true
        },
        rate : {//like 128kbps,312kbps,420kbps
            type : sequelize.INTEGER,
            allowNull : false
        },
        url : {
            type : sequelize.STRING,
            allowNull : false
        }
    },{
        timestamps : false
    }
);

