import supertest from 'supertest'
import app from '@main/config/app'
import { FakeProductsDb } from '@infra/fake-db/products/products'

describe('DELETE - products/:name - DeleteByNameController', () => {
  test('Should return 400 if invalid name are provided', async () => {
    const result = await supertest(app).delete('/api/v1/products/a')
    expect(result.status).toBe(400)
  })
  test('Should return 200 if delete product success', async () => {
    await FakeProductsDb.instance.add({ name: 'CACHORRO', price: 100 })
    const result = await supertest(app).delete('/api/v1/products/cachorro')
    expect(result.status).toBe(200)
    expect(result.body).toEqual({ name: 'CACHORRO', price: 100 })
  })
})
