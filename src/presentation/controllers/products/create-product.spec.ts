import { THttpRequest } from '@presentation/models'
import { IValidator } from '@presentation/protocols/validation-protocol'
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

type SutTypes = {
  sut: CreateProductController
  mockValidator: MockValidatorComposite
}

const makeSut = (): SutTypes => {
  const mockValidator = new MockValidatorComposite()
  const sut = new CreateProductController(mockValidator)
  return { sut, mockValidator }
}
describe('CreateProductController', () => {
  test('Should return an error if validation fails ', async () => {
    const { sut, mockValidator } = makeSut()
    jest.spyOn(mockValidator, 'validate').mockReturnValueOnce(new Error('Any validation error'))
    const result = await sut.handle(req)
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new Error('Any validation error'))
  })
})
