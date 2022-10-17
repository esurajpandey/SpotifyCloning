const Sequelize = require('sequelize');
const connection = require('./connection.js');

exports.User = connection.define('user',{
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey : true
    },
    userName: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    name : {
        type: Sequelize.STRING,
        allowNull: true,
    },
    userEmail : {
        type: Sequelize.STRING,
        unique : true
    },
    userPhone :{
        type : Sequelize.STRING,
        unique : true,
    },
    userPassword: Sequelize.STRING,
    userLanguage: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userDob:{
        type : Sequelize.DATEONLY,
        allowNull:false,
    },
    userProfile : {
        type :Sequelize.STRING,
        allowNull: true,
    },
    // isPremium : {
    //     type : Sequelize.BOOLEAN,
    //     defaultValue : false
    // }
});
