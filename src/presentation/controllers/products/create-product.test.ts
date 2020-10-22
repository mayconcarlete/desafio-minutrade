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
  test('Should return 400 if price is not a number', async () => {
    const result = await supertest(app).post('/api/v1/products').send({ name: 'gato', price: 'invalid' })
    expect(result.body).toEqual('price field is not a number')
  })
})
