const Router = require('koa-router');

const api = new Router();
const auth = require('./auth');
const notice = require('./notice');

api.use('/auth', auth.routes());
api.use('/notice', notice.routes());

module.exports = api;
