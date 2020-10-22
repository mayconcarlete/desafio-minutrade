import supertest from 'supertest'
import app from '@main/config/app'

describe('POST - Create a product', () => {
  test('Should return 400 if no name is provided', async () => {
    const result = await supertest(app).post('/api/v1/products').send({ price: 1 })
    expect(result.body).toEqual('Missing param: name')
  })
  test('Should return 400 if no price is provided', async () => {
    const result = await supertest(app).post('/api/v1/products').send({ name: 'valid_name' })
    expect(result.body).toEqual('Missing param: price')
  })
  test('Should return 400 if length of name are smaller than min characters', async () => {
    const result = await supertest(app).post('/api/v1/products').send({ name: 'ga', price: 10 })
    expect(result.body).toEqual('Invalid Length Size: name')
  })
  test('Should return 400 if length of name are bigger than max characters', async () => {
    const result = await supertest(app).post('/api/v1/products').send({ name: 'test_valid_bigger_size_length', price: 10 })
    expect(result.body).toEqual('Invalid Length Size: name')
  })
  test('Should return 400 if price is not a number', async () => {
    const result = await supertest(app).post('/api/v1/products').send({ name: 'valid_name', price: 'invalid' })
    expect(result.body).toEqual('price field is not a number')
  })
  test('Should return 400 if price is smaller than minimum', async () => {
    const result = await supertest(app).post('/api/v1/products').send({ name: 'valid_name', price: -1 })
    expect(result.body).toEqual('price field is shorter than minimum')
  })
  test('Should return 400 if product already exists in DB', async () => {
    const result = await supertest(app).post('/api/v1/products').send({ name: 'CACHORRO', price: 100 })
    expect(result.body).toEqual('Invalid param: Product already exists')
  })
  test('Should create a product', async () => {
    const result = await supertest(app).post('/api/v1/products').send({ name: 'valid_name', price: 10 })
    expect(result.body).toEqual({ name: 'VALID_NAME', price: 10 })
  })
})
