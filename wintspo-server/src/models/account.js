const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const { generateToken } = require('lib/token');

function hash(password) {
	return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');}

const Account = new Schema({
	profile: {
		username: String,
		thumbnail: { type: String, default: '/static/images/default_thumbnail.png' }
	},
	email: { type: String },
	social: {
		facebook: {
			id: String,
			accessToken: String
		},
		google: {
			id: String,
			accsesToken: String
		}
	},
	password: String,
	thoughtCount: { type: Number, default: 0 },
	createdAt: { type: Date, default: Date.now}
});

Account.statics.findByUsername = function(username) {
	return this.findOne({'profile.username': username}).exec();
};

 // 객체에 내장되어있는 값을 사용 할 때는 객체명.키 필수!

Account.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
};

Account.statics.findByEmailOrUsername = function({username, email}) {
    return this.findOne({
        // $or 연산자를 통해 둘중에 하나를 만족하는 데이터를 찾습니다
        $or: [
            { 'profile.username': username },
            { email }
        ]
    }).exec();
};

Account.statics.localRegister = function({ username, email, password }) {
    // 데이터를 생성 할 때는 new this() 를 사용합니다.
    const account = new this({
        profile: {
            username
            // thumbnail 값을 설정하지 않으면 기본값으로 설정됩니다.
        },
        email,
        password: hash(password)
    });

    return account.save();
};

Account.methods.validatePassword = function(password) {
    // 함수로 전달받은 password 의 해시값과, 데이터에 담겨있는 해시값과 비교를 합니다.
    const hashed = hash(password);
    return this.password === hashed;
};

Account.methods.generateToken = function() {
	const payload = {
		_id: this._id,
		profile: this.profile
	};

	return generateToken(payload, 'account');
};
module.exports = mongoose.model('Account', Account);
