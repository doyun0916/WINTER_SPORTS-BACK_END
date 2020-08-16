const Notice = require('models/notice');
const Joi = require('joi');

exports.noticePost = async (ctx) => {
	
	const schema = Joi.object().keys({
		title: Joi.string().required(),
		content: Joi.string().required()
	});
	const result = schema.validate(ctx.request.body);
	if(result.error) {
		ctx.status = 400;
		return;
	}

	let notice = null;
	try {
		notice = await Notice.noticepost(ctx.request.body);
	} catch (e) {
		ctx.throw(500, e);
	}
	ctx.body = "success";
};

exports.noticeList = async (ctx) => {
	
	let noticelist = null;
	try {
		noticelist = await Notice.noticelist();
	} catch (e) {
		ctx.throw(500, e);
	}	
	ctx.body = noticelist;
};

exports.noticeSpecific = async (ctx) => {

	const schema = Joi.object().keys({
		_id: Joi.string().required()
	});
	const result = schema.validate(ctx.request.body);
	if(result.error) {
		ctx.status = 400;
		return;
	}

	let noticespecific = null;
	try {
		noticespecific = await Notice.noticeSpecific(ctx.request.body._id);
	} catch (e) {
		ctx.throw(500, e);
	}
	ctx.body = noticespecific;
};

exports.noticeDelete = async (ctx) => {

	const schema = Joi.object().keys({
		_id: Joi.string().required()
	});
	const result = schema.validate(ctx.request.body);
	if(result.error) {
		ctx.status = 400;
		return;
	}

	try {
		await Notice.noticeDelete(ctx.request.body._id);
	} catch (e) {
		ctx.throw(500, e);
	}
	ctx.body = "success";
};
