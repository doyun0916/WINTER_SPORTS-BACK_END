const Router = require('koa-router');
const question = new Router();
const questionCtrl = require('./question.controller');

question.post('/questionpost', questionCtrl.questionPost);
question.get('/questionlist', questionCtrl.questionList);
question.get('/questionspe', questionCtrl.questionSpecific);
question.post('/questiondel', questionCtrl.questionDelete);

module.exports = question;
