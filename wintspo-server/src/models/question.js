const mongoose = require('mongoose');
const { Schema } = mongoose;

const Question = new Schema ({
	field: String,
	title: String,
	name: String,
	email: String,
	content: String,
	password: String,
	createdAt: { type: Date, default: Date.now},
	update: { type: Number, default: 1}
});

Question.statics.questionPost = function ({ field, title, name, email, content, password }) {
	const question = new this({
		field,
		title,
		name,
		email,
		content,
		password,
	});

	return question.save();
};

Question.statics.questionDelete = function(_id) { 
	return this.deleteOne({ _id }).exec();
};

Question.statics.questionList = function() {
	return this.find({}, { content:0, field:0, name:0, password:0 }).exec();
};

Question.statics.questionSpecific = function({ _id, password }) {
	return this.findOne({ _id, password }, { password:0, update:0 }).exec();
};

Question.statics.questionUpdate = function(_id) {
	return this.updateOne({ "_id" : _id }, { $set: { "update" : 1 }})
};

Question.statics.questionDeupdate = function(_id) {
	return this.updateOne({ "_id" : _id }, { $set: { "update" : 0 }})
};

module.exports = mongoose.model('Question', Question);



