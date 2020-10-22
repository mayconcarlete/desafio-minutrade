import { THttpRequest } from '@presentation/models'
import { MinValue } from './min-value'

const req: THttpRequest = {
  body: {
    price: 10
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
})
