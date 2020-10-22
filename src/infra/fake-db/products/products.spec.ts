import { FakeProductsDb } from './products'

type SutTypes = {
  sut: FakeProductsDb
}
const makeSut = (): SutTypes => {
  const sut = new FakeProductsDb()
  return { sut }
}
describe('FakeProductsDb', () => {
  test('Should return a product if name exists in DB', async () => {
    const { sut } = makeSut()
    const result = await sut.loadByName('CACHORRO')
    expect(result).toEqual({ name: 'CACHORRO', price: 100 })
  })
})
