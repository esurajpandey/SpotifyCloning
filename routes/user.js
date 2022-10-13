const express = require('express');
const account = require('../controllers/account/index');
const {authenticateToken} = require('../controllers/auth/verifyToken');
const {search} = require('../controllers/search/search');
const {getHistory} = require('../controllers/History/history');
const route = express.Router();

route.post('/login',account.login);
route.post('/create',account.create);
route.get('/search',authenticateToken,search);
route.post('/changePassword',authenticateToken,account.changePassword);
route.delete('/delete',authenticateToken,account.deleteAccount);

route.patch('/update',authenticateToken,account.postUpdateUser);
route.get('/data',authenticateToken,account.getUpdateUser);
route.get('/getSettings',authenticateToken,account.getSettings);
route.patch('/editSettings',authenticateToken,account.editSettings);
route.post('/logout',authenticateToken,account.logout);
route.get('/get',account.getUsers);
route.get('/history',authenticateToken,getHistory);
module.exports = route;
