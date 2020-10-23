import supertest from 'supertest'
import app from '@main/config/app'
import { TProduct } from '@domain/products/models/products'
import { InvalidParamError } from '@presentation/errors/invalid-param-error'
const body: TProduct[] = [{ name: 'CAMELO',price: 66 },{ name: 'GIRAFA',price: 66 },{ name: 'ELEFANTE',price: 66 }]
const errorBody: any[] = []
describe('POST - multiple-products - CreateMultipleProductsController', () => {
  test('Should return 400 when validation fails', async () => {
    const result = await supertest(app).post('/api/v1/multiple-products').send(errorBody)
    expect(result.status).toBe(400)
    expect(result.body).toEqual(new InvalidParamError('Invalid array size').message)
  })
  test('Should return 201 on success', async () => {
    const result = await supertest(app).post('/api/v1/multiple-products').send(body)
    expect(result.status).toBe(201)
  })
})
