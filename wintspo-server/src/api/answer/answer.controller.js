const Answer = require('models/answer');
const Question = require('models/question');
const Joi = require('joi');

exports.answerPost = async (ctx) => {

	const schema = Joi.object().keys({
		questionid: Joi.string().required(),
		content: Joi.string().required(),
		admin: Joi.string().required()
	});
	const result = schema.validate(ctx.request.body);
	if(result.error) {
		ctx.status = 400;
		return;
	}

	try {
		await Answer.answerPost(ctx.request.body);
		if (ctx.request.body.admin === 'false') {
			await Question.questionUpdate(ctx.request.body.questionid);
		} else {
			await Question.questionDeupdate(ctx.request.body.questionid);
		}
	} catch (e) {
		ctx.throw(500, e);
	}
	ctx.body = "success";
};

exports.answerDelete = async (ctx) => {

	const schema = Joi.object().keys({
		_id: Joi.string().required()
	});
	const result = schema.validate(cx.request.body);
	if(result.error) {
		ctx.status = 400;
		return;
	}

	try {
		await Answer.answerDelete(ctx.request.body._id);
	} catch (e) {
		ctx.throw(500, e);
	}
	ctx.body = "success";
}
