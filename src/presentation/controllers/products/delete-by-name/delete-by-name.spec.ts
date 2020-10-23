import { TProduct } from '@domain/products/models/products'
import { IDeleteProduct } from '@domain/products/usecases/delete-product'
import { THttpRequest } from '@presentation/models'
import { IValidator } from '@presentation/protocols'
import { DeleteByNameController } from './delete-by-name'

class MockValidator implements IValidator {
  validate (input: any): Error | undefined {
    return undefined
  }
}
class MockDeleteByName implements IDeleteProduct {
  async deleteProduct (name: string): Promise<TProduct | undefined> {
    return new Promise(resolve => resolve({ name: 'DELETED_PRODUCT',price: 99 }))
  }
}
type SutTypes = {
  mockValidator: MockValidator
  mockDeleteByName: MockDeleteByName
  sut: DeleteByNameController
}

const makeSut = (): SutTypes => {
  const mockValidator = new MockValidator()
  const mockDeleteByName = new MockDeleteByName()
  const sut = new DeleteByNameController(mockValidator, mockDeleteByName)
  return { sut, mockValidator, mockDeleteByName }
}

describe('DeleteByNameController', () => {
  test('Should return 400 if validation fails', async () => {
    const { sut, mockValidator } = makeSut()
    jest.spyOn(mockValidator, 'validate').mockReturnValueOnce(new Error('Some Validation Fails'))
    const req: THttpRequest = {
      body: {
        name: 'invalid_name'
      }
    }
    const result = await sut.handle(req)
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual('Some Validation Fails')
  })
  test('Should return 404 if product was not found', async () => {
    const { sut, mockDeleteByName } = makeSut()
    jest.spyOn(mockDeleteByName, 'deleteProduct').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))
    const req: THttpRequest = {
      body: {
        name: 'not_found_product'
      }
    }
    const result = await sut.handle(req)
    expect(result.statusCode).toBe(404)
    expect(result.body).toEqual('Product was not found')
  })
})
