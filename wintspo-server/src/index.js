require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const api = require('./api');
const jwt = require('jsonwebtoken');
const { jwtMiddleware } = require('lib/token');
const multer = require('koa-multer');
const path = require('path');

const app = new Koa();
const router = new Router();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(
  (response) => {
    console.log('Successfully connected to mongodb');
  }
).catch(e => {
  console.error(e);
});

const token = jwt.sign({ creator: 'dyk'}, 'secret-key', { expiresIn: '1d' }, (err, token) => {
	if(err) {
		console.log(err);
		return;
	}
	console.log(token);
});

let storage = multer.diskStorage({
	destination: path.resolve('images'),
	filename: (ctx, file, cb) => {
		const uniqueSuffix = '파일경로확정시추가';
		cb(null, uniqueSuffix + file.originalname);
	}
});
let upload = multer({ storage: storage });
router.post('/upload', upload.single('file'), async ctx => {
	if(ctx.req.file) {
		ctx.body = 'upload success';
	} else {
		ctx.body = 'upload error';
	}
});

const port = process.env.PORT || 4000;

app.use(bodyParser());
app.use(jwtMiddleware);
router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log('WinterSports server is listening to port' + port);
});
