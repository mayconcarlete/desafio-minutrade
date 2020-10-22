import supertest from 'supertest'
import app from '@main/config/app'

describe('GET - productsnames - GetAllNamesController', () => {
  test('Should return 200 and aa array sorted by ascending order', async () => {
    const result = await supertest(app).get('/api/v1/productsnames')
    expect(result.status).toBe(200)
    expect(result.body).toEqual(['CACHORRO', 'GALINHA', 'GATO'])
  })
})
