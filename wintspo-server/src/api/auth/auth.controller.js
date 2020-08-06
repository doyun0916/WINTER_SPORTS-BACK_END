const Joi = require('joi');
const Account = require('models/account');

exports.localRegister = async (ctx) => {
	
	const schema = Joi.object().keys({
		username: Joi.string().alphanum().min(3).max(15).required(),
		email: Joi.string().email().required(),
		password: Joi.string().required().min(5)
	});

	const result = schema.validate(ctx.request.body);
	if(result.error) {
		ctx.status = 400;
		return;
	}

	let existing = null;
	try {
		existing = await Account.findByEmail(ctx.request.body.email);
	} catch (e) {
		ctx.throw(500, e);
	}
	if(existing) {
		ctx.status = 409;
		return;
	}

	let account = null;
	try {
		account = await Account.localRegister(ctx.request.body);
	} catch (e) {
		ctx.throw(500, e);
	}

	ctx.body = account.username;
};

exports.localLogin = async (ctx) => {
	const schema = Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	});

	const result = schema.validate(ctx.request.body);

	if(result.error) {
		ctx.status = 400;
		return;
	}

	const { email, password } = ctx.request.body;

	let account = null;
	try {
		account = await Account.findByEmail(email);
	} catch (e) {
		ctx.throw(500, e);
	}

	if(!account || !account.validatePassword(password)) {
		ctx.status = 403;
		return;
	}

	let token = null;
	try {
		token = await account.generateToken();
	} catch (e) {
		ctx.throw(500, e);
	}

	ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24});
	ctx.body = account.username;
};

exports.logout = (ctx) => {
    ctx.cookies.set('access_token', null, {
        maxAge: 0, 
        httpOnly: true
    });
    ctx.status = 204;
    ctx.body = "success";
};

exports.check = (ctx) => {
	const { user } = ctx.request;
	if(!user) {
		ctx.status = 403;
		return;
	}
	ctx.body = user.username;
};
