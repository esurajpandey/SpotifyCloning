const express = require('express');
const route = express.Router();
const {authenticateToken} = require('../controllers/auth/verifyToken');
const {lastPlayed} = require('../controllers/Player/lastPlayed');

route.get('/lastPlayed',lastPlayed);

module.exports = route;