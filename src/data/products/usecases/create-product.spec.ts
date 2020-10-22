import { TProduct } from '@domain/products/models/products'
import { ICreateProductAdapter } from '../protocols/create-product'
import { ILoadProductByNameAdapter } from '../protocols/load-product-by-name'
import { CreateProduct } from './create-product'

const data: TProduct = {
  name: 'any_name',
  price: 123
}
const dataResponse: TProduct = {
  name: 'valid_product',
  price: 123
}
class MockAddProduct implements ICreateProductAdapter {
  async add (data: TProduct): Promise<TProduct | undefined> {
    return new Promise(resolve => resolve(dataResponse))
  }
}
class MockLoadByName implements ILoadProductByNameAdapter {
  async load (name: string): Promise<TProduct | undefined> {
    return new Promise(resolve => resolve(undefined))
  }
}

type SutTypes = {
  sut: CreateProduct
  mockLoadProductByName: MockLoadByName
  mockAddProductAdapter: MockAddProduct
}

const makeSut = (): SutTypes => {
  const mockAddProductAdapter = new MockAddProduct()
  const mockLoadProductByName = new MockLoadByName()
  const sut = new CreateProduct(mockLoadProductByName, mockAddProductAdapter)
  return { sut, mockLoadProductByName, mockAddProductAdapter }
}

describe('CreateProduct', () => {
  test('Should call load with correct params', async () => {
    const { sut, mockLoadProductByName } = makeSut()
    const mockLoadProductByNameSpy = jest.spyOn(mockLoadProductByName, 'load')
    await sut.create(data)
    expect(mockLoadProductByNameSpy).toHaveBeenCalledWith('any_name')
  })
  test('Should throw if load throws', async () => {
    const { sut, mockLoadProductByName } = makeSut()
    jest.spyOn(mockLoadProductByName, 'load').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error('load product throws')
      })
    })
    await expect(sut.create(data)).rejects.toThrow()
  })
  test('Should return undefined if they exists in DB', async () => {
    const { sut, mockLoadProductByName } = makeSut()
    jest.spyOn(mockLoadProductByName, 'load').mockReturnValueOnce(new Promise(resolve => resolve(dataResponse)))
    const result = await sut.create(data)
    expect(result).toBe(undefined)
  })
  test('Should call add with correct params', async () => {
    const { sut, mockAddProductAdapter } = makeSut()
    const mockAddSpy = jest.spyOn(mockAddProductAdapter, 'add')
    await sut.create(data)
    expect(mockAddSpy).toHaveBeenCalledWith(data)
  })
  // test('Should throw if add throws', async () => {
  //   const { sut, mockAddProductAdapter } = makeSut()
  //   jest.spyOn(mockAddProductAdapter, 'add').mock
  // })
  // test('should return a new product if they dont exists in DB', async () => {
  //   const { sut } = makeSut()
  //   const result = await sut.create(data)
  //   expect(result).toEqual({ name: 'valid_product', price: 123 })
  // })
})
