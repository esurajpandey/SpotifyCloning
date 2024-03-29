const Sequelize = require('sequelize');
const connection = require('../../config/connection.js');

exports.Episodes = connection.define(
    'episode',
    {
       episodeId : {
           type: Sequelize.INTEGER,
           autoIncrement : true,
           allowNull: false,
           primaryKey : true
       },
       cover : {
           type : Sequelize.STRING(1000),
       },
       title : {
           type :Sequelize.STRING,
           allowNull : false
       },
       src:{
           type: Sequelize.TEXT,
           allowNull:false,
       },
       description : {
            type : Sequelize.TEXT
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
       timestamps : false
   }
);