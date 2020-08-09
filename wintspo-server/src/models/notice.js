const mongoose = require('mongoose');
const { Schema } = mongoose;

const Notice = new Schema ({
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now} 
});

Notice.statics.noticepost = function({ title, content }) {
	const notice = new this({
		title,
		content,
	});

	return notice.save();
};

Notice.statics.noticelist = function() {
	return this.find({}, { content: 0 }).exec();
};

Notice.statics.noticeSpecific = function(_id) {
	return this.findOne({ _id }).exec();
};

Notice.statics.noticeDelete = function(_id) {
	return this.deleteOne({ _id }).exec();
};

module.exports = mongoose.model('Notice', Notice);
