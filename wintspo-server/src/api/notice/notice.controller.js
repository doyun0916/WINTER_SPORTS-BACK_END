const Notice = require('models/notice');

exports.noticePost = async (ctx) => {

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

	let noticespecific = null;
	try {
		noticespecific = await Notice.noticeSpecific(ctx.request.body._id);
	} catch (e) {
		ctx.throw(500, e);
	}
	ctx.body = noticespecific;
};

exports.noticeDelete = async (ctx) => {

	try {
		await Notice.noticeDelete(ctx.request.body._id);
	} catch (e) {
		ctx.throw(500, e);
	}
	ctx.body = "success";
};
