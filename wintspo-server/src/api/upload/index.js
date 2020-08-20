const Router = require('koa-router');
const multer = require('koa-multer');
const path = require('path');
const Upload = require('models/upload');
const Joi = require('joi');
const uploadCtrl = require('./upload.controller');

const upload = new Router();

let storage = multer.diskStorage({
        destination: path.resolve('src/images'),
        filename: (ctx, file, cb) => {
                cb(null, file.originalname);
        }
});
let load = multer({ storage: storage });

upload.post('/images', load.single('file'), async ctx => {
		const { file, body } = ctx.req;
		const schema = Joi.object().keys({
                	title: Joi.string().required(),
        	        content: Joi.string().required()
        	});
        	const result = schema.validate(body);
        	if(result.error) {
        	      ctx.status = 400;
        	      return;
        	}
		const suffix = '13.59.81.107:4000/';
		body.imgpath = suffix + file.originalname;
        	try {
                	await Upload.uploadpost(body);
        	} catch (e) {
                	ctx.throw(500, e);
        	}
        	ctx.body = "success";
	}
);
upload.get('/list', uploadCtrl.uploadList);
upload.get('/spe', uploadCtrl.uploadSpecific);
upload.post('/del', uploadCtrl.uploadDelete);

module.exports = upload;
