const Sequelize = require('sequelize');
const connection = require('../../config/connection');

exports.Artist = connection.define(
    'artist',
    {
        artistId :{
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
            primaryKey : true
        },
        artistName:{
            type : Sequelize.STRING,
            unique : true,
            allowNull: false
        },
        followersCount:{
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        cover : {
            type : Sequelize.STRING(1000),
            allowNull : true
        },
        dob : {
            type:Sequelize.DATEONLY,
            allowNull: false,
        }
    },{
        timestamps : false
    }
);
