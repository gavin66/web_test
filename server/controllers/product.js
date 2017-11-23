const productModel = require('../models/product')

const homepage = async (ctx, next) => {
  ctx.body = 'we are at home!'
}

const getProduct = async function (ctx, next) {
  const result = await productModel.getTest()
  ctx.body = {
    success: true,
    result
  }
}

module.exports = {
  'GET /home': homepage,
  'GET /': getProduct
}
