// import serve from 'koa-static'

const Koa = require('koa')
const koaBodyparser = require('koa-bodyparser')
const koaJson = require('koa-json')
const koaLogger = require('koa-logger')
const controller = require('./server/controller')
const cors = require('koa-cors');
const path = require('path')
const serve = require('koa-static')


const app = new Koa()
// 将 webpack 打包好的目录作为 koa 静态服务
app.use(serve(path.resolve('dist')))
app.use(koaBodyparser())
app.use(koaJson())
app.use(koaLogger())
// 允许跨域请求
app.use(cors())
// 路由，控制器
app.use(controller())


app.use(async function (ctx, next) {
  let start = new Date()
  await next();
  let ms = new Date() - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms); // 显示执行时间
})
app.on('error', function(err, ctx){
  console.log('server error', err)
});


module.exports = app.listen(3001, () => {
  console.log(`Koa is listening in 3001`)
})
