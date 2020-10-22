import { ILoadProductsByNameAdapter } from '@data/products/protocols/load-all-products-by-name'
import { GetAllNames } from './get-all-names'

const products = ['ZEBRA','GATO','GALINHA', 'CACHORRO']

class MockLoadProducts implements ILoadProductsByNameAdapter {
  async loadNames (): Promise<string[] | []> {
    return new Promise(resolve => resolve(products))
  }
}

type SutTypes = {
  sut: GetAllNames
  loadNameProductsAdapter: ILoadProductsByNameAdapter
}

const makeSut = (): SutTypes => {
  const loadNameProductsAdapter = new MockLoadProducts()
  const sut = new GetAllNames(loadNameProductsAdapter)
  return { sut, loadNameProductsAdapter }
}
describe('GetAllNames', () => {
  test('Should throw if loadNames throw', async () => {
    const { sut, loadNameProductsAdapter } = makeSut()
    jest.spyOn(loadNameProductsAdapter, 'loadNames').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error()
      })
    })
    await expect(sut.getAllNames()).rejects.toThrow()
  })
  test('Should return an array in ascending order', async () => {
    const { sut } = makeSut()
    const result = await sut.getAllNames()
    expect(result).toEqual(['CACHORRO', 'GALINHA', 'GATO', 'ZEBRA'])
  })
})
