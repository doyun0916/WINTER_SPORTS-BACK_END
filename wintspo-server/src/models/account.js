const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const { generateToken } = require('lib/token');

// passward encryption
function hash(password) {
	return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');}

// account schema
const Account = new Schema({
	email: String,
	username: String,
	password: String,
	createdAt: { type: Date, default: Date.now}
});

// find a account
Account.statics.findByUsername = function(username) {
	return this.findOne({username}).exec();
};

Account.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
};

Account.statics.findByEmailOrUsername = function({username, email}) {
    return this.findOne({
        $or: [
            { username },
            { email }
        ]
    }).exec();
};

//sign up
Account.statics.localRegister = function({ username, email, password }) {
    const account = new this({
        username,
        email,
        password: hash(password)
    });
    return account.save();
};

//sign in시
Account.methods.validatePassword = function(password) { // DB비밀번호와 맞는지 확인
    const hashed = hash(password);
    return this.password === hashed;
};

// sign up & sign in case generate token
Account.methods.generateToken = function() {
	const payload = {
		_id: this._id,
		profile: this.profile
	};
	return generateToken(payload, 'account');
};
module.exports = mongoose.model('Account', Account);
