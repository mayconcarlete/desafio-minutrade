import { THttpRequest } from '@presentation/models'
import { MinValueError } from './errors/min-value-error'
import { MinValue } from './min-value'

const req: THttpRequest = {
  body: {
    price: 10
  }
}
const errorReq: THttpRequest = {
  body: {
    price: -1
  }
}

type SutTypes = {
  sut: MinValue
}

const makeSut = (): SutTypes => {
  const fieldName = 'price'
  const minValue = 0
  const sut = new MinValue(fieldName, minValue)
  return { sut }
}
describe('MinValue', () => {
  test('Should call validate with correct params', () => {
    const { sut } = makeSut()
    const validateSpy = jest.spyOn(sut, 'validate')
    sut.validate(req.body)
    expect(validateSpy).toHaveBeenCalledWith({ price: 10 })
  })
  test('Should return an MinValueError if value is smaller than minimun', () => {
    const { sut } = makeSut()
    const result = sut.validate(errorReq.body)
    expect(result).toEqual(new MinValueError('price'))
  })
  test('Should return undefined if validation succeeds', () => {
    const { sut } = makeSut()
    const result = sut.validate(req.body)
    expect(result).toBeFalsy()
  })
})
