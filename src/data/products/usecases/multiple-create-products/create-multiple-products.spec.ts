import { ICreateMultipleProductsAdapter } from '@data/products/protocols/create-multiple-products'
import { TProduct } from '@domain/products/models/products'
import { CreateMultipleProducts } from './create-multiple-products'

const data: TProduct[] = [
  { name: ' any_name', price: 1 },
  { name: 'any_name ', price: 1 }
]

const response = [
  { name: 'ANY_NAME', price: 1 },
  { name: 'CACHORRO', price: 100 },
  { name: 'GATO', price: 50 },
  { name: 'GALINHA', price: 25 }
]

class MockFakeAdapter implements ICreateMultipleProductsAdapter {
  async addMultiples (): Promise<TProduct[]|[]> {
    return new Promise(resolve => resolve(response))
  }
}

type SutTypes = {
  sut: CreateMultipleProducts
  createMultiplesAdapter: MockFakeAdapter
}

const makeSut = (): SutTypes => {
  const createMultiplesAdapter = new MockFakeAdapter()
  const sut = new CreateMultipleProducts(createMultiplesAdapter)
  return { sut, createMultiplesAdapter }
}

describe('CreateMultipleProducts', () => {
  test('Should remove initial and final spaces of names', async () => {
    const { sut } = makeSut()
    const result = await sut.createMultiples(data)
    expect(result[0].name).toEqual('ANY_NAME')
  })
  test('Should pass all names to uppercase', async () => {
    const { sut } = makeSut()
    const result = await sut.createMultiples(data)
    expect(result[0].name).toEqual('ANY_NAME')
    expect(result[0].name).toEqual('ANY_NAME')
  })
  test('Should remove duplicated products from array before send to DB', async () => {
    const { sut } = makeSut()
    const result = await sut.createMultiples(data)
    expect(result[0].name).toEqual('ANY_NAME')
  })
  test('Should call addMultiples with correct params', async () => {
    const { sut, createMultiplesAdapter } = makeSut()
    const createMultiplesAdapterSpy = jest.spyOn(createMultiplesAdapter, 'addMultiples')
    await sut.createMultiples(data)
    expect(createMultiplesAdapterSpy).toHaveBeenCalledWith([{ name: 'ANY_NAME', price: 1 }])
  })
  test('Should throw if addMultiples throws', async () => {
    const { sut, createMultiplesAdapter } = makeSut()
    jest.spyOn(createMultiplesAdapter, 'addMultiples').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error()
      })
    })
    await expect(sut.createMultiples(data)).rejects.toThrow()
  })
  test('Should return an array of products in DB', async () => {
    const { sut } = makeSut()
    const result = await sut.createMultiples(data)
    expect(result).toEqual(response)
  })
})
