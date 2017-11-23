const DB = require('../config/db')

const pgDB = DB.pgDB

const getTest = function () {
  return pgDB.query('select * from products', {raw: true})
}

module.exports = {
  getTest
}
