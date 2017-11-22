const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
app.use(json())
app.use(logger())
app.use(function* (next) {
  let start = new Date()
  yield next;
  let ms = new Date() - start;
  console.log('%s %s - %s', this.method, this.url, ms); // 显示执行时间
})

app.on('error', function(err, ctx){
  "use strict"
  console.log('server error', err)
});
app.listen(3001, ()=>{
  "use strict"
  console.log('koa is listening in 3001')
})
module.exports = app;
