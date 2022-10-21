const Sequelize = require('sequelize');
const connection = require('../connection.js');
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
        allowNull: false,
    },
    userEmail : {
        type: Sequelize.STRING,
        unique : true
    },
    userPhone :{
        type : Sequelize.STRING,
        unique : true,
    },
    userPassword: {
        type : Sequelize.STRING,
        allowNull :false
    },
    userLanguage: {
        type: Sequelize.STRING,
        defaultValue : "Hindi",
    },
    userGender : {
        type : Sequelize.STRING,
        allowNull : false
    },
    userDob:{
        type : Sequelize.DATEONLY,
        allowNull:false,
    },
    userProfile : {
        type :Sequelize.TEXT,
        allowNull: true,
    },
    userCountry : {
        type : Sequelize.STRING,
        defaultValue : "India"
    }
});
