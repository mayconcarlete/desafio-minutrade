import { THttpRequest } from '@presentation/models'
import { IValidator } from '@presentation/protocols/validation-protocol'
import { TProduct } from 'src/domain/products/model/products'
import { ICreateProduct } from 'src/domain/products/protocols/create-product'
import { CreateProductController } from './create-product'

const req: THttpRequest = {
  body: {
    name: 'any_name',
    price: 123
  }
}

class MockValidatorComposite implements IValidator {
  validate (input: any): Error | undefined {
    return undefined
  }
}
class MockCreateProduct implements ICreateProduct {
  async create (data: TProduct): Promise<TProduct | undefined> {
    return new Promise(resolve => resolve({ name: 'valid_product', price: 99.9 }))
  }
}

type SutTypes = {
  sut: CreateProductController
  mockValidator: MockValidatorComposite
  mockCreateProduct: MockCreateProduct
}

const makeSut = (): SutTypes => {
  const mockValidator = new MockValidatorComposite()
  const mockCreateProduct = new MockCreateProduct()
  const sut = new CreateProductController(mockValidator, mockCreateProduct)

  return { sut, mockValidator, mockCreateProduct }
}
describe('CreateProductController', () => {
  test('Should return an error if validation fails ', async () => {
    const { sut, mockValidator } = makeSut()
    jest.spyOn(mockValidator, 'validate').mockReturnValueOnce(new Error('Any validation error'))
    const result = await sut.handle(req)
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new Error('Any validation error'))
  })
  test('Should return 500 if createProduct throws', async () => {
    const { sut, mockCreateProduct } = makeSut()
    jest.spyOn(mockCreateProduct, 'create').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error('Create Product throws')
      })
    })
    const result = await sut.handle(req)
    expect(result.statusCode).toBe(500)
    expect(result.body).toEqual(new Error('Create Product throws'))
  })
  test('Should return 200 and a product if everything works well', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(req)
    expect(result.statusCode).toBe(201)
    expect(result.body).toEqual({ name: 'valid_product', price: 99.9 })
  })
})
