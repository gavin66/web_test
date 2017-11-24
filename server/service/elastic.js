const elasticsearch = require('elasticsearch')

const elasticClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info'
})

const elasticService = {}
const index = 'products'
const type = 'product'

elasticService.addProduct = (id, name, price, description) => {
  return elasticClient.index({
    index,
    type,
    body: {
      id,
      name,
      price,
      description
    }
  })
}

elasticService.updateProduct = (id, name, price, description) => {
  return elasticClient.update({
    index: index,
    type: type,
    id: id,
    body: {
      name: name,
      price: price,
      description: description
    }
  }, function (error, response) {
    console.log(response)
  })
}

elasticService.searchProduct = (input, page) => {
  let data = {}
  if (input) {
    data = elasticClient.search({
      index: index,
      type: type,
      body: {
        query: {
          bool: {
            should: [
              {
                match: {
                  name: {
                    query: input,
                    boost: 2
                  }
                }
              },
              {
                match: {
                  description: {
                    query: input,
                    boost: 1
                  }
                }
              }
            ]
          }
        },
        from: 10 * (page - 1),
        size: 10
      }
    })
  } else {
    data = elasticClient.search()
  }
  return data
}

module.exports = elasticService
