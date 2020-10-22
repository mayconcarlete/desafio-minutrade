import { makeGetAllNames } from '@main/factory/products/products-names-by-order/make-get-all-names'
import { Router } from 'express'
import { adapterRoute } from '../adapter/route-adapter'
import { makeCreateProduct } from '../factory/products/create-product/make-create-product'

export default (app: Router): void => {
  app.post('/api/v1/products', adapterRoute(makeCreateProduct()))
  app.get('/api/v1/productsnames', adapterRoute(makeGetAllNames()))
}
