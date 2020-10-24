import { TProduct } from '@domain/products/models/products'
import { IGetAllProducts } from '@domain/products/usecases/get-all-products'
import { FakeProductsDb } from '@infra/fake-db/products/products'
import { GetAllProductsController } from './get-all-products'
const products = [{ name: 'CACHORRO', price: 100 }, { name: 'GATO', price: 50 }, { name: 'GALINHA', price: 25 }]
class MockGetAllProducts implements IGetAllProducts {
  async get (): Promise<TProduct[] | []> {
    return new Promise(resolve => resolve(products))
  }
}

type SutTypes = {
  sut: GetAllProductsController
  getAllProducts: IGetAllProducts
}
const makeSut = (): SutTypes => {
  const getAllProducts = new MockGetAllProducts()
  const sut = new GetAllProductsController(getAllProducts)
  return { sut, getAllProducts }
}
describe('GetAllProductsController', () => {
  beforeEach(() => {
    FakeProductsDb.instance.products = []
  })
  test('Should return 500 if getAllProducts throw', async () => {
    const { sut, getAllProducts } = makeSut()
    jest.spyOn(getAllProducts, 'get').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error()
      })
    })
    const result = await sut.handle({})
    expect(result.statusCode).toBe(500)
  })
  test('Should return 200 and an array with products', async () => {
    const { sut } = makeSut()
    await FakeProductsDb.instance.addMultiples(products)
    const result = await sut.handle({})
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual(products)
  })
})
