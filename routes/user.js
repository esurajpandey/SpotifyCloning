const express = require('express');
const account = require('../controllers/account/index');
const {authenticateToken} = require('../controllers/auth/verifyToken');
const {search} = require('../controllers/search/search');
const {getHistory} = require('../controllers/History/history');
const route = express.Router();

route.post('/login',account.login);
route.post('/create',account.createAccount);

route.patch('/changePassword',authenticateToken,account.changePassword);
route.delete('/delete',authenticateToken,account.deleteAccount);

route.patch('/edit',authenticateToken,account.postUpdateUser);
route.get('/account/',authenticateToken,account.getUpdateUser);

route.get('/getSettings',authenticateToken,account.getSettings);
route.patch('/editSettings',authenticateToken,account.editSettings);

route.post('/logout',authenticateToken,account.logout);
route.post('/logout/all',authenticateToken,account.logoutFromEverywhere);

route.get('/profile',authenticateToken,account.getProfile);
route.patch('/profile',authenticateToken,account.setProfile);

route.get('/history/:offset',authenticateToken,getHistory);
route.post('/check/email',account.isEmailExits);

module.exports = route;
