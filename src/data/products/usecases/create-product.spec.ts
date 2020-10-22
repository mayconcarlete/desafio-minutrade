import { TProduct } from '@domain/products/models/products'
import { ILoadProductByNameAdapter } from '../protocols/load-product-by-name'
import { CreateProduct } from './create-product'

const data: TProduct = {
  name: 'any_name',
  price: 123
}

class MockLoadByName implements ILoadProductByNameAdapter {
  async load (name: string): Promise<TProduct | undefined> {
    return new Promise(resolve => resolve(undefined))
  }
}

type SutTypes = {
  sut: CreateProduct
  mockLoadProductByName: MockLoadByName
}

const makeSut = (): SutTypes => {
  const mockLoadProductByName = new MockLoadByName()
  const sut = new CreateProduct(mockLoadProductByName)
  return { sut, mockLoadProductByName }
}

describe('CreateProduct', () => {
  test('Should call load with correct params', async () => {
    const { sut, mockLoadProductByName } = makeSut()
    const mockLoadProductByNameSpy = jest.spyOn(mockLoadProductByName, 'load')
    await sut.create(data)
    expect(mockLoadProductByNameSpy).toHaveBeenCalledWith('any_name')
  })
})
