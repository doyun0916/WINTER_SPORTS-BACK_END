const Router = require('koa-router');
const auth = new Router();
const authCtrl = require('./auth.controller');

auth.post('/register', authCtrl.localRegister);
auth.post('/login', authCtrl.localLogin);
auth.post('/logout', authCtrl.logout);
auth.get('/check', authCtrl.check);

module.exports = auth;
