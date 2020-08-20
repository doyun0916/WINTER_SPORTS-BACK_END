require('dotenv').config();

const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const api = require('./api');
const jwt = require('jsonwebtoken');
const { jwtMiddleware } = require('lib/token');
const path = require('path');

const app = new Koa();
const router = new Router();
const staticDirPath = path.join(__dirname, 'images');

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
		console.log(token);
		return;
	}
});

const port = process.env.PORT || 4000;

app.use(serve(staticDirPath));
app.use(bodyParser());
app.use(jwtMiddleware);
router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log('WinterSports server is listening to port' + port);
});
