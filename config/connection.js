const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
    process.env.DATABASE,
    process.env.DB_USERNAME,
    process.env.PASSWORD,
    {
        dialect : process.env.DIALECT,
        host : process.env.HOST,
        logging :false
    }
)

module.exports = connection;
