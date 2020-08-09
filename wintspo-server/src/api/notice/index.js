const Router = require('koa-router');
const notice = new Router();
const noticeCtrl = require('./notice.controller');

notice.post('/noticepost', noticeCtrl.noticePost);
notice.get('/noticelist', noticeCtrl.noticeList);
notice.get('/noticespe', noticeCtrl.noticeSpecific);
notice.post('/noticedel', noticeCtrl.noticeDelete);

module.exports = notice;


