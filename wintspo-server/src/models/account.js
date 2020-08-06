const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const { generateToken } = require('lib/token');

function hash(password) {
	return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');}

const Account = new Schema({
	username: String,
	email: { type: String },
	password: String,
	createdAt: { type: Date, default: Date.now}
});

Account.statics.localRegister = function({ username, email, password }) {
    // 데이터를 생성 할 때는 new this() 를 사용합니다.
    const account = new this({
        username,
        email,
        password: hash(password)
    });

    return account.save();
};

Account.statics.findByEmail = function (email) {
    return this.findOne({email}).exec();
};

Account.methods.validatePassword = function(password) {
    // 함수로 전달받은 password 의 해시값과, 데이터에 담겨있는 해시값과 비교를 합니다.
    const hashed = hash(password);
    return this.password === hashed;
};

Account.methods.generateToken = function() {
	const payload = {
		_id: this._id,
		username: this.username
	};

	return generateToken(payload, 'account');
};
module.exports = mongoose.model('Account', Account);
