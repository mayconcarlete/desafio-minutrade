import { IGetAllNames } from '@domain/products/usecases/get-all-names'
import { GetAllNamesController } from './get-all-names-by-order'

const response = ['CACHORRO', 'GALINHA', 'GATO', 'ZEBRA']

class MockGetAllNames implements IGetAllNames {
  async getAllNames (): Promise<string[]| []> {
    return new Promise(resolve => resolve(response))
  }
}

type SutTypes = {
  sut: GetAllNamesController
  getArrayNames: IGetAllNames
}
const makeSut = (): SutTypes => {
  const getArrayNames = new MockGetAllNames()
  const sut = new GetAllNamesController(getArrayNames)
  return { sut, getArrayNames }
}
describe('GetAllNamesController', () => {
  test('Should return 500 if getArrayNames throws', async () => {
    const { sut, getArrayNames } = makeSut()
    jest.spyOn(getArrayNames, 'getAllNames').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error()
      })
    })
    const result = await sut.handle({})
    expect(result.statusCode).toBe(500)
  })
  test('Should return 200 and an ascending order array in success', async () => {
    const { sut } = makeSut()
    const result = await sut.handle({})
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual(['CACHORRO', 'GALINHA', 'GATO', 'ZEBRA'])
  })
})
