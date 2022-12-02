const connection = require("../../config/connection");
const Sequelize = require("sequelize");
exports.currentPlaying = connection.define("currentPlaying", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  songId : Sequelize.INTEGER,
  albumId: Sequelize.INTEGER,
  playlistId: Sequelize.INTEGER
});
