import supertest from 'supertest'
import app from '@main/config/app'
import { FakeProductsDb } from '@infra/fake-db/products/products'
describe('GET - productsnames - GetAllNamesController', () => {
  test('Should return 200 and aa array sorted by ascending order', async () => {
    await FakeProductsDb.instance.addMultiples([{ name: 'CACHORRO', price: 100 }, { name: 'GATO', price: 50 }, { name: 'GALINHA', price: 25 }])
    const result = await supertest(app).get('/api/v1/productsnames')
    expect(result.status).toBe(200)
    expect(result.body).toEqual(['CACHORRO', 'GALINHA', 'GATO'])
  })
})
