import supertest from 'supertest'
import app from '@main/config/app'
import { FakeProductsDb } from '@infra/fake-db/products/products'
describe('PUT - products/name - UpdateProductController', () => {
  test('Should return 400 if invalid name are provided', async () => {
    const result = await supertest(app).put('/api/v1/products/ame').send({ price: 60 })
    expect(result.status).toBe(400)
  })
  test('Should return 400 if invalid price are provided', async () => {
    const result = await supertest(app).put('/api/v1/products/cachorro').send({ price: '60' })
    expect(result.status).toBe(400)
  })
  test('Should return 400 if price are smaller than minimum required', async () => {
    const result = await supertest(app).put('/api/v1/products/cachorro').send({ price: 0 })
    expect(result.status).toBe(400)
  })
  test('Should return 404 db cant find product', async () => {
    const result = await supertest(app).put('/api/v1/products/cachorro').send({ price: 3000 })
    expect(result.status).toBe(404)
  })
  test('Should return a product updated o success', async () => {
    await FakeProductsDb.instance.add({ name: 'CACHORRO', price: 100 })
    const result = await supertest(app).put('/api/v1/products/cachorro').send({ price: 3000 })
    expect(result.status).toBe(200)
    expect(result.body).toEqual({ name: 'CACHORRO', price: 3000 })
  })
})
