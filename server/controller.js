const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const router = new Router()

// 解析规则 {'GET /': homepage}
function addRule (router, rule) {
  for (let key in rule) {
    // key = 'GET /' rule = {'GET /': homepage}
    if (key.startsWith('GET ')) {
      let path = key.substring(4)
      router.get(path, rule[key])
      console.log(`register URL mapping: GET ${path}`)
    } else if (key.startsWith('POST ')) {
      let path = key.substring(5)
      router.post(path, rule[key])
      console.log(`register URL mapping: POST ${path}`)
    } else {
      console.log(`invalid URL: ${key}`)
    }
  }
}

// 自动导入controller文件夹下所有的路由规则
function addRules (router) {
  // 得到 /controller 所有以js结尾的文件
  let files = fs.readdirSync(path.join(__dirname, 'controllers'))
  let jsFiles = files.filter((f) => {
    return f.endsWith('.js')
  })
  // 添加规则
  for (let f of jsFiles) {
    console.log(`process controller: ${f}...`)
    let rule = require(path.join(__dirname, 'controllers', f))
    addRule(router, rule)
  }
}

module.exports = function () {
  addRules(router)
  return router.routes()
}
