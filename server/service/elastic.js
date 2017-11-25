const elasticsearch = require('elasticsearch')

const elasticClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info'
  // log: {
  //   type: 'file',
  //   level: 'trace',
  //   path: '/tmp/elasticsearch.log'
  // }
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
      doc: {
        name: name,
        price: price,
        description: description
      }
    }
  }, function (error, response) {
    // Todo 这里更新触发器不起作用
    // console.log(response)
  })
}

elasticService.searchProduct = (input, page, perPage) => {
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
        from: perPage * (page - 1),
        size: perPage
      }
    })
  } else {
    data = elasticClient.search({
      index: index,
      type: type,
      body: {
        from: perPage * (page - 1),
        size: perPage
      }
    })
  }
  return data
}

module.exports = elasticService
