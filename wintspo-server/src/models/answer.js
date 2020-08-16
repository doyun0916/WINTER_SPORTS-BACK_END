const mongoose = require('mongoose');
const { Schema } = mongoose;

const Answer = new Schema ({
	questionid: String,
	content: String,
	admin: String,
	createdAt: { type: Date, default: Date.now}
});

Answer.statics.answerPost = function({ questionid, content, admin }) {
	const answer = new this({
		questionid,
		content,
		admin,
	})

	return answer.save();
};

Answer.statics.answerDelete = function(_id) {
	return this.deleteOne({ _id }).exec();
};

Answer.statics.answerList = function() {
	return this.find({}, { questionid:0 }).exec();
};

Answer.statics.answersyncDelete = function(_id) {
	return this.deleteMany({ "questionid" : _id }).exec();
};

module.exports = mongoose.model('Answer', Answer);
