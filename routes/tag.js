const tag = require('../controllers/tag/index');
const express = require('express');
const {authenticateToken} = require('../controllers/auth/verifyToken');
const route = express.Router();

route.get('/allTags',authenticateToken,tag.allTags);
route.get('/items',authenticateToken,tag.tagsItems);

module.exports = route;