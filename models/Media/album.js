const Sequelize = require('sequelize');
const connection = require('../../config/connection.js');
exports.Album = connection.define(
    'album',
    {
        albumId : {
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
            primaryKey : true,
        },
        title : {
            type: Sequelize.STRING,
            allowNull : false,
            unique : true,
        },
        copyRight : {
            type: Sequelize.STRING,
            allowNull : false
        },
        description :{
            type: Sequelize.TEXT,
            allowNull: true
        },
        cover : {
            type : Sequelize.STRING(1000),
            allowNull : true,
        },
        releasedOn : {
            type : Sequelize.DATEONLY,
        }
    },{
        timestamps : false
    }
);

