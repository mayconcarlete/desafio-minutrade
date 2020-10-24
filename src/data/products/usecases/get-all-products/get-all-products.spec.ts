import { ILoadAllProducts } from '@data/products/protocols/load-all-products'
import { TProduct } from '@domain/products/models/products'
import { GetAllProducts } from './get-all-products'

const products = [{ name: 'CACHORRO', price: 100 }, { name: 'GATO', price: 50 }, { name: 'GALINHA', price: 25 }]
class MockLoadProducts implements ILoadAllProducts {
  async loadAll (): Promise<TProduct[] | []> {
    return new Promise(resolve => resolve(products))
  }
}

type SutTypes = {
  sut: GetAllProducts
  loadAllProductsAdapter: ILoadAllProducts
}

const makeSut = (): SutTypes => {
  const loadAllProductsAdapter = new MockLoadProducts()
  const sut = new GetAllProducts(loadAllProductsAdapter)
  return { sut, loadAllProductsAdapter }
}
describe('GetAllProducts', () => {
  test('Should throw if loadAll throw', async () => {
    const { sut, loadAllProductsAdapter } = makeSut()
    jest.spyOn(loadAllProductsAdapter, 'loadAll').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error()
      })
    })
    await expect(sut.get()).rejects.toThrow()
  })
  test('Should return an array in ascending order', async () => {
    const { sut } = makeSut()
    const result = await sut.get()
    expect(result).toEqual(products)
  })
})
