import { makeCreateMultipleProducts } from '@main/factory/products/create-multiples-products/make-create-multiples'
import { makeDeleteProduct } from '@main/factory/products/delete-product/make-delete-product'
import { makeGetAllProducts } from '@main/factory/products/get-all-products/get-all-products'
import { makeGetAllNames } from '@main/factory/products/products-names-by-order/make-get-all-names'
import { Router } from 'express'
import { adapterRoute } from '../adapter/route-adapter'
import { makeCreateProduct } from '../factory/products/create-product/make-create-product'

export default (app: Router): void => {
  app.post('/api/v1/products', adapterRoute(makeCreateProduct()))
  app.get('/api/v1/products', adapterRoute(makeGetAllProducts()))
  app.post('/api/v1/multiple-products', adapterRoute(makeCreateMultipleProducts()))
  app.get('/api/v1/productsnames', adapterRoute(makeGetAllNames()))
  app.delete('/api/v1/products/:name', adapterRoute(makeDeleteProduct()))
}
