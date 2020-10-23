import { InvalidParamError } from '@presentation/errors/invalid-param-error'
import { ArraySize } from './array-size'
const req = [1,2,3,4]
type SutTypes = {
  sut: ArraySize
}
const makeSut = (): SutTypes => {
  const min = 0
  const max = 5
  const sut = new ArraySize(min, max)
  return { sut }
}
describe('ArraySize', () => {
  test('Should call Array Size with correct params', () => {
    const { sut } = makeSut()
    const validateSpy = jest.spyOn(sut, 'validate')
    sut.validate(req)
    expect(validateSpy).toHaveBeenCalledWith(req)
  })
  test('Should return an Invalid Param Error if validation fails', () => {
    const { sut } = makeSut()
    const reqError = [1,2,3,4,5,6]
    const result = sut.validate(reqError)
    expect(result).toEqual(new InvalidParamError('Invalid array size'))
  })
})
