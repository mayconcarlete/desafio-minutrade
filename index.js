const request = require('request')
const urlProductStock = 'https://mt-node-stock-api.glitch.me/products'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const productsDB = [
  { name: 'cachorro', price: 100 },
  { name: 'gato', price: 50 },
  { name: 'galinha', price: 25 }
]

const buildProduct = (body) => {
  return {
    name: body.name,
    price: Number.parseInt(body.price, 10)
  }
}

app.get('/products', function (req, res) {
  res.status(200).send(productsDB)
})

app.get('/productsNames', function (req, res) {
  res.status(200).send(productsDB)
})

app.get('/products/:name', function (req, res) {
  let product
  productsDB.forEach(element => {
    if (element.name === req.params.name) {
      product = element
    }
  })
  if (product) {
    res.status(200).send(product)
  } else {
    res.sendStatus(500)
  }
})

app.post('/products', function (req, res) {
  const newProduct = buildProduct(req.body)

  const product = productsDB.find(item => (item.name === newProduct.name))
  if (product) {
    return res.sendStatus(500)
  }
  if (newProduct.name.length <= 5) {
    return res.sendStatus(500)
  }
  if (isNaN(newProduct.price)) {
    return res.sendStatus(500)
  }
  if (newProduct.price <= 0) {
    return res.sendStatus(500)
  }

  const data = {
    name: req.body.name
  }
  request({
    url: urlProductStock,
    headers: {
      'Content-Type': 'application/json'
    },
    body: data,
    method: 'POST',
    json: true
  }, (err, response, body) => {
    if (err) {
      return res.sendStatus(500)
    }
    productsDB.push(newProduct)
    res.status(201).send(newProduct)
  })
})

app.put('/products/:name', function (req, res) {
  const product = productsDB.find(item => (item.name === req.params.name))
  if (!product) {
    return res.sendStatus(500)
  }
  const newPrice = Number.parseInt(req.body.price, 10)
  if (isNaN(newPrice)) {
    return res.sendStatus(500)
  }
  if (newPrice <= 0) {
    return res.sendStatus(500)
  }
  product.price = newPrice

  res.status(200).send(product)
})

app.delete('/products/:name', function (req, res) {
  res.sendStatus(200)
})

var server = app.listen(3000, function () {
  console.log('Listening on port %s', server.address().port)
})

module.exports = {
  buildProduct,
  server
}
