const Sequelize = require('sequelize');
const connection = require('../../config/connection');


exports.Subscription  = connection.define('subscription',{
    id  : {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey : true
    },
    isAutoRenew : Sequelize.BOOLEAN,
    endDate : Sequelize.DATE
},{
    createdAt : 'startDate',
}
);
