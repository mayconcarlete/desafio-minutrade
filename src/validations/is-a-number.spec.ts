import { THttpRequest } from '@presentation/models'
import { IsANumberError } from './errors/is-a-number-error'
import { IsANumber } from './is-a-number'

const req: THttpRequest = {
  body: {
    name: 'any_name',
    price: 10
  }
}
const errorReq: THttpRequest = {
  body: {
    name: 'any_name',
    price: '10'
  }
}

type SutTypes = {
  sut: IsANumber
}

const makeSut = (): SutTypes => {
  const fieldName = 'price'
  const sut = new IsANumber(fieldName)
  return { sut }
}
describe('IsANumber', () => {
  test('Should call validate with correct params', () => {
    const { sut } = makeSut()
    const validateSpy = jest.spyOn(sut, 'validate')
    sut.validate(req.body)
    expect(validateSpy).toHaveBeenCalledWith({ name: 'any_name', price: 10 })
  })
  test('Should return an error if field is not a number', () => {
    const { sut } = makeSut()
    const result = sut.validate(errorReq.body)
    expect(result).toEqual(new IsANumberError('price'))
  })
  test('Should return undefined if validation succeeds',() => {
    const { sut } = makeSut()
    const result = sut.validate(req.body)
    expect(result).toBeFalsy()
  })
})
