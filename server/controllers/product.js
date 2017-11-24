const productModel = require('../models/product')

const list = async function (ctx) {
  ctx.body = await productModel.list(ctx.request.query)
}

const create = async function (ctx) {
  const resp = await productModel.create(ctx.request.body)
  ctx.body = {
    resp
  }
}

const update = async function (ctx) {
  ctx.body = await productModel.update(ctx.params.id, ctx.request.body)
}

const remove = async function (ctx) {
  ctx.body = await productModel.remove(ctx.params.id)
}

module.exports = {
  'GET /product': list,
  'POST /product': create,
  'PUT /product/:id': update,
  'DELETE /product/:id': remove
}
