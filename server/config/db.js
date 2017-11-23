const Sequelize = require('sequelize')

const pgDB = new Sequelize('web_test', 'root', '123456', {
  host: 'localhost',
  port: 5432,
  logging: false,
  dialect: 'postgres',
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    idle: 30
  }
})

module.exports = {
  pgDB
}
