const DB = require('../config/db')
const elasticService = require('../service/elastic')
const productSchema = '../schema/product.js'
const pgDB = DB.pgDB
const productTable = pgDB.import(productSchema)

const list = async function (param) {
  const input = param.query ? param.query : ''
  const page = param.page ? param.page : 1
  const result = await elasticService.searchProduct(input, page)
  return result
}

const create = async function (data) {
  await productTable.create({
    name: data.name,
    price: data.price,
    description: data.description
  })
  return true
}

const update = async function (id, data) {
  const result = await productTable.update({
    name: data.name,
    price: data.price,
    description: data.description
  }, {
    where: {
      id: id
    }
  })
  elasticService.updateProduct(id, data.name, data.price, data.description)
  return result[0] === 1
}

const remove = async function (id) {
  const result = await productTable.destroy({
    where: {
      id
    }
  })
  return result === 1
}

module.exports = {
  list,
  create,
  remove,
  update
}
