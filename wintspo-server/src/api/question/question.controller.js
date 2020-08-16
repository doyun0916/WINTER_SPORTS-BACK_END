const Question = require('models/question');
const Answer = require('models/answer');
const Joi = require('joi');

exports.questionPost = async (ctx) => {

	const schema = Joi.object().keys({
		field: Joi.string().required(),
		title: Joi.string().required(),
		name: Joi.string().required(),
		email: Joi.string().required(),
		content: Joi.string().required(),
		password: Joi.string().required()
	});
	const result = schema.validate(ctx.request.body);
	if(result.error) {
		ctx.status = 400;
		return;
	}

	let question = null;
	try {
		question = await Question.questionPost(ctx.request.body);
	} catch (e) {
		ctx.throw(500, e);
	}
	ctx.body = "success";
};

exports.questionList = async (ctx) => {

	let questionlist = null;
	try {
		questionlist = await Question.questionList();
	} catch (e) {
		ctx.throw(500, e);
	}
	ctx.body = questionlist;
};

exports.questionSpecific = async (ctx) => {

	const schema = Joi.object().keys({
		_id: Joi.string().required(),
		password: Joi.string().required()
	});
	const result = schema.validate(ctx.request.body);
	if(result.error) {
		ctx.status = 400;
		return;
	}

	let questionspecific = null;
	let answerspecific = null;
	try {
		questionspecific = await Question.questionSpecific(ctx.request.body);
		answerspecific = await Answer.answerList();
	} catch (e) {
		ctx.throw(500, e);
	}
	ctx.body = { questionspecific, answerspecific };
};

exports.questionDelete = async (ctx) => {

	const schema = Joi.object().keys({
		_id: Joi.string().required(),
	});
	const result = schema.validate(ctx.request.body);
	if(result.error) {
		ctx.status = 400;
		return;
	}

	try {
		await Question.questionDelete(ctx.request.body._id);
		await Answer.answersyncDelete(ctx.request.body._id);
	} catch (e) {
		ctx.throw(500, e);
	}
	ctx.body = "success";
};
