import supertest from 'supertest'
import app from '@main/config/app'

describe('POST - Create a product', () => {
  test('Should return 400 if no name is provided', async () => {
    const result = await supertest(app).post('/api/v1/products').send({ price: 1 })
    expect(result.body).toEqual('Missing param: name')
  })
  test('Should return 400 if no price is provided', async () => {
    const result = await supertest(app).post('/api/v1/products').send({ name: 'gato' })
    expect(result.body).toEqual('Missing param: price')
  })
})
