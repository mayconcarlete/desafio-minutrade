import supertest from 'supertest'
import app from '@main/config/app'

describe('DELETE - products/:name - DeleteByNameController', () => {
  test('Should return 400 if invalid name are provided', async () => {
    const result = await supertest(app).delete('/api/v1/products/a')
    expect(result.status).toBe(400)
  })
})
