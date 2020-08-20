const Upload = require('models/upload');
const Joi = require('joi');
const path = require('path');
const fs = require('fs');

exports.uploadList = async (ctx) => {

	let uploadlist = null;
	try {
		uploadlist = await Upload.uploadlist();
	} catch (e) {
		ctx.throw(500, e);
	}
	ctx.body = uploadlist;
};

exports.uploadSpecific = async (ctx) => {
	const schema = Joi.object().keys({
		_id: Joi.string().required()
	});
	const result = schema.validate(ctx.request.body);
	if(result.error) {
		ctx.status = 400;
		return;
	}

	let uploadspecific = null;
	try {
		uploadspecific = await Upload.uploadSpecific(ctx.request.body._id);
        } catch (e) {
                ctx.throw(500, e);
        }
        ctx.body = uploadspecific;
};

exports.uploadDelete = async (ctx) => {

        const schema = Joi.object().keys({
                _id: Joi.string().required(),
		imgpath: Joi.string().required()
        });
        const result = schema.validate(ctx.request.body);
        if(result.error) {
                ctx.status = 400;
                return;
        }

	const suffix = path.resolve('src/images');
	const imgpath = suffix + '/' + path.basename(ctx.request.body.imgpath);
        try {
                await fs.unlinkSync(imgpath);
		await Upload.uploadDelete(ctx.request.body._id);
        } catch (e) {
                ctx.throw(500, e);
        }
        ctx.body = "success";
};

