import { TProduct } from '@domain/products/models/products'
import { ICreateMultipleProducts } from '@domain/products/usecases/create-multiple-products'
import { InvalidParamError } from '@presentation/errors/invalid-param-error'
import { THttpRequest } from '@presentation/models'
import { IValidator } from '@presentation/protocols'
import { CreateMultipleProductsController } from './create-multiple-products'

class MockValidator implements IValidator {
  validate (input: any): Error | undefined {
    return undefined
  }
}

const req: THttpRequest = {
  body: [{ name: 'any_name', price: 88 }]
}
const response: TProduct[] = [{ name: 'CAMELO',price: 66 },{ name: 'GIRAFA',price: 66 },{ name: 'ELEFANTE',price: 66 }]

class MockCreateMultipleProducts implements ICreateMultipleProducts {
  async createMultiples (data: TProduct[]): Promise<TProduct[] | []> {
    return new Promise(resolve => resolve(response))
  }
}
type SutTypes = {
  validator: IValidator
  createMultipleProducts: ICreateMultipleProducts
  sut: CreateMultipleProductsController
}

const makeSut = (): SutTypes => {
  const validator = new MockValidator()
  const createMultipleProducts = new MockCreateMultipleProducts()
  const sut = new CreateMultipleProductsController(validator, createMultipleProducts)
  return { sut, validator,createMultipleProducts }
}
describe('CreateMultipleProductsController', () => {
  test('Should return 400 if validation fails', async () => {
    const { sut, validator } = makeSut()
    jest.spyOn(validator, 'validate').mockReturnValueOnce(new InvalidParamError('Validator Fails'))
    const result = await sut.handle(req)
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new InvalidParamError('Validator Fails').message)
  })
  test('Should call createMultipleProducts with correct params', async () => {
    const { sut, createMultipleProducts } = makeSut()
    const createMultiplesSpy = jest.spyOn(createMultipleProducts, 'createMultiples')
    await sut.handle(req)
    expect(createMultiplesSpy).toHaveBeenCalledWith(req.body)
  })
  test('Should throw if createMultipleProducts throw', async () => {
    const { sut, createMultipleProducts } = makeSut()
    jest.spyOn(createMultipleProducts, 'createMultiples').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error()
      })
    })
    const result = await sut.handle(req)
    expect(result.statusCode).toBe(500)
  })

  test('Should return an array of product on success', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(req)
    expect(result.statusCode).toBe(201)
    expect(result.body).toEqual(response)
  })
})
