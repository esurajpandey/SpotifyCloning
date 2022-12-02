const Sequelize = require('sequelize');
const connection = require('../../config/connection');
exports.Plan = connection.define('plans',{
    planId : {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey : true
    },
    planName :{
        type : Sequelize.STRING,
        allowNull : false,
        uniqueKey : true
    },
    amount : {
        type: Sequelize.INTEGER,
        allowNull : false
    },
    durationDay:{
        type : Sequelize.INTEGER.UNSIGNED,
        allowNull : false,
    },
    accountCount :{
        type : Sequelize.INTEGER.UNSIGNED,
        allowNull:false,
    },
    isAddFree :{
        type: Sequelize.BOOLEAN,
    },
    isGroupSession :Sequelize.BOOLEAN,
    downloadCount : {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull : false
    },
    downloadDeviceCount : {
        type: Sequelize.INTEGER.UNSIGNED,
        uniqueKey : true,
        allowNull : false,
    },
    offlinePlay : Sequelize.BOOLEAN,
},{
    timestamps :false
});

