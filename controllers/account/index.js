const {create} = require('./create');
const {login} = require('./login');
const {getUsers} = require('./users');
const {changePassword} = require('./changePassword');
const {deleteAccount} = require('./deleteAccount');
const {logout} = require('./logout');
const {editSettings,getSettings} = require('./setting');
const {postUpdateUser,getUpdateUser} = require('./update');

const account = {};
account.create = create;
account.login = login;
account.getUsers = getUsers;
account.editSettings = editSettings;
account.getSettings = getSettings;
account.changePassword = changePassword;
account.deleteAccount = deleteAccount;
account.logout = logout;
account.postUpdateUser = postUpdateUser;
account.getUpdateUser = getUpdateUser;

module.exports = account;