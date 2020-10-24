import { TProduct } from '@domain/products/models/products'
import { IUpdateProduct } from '@domain/products/usecases/update-product'
import { THttpRequest } from '@presentation/models'
import { IValidator } from '@presentation/protocols'
import { UpdateProductController } from './update-product'

class MockValidator implements IValidator {
  validate (input: any): Error | undefined {
    return undefined
  }
}
const updatedProduct: TProduct = {
  name: 'UPDATED_PRODUCT',
  price: 50
}
class MockUpdateProduct implements IUpdateProduct {
  async update (product: TProduct): Promise<TProduct | undefined> {
    return new Promise(resolve => resolve(updatedProduct))
  }
}
type SutTypes = {
  validator: IValidator
  updateProduct: IUpdateProduct
  sut: UpdateProductController
}
const makeSut = (): SutTypes => {
  const validator = new MockValidator()
  const updateProduct = new MockUpdateProduct()
  const sut = new UpdateProductController(validator, updateProduct)
  return { sut, validator, updateProduct }
}
describe('UpdateProductController', () => {
  test('Should call validator with correct params', async () => {
    const { sut, validator } = makeSut()
    const validatorSpy = jest.spyOn(validator, 'validate')
    const req: THttpRequest = {
      body: {
        name: 'ANY_NAME',
        price: 1000
      }
    }
    await sut.handle(req)
    expect(validatorSpy).toHaveBeenCalledWith({ name: 'ANY_NAME', price: 1000 })
  })
  test('Should return an Error if validator fails', async () => {
    const { sut, validator } = makeSut()
    jest.spyOn(validator, 'validate').mockReturnValueOnce(new Error('validator'))
    const req: THttpRequest = {
      body: {
        name: 'ANY_NAME',
        price: 1000
      }
    }
    const result = await sut.handle(req)
    expect(result.body).toEqual(new Error('validator').message)
  })
  test('Should call updateProduct with correct params', async () => {
    const { sut,updateProduct } = makeSut()
    const updatedProductSpy = jest.spyOn(updateProduct, 'update')
    const req: THttpRequest = {
      body: {
        name: 'ANY_NAME',
        price: 1000
      }
    }
    await sut.handle(req)
    expect(updatedProductSpy).toHaveBeenCalledWith({ name: 'ANY_NAME', price: 1000 })
  })
  test('Should return undefined if update product cant update product', async () => {
    const { sut,updateProduct } = makeSut()
    jest.spyOn(updateProduct, 'update').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))
    const req: THttpRequest = {
      body: {
        name: 'ANY_NAME',
        price: 1000
      }
    }
    const result = await sut.handle(req)
    expect(result.body).toEqual(new Error('Its not possible update product').message)
  })
  test('Should return an updated product on success', async () => {
    const { sut } = makeSut()
    const req: THttpRequest = {
      body: {
        name: 'ANY_NAME',
        price: 1000
      }
    }
    const result = await sut.handle(req)
    expect(result.body).toEqual(updatedProduct)
  })
})
