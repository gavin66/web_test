const elasticService = require('../service/elastic')

const getSuggestions = async function (ctx) {
  ctx.body = await elasticService.searchProduct(ctx.params.name)
}
const createProduct = async function (ctx) {
  ctx.body = await elasticService.addProduct(ctx.request.body.id, ctx.request.body.name, ctx.request.body.price, ctx.request.body.description)
}

module.exports = {
  'GET /product/:name': getSuggestions,
  'POST /': createProduct
}
