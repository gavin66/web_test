// import serve from 'koa-static'

const Koa = require('koa')
const koaBodyparser = require('koa-bodyparser')
const koaJson = require('koa-json')
const koaLogger = require('koa-logger')
const controller = require('./server/controller')

const app = new Koa()

app.use(koaBodyparser())
app.use(koaJson())
app.use(koaLogger())

app.use(async function (ctx, next) {
  let start = new Date()
  await next();
  let ms = new Date() - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms); // 显示执行时间
})
app.on('error', function(err, ctx){
  console.log('server error', err)
});

app.use(controller())

module.exports = app.listen(3001, () => {
  console.log(`Koa is listening in 3001`)
})

// app.listen(3001, ()=>{
//   "use strict"
//   console.log('koa is listening in 3001')
// })
// module.exports = app;
