const {search} = require('../controllers/search/search');
const express = require('express');
const {authenticateToken} = require('../controllers/auth/verifyToken');
const route = express.Router();

// route.get('/search',search);
route.get('/search',authenticateToken,search)

module.exports = route;