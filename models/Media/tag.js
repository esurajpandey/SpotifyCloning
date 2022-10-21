const Sequelize = require('sequelize');
const connection = require('../connection.js');
exports.Tag = connection.define(
    'tag',
    {
        tagId :{
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
            primaryKey : true,
        },
        tagName :{
            type : Sequelize.TEXT,
            allowNull:false,
        },
        cover : {
            type : Sequelize.TEXT,
            allowNull : false
        }
    },{
        timestamps :false
    }
);