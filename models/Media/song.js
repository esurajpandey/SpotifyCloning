const Sequelize = require('sequelize');
const connection = require('../../config/connection.js');

exports.Song = connection.define(
    'song',
    {
       songId : {
           type: Sequelize.INTEGER,
           autoIncrement : true,
           allowNull: false,
           primaryKey : true
       },
       cover : {
           type : Sequelize.STRING,
       },
       title : {
           type :Sequelize.STRING,
           allowNull : false
       },
       playCount :{
           type : Sequelize.INTEGER.UNSIGNED,
           defaultValue : 0,
       },
       duration : {
           type : Sequelize.STRING,
           allowNull : false,
       },
       language : {
           type : Sequelize.STRING,
           allowNull : false,
       }
   },{
       timestamps :  false
   }
);