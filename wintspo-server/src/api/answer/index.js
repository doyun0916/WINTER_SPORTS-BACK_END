const Router = require('koa-router');
const answer = new Router();
const answerCtrl = require('./answer.controller');

answer.post('/answerpost', answerCtrl.answerPost);
answer.post('/answerdel', answerCtrl.answerDelete);

module.exports = answer;
