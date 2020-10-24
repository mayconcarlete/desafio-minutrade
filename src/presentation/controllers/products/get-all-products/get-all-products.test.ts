import supertest from 'supertest'
import app from '@main/config/app'
import { FakeProductsDb } from '@infra/fake-db/products/products'
const products = [{ name: 'CACHORRO', price: 100 }, { name: 'GATO', price: 50 }, { name: 'GALINHA', price: 25 }]
describe('GetAllProductsController', () => {
  beforeEach(() => {
    FakeProductsDb.instance.products = products
  })
  test('Should return 200 and a list of products', async () => {
    const result = await supertest(app).get('/api/v1/products')
    expect(result.status).toBe(200)
    expect(result.body).toEqual(products)
  })
})
