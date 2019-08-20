const Koa = require('koa');
const send = require('koa-send');
const path = require('path');
// const koaBody = require('koa-body');
const router = require('./router');

const app = new Koa();
const defaultOptions = {
  root: path.join(__dirname, './example/dist'),
  index: 'index.html'
}
router.get('/test', (ctx, next) => {
  findCookie(ctx, 'https://baidu.com')
})

app.use(router.routes());
// app.use(bodyParser());
// app.use(koaBody());

app.use(async (ctx) => {
  // if ('/' == ctx.path) return ctx.body = 'Try GET /package.json';
  await send(ctx, ctx.path, defaultOptions);
})

app.listen(12345);
console.log('server is running at 12345 port~')