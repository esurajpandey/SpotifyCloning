const connection = require('../connection');
const sequelize= require('sequelize');
exports.ActivityLog = connection.define(
    'logActivity',
    {
        logId  : {
            type : sequelize.INTEGER,
            primaryKey : true,
            allowNull :false,
            autoIncrement : true,
        },
        logCount : {
            type : sequelize.INTEGER,
            defaultValue : 0
        },
        downloadCount : {
            type : sequelize.INTEGER,
            defaultValue : 0
        },
        downloadDeviceCount : {
            type : sequelize.INTEGER,
            defaultValue : 0
        },
    },{
        createdAt : 'loggedAt',
    }
);

exports.LoginToken = connection.define(
    'loginToken',{
        tokenId : {
            type : sequelize.INTEGER,
            primaryKey : true,
            allowNull :false,
            autoIncrement : true,
        },
        deviceId : {
            type : sequelize.INTEGER,
            allowNull :false,
            unique : true
        },
        token : sequelize.TEXT
    }
)
