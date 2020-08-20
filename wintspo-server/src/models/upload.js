const mongoose = require('mongoose');
const { Schema } = mongoose;

const Upload = new Schema ({
	title: String,
	content: String,
	imgpath: String,
	createdAt: { type: Date, default: Date.now }
});

Upload.statics.uploadpost = function({ title, content, imgpath }) {
	const notice = new this({
		title,
		content,
		imgpath,
	});

	return notice.save();
};

Upload.statics.uploadlist = function() {
	return this.find({}, { content: 0 }).exec();
};

Upload.statics.uploadSpecific = function(_id) {
	return this.findOne({ _id }).exec();
};

Upload.statics.uploadDelete = function(_id) {
	return this.deleteOne({ _id }).exec();
};

module.exports = mongoose.model('Upload', Upload);
