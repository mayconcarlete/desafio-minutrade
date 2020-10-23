import { TProduct } from '@domain/products/models/products'
import { FakeProductsDb } from './products'

const validProduct: TProduct = {
  name: 'VALID_PRODUCT',
  price: 123
}
type SutTypes = {
  sut: FakeProductsDb
}
const makeSut = (): SutTypes => {
  const sut = new FakeProductsDb()
  return { sut }
}
describe('FakeProductsDb', () => {
  test('Should return undefined if product doenst exists in DB', async () => {
    const { sut } = makeSut()
    const result = await sut.loadByName('DOESNT_EXIST')
    expect(result).toBe(undefined)
  })
  test('Should return a product if name exists in DB', async () => {
    const { sut } = makeSut()
    const result = await sut.loadByName('CACHORRO')
    expect(result).toEqual({ name: 'CACHORRO', price: 100 })
  })
  test('Should add a product in DB', async () => {
    const { sut } = makeSut()
    const result = await sut.add(validProduct)
    expect(result).toEqual({ name: 'VALID_PRODUCT', price: 123 })
  })
  test('Should return an array of products names when loadNames are called', async () => {
    const { sut } = makeSut()
    const result = await sut.loadNames()
    expect(result).toEqual(['CACHORRO', 'GATO', 'GALINHA'])
  })
  test('Should return undefined when product was not found', async () => {
    const { sut } = makeSut()
    const result = await sut.deleteByName('not_found_name')
    expect(result).toBeFalsy()
  })
})
