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
  const sut = FakeProductsDb.instance
  return { sut }
}
describe('FakeProductsDb', () => {
  beforeEach(() => {
    FakeProductsDb.instance.products = []
  })
  test('Should return undefined if product doenst exists in DB', async () => {
    const { sut } = makeSut()
    const result = await sut.loadByName('DOESNT_EXIST')
    expect(result).toBe(undefined)
  })
  test('Should return a product if name exists in DB', async () => {
    const { sut } = makeSut()
    await FakeProductsDb.instance.add({ name: 'CACHORRO', price: 100 })
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
    await FakeProductsDb.instance.addMultiples([{ name: 'CACHORRO', price: 100 }, { name: 'GATO', price: 50 }, { name: 'GALINHA', price: 25 }])
    const result = await sut.loadNames()
    expect(result).toEqual(['CACHORRO', 'GATO', 'GALINHA'])
  })
  test('Should return undefined when product was not found', async () => {
    const { sut } = makeSut()
    const result = await sut.deleteByName('not_found_name')
    expect(result).toBeFalsy()
  })
  test('Should return a product when deleteByName success', async () => {
    const { sut } = makeSut()
    await FakeProductsDb.instance.add({ name: 'GALINHA', price: 25 })
    const result = await sut.deleteByName('GALINHA')
    expect(result).toEqual({ name: 'GALINHA', price: 25 })
  })
  test('Should return an array of single produts without duplicates', async () => {
    const { sut } = makeSut()
    await FakeProductsDb.instance.addMultiples([{ name: 'CACHORRO', price: 100 }, { name: 'GATO', price: 50 }, { name: 'GALINHA', price: 25 }])
    const data = [{ name: 'CACHORRO', price: 100 }, { name: 'ANY_NAME', price: 50 }, { name: 'GALINHA', price: 25 }, { name: 'PAPAGAIO', price: 25 }]
    const response = [{ name: 'CACHORRO', price: 100 }, { name: 'GATO', price: 50 }, { name: 'GALINHA', price: 25 },{ name: 'ANY_NAME', price: 50 }, { name: 'PAPAGAIO', price: 25 }]
    const result = await sut.addMultiples(data)
    expect(result).toEqual(response)
  })
  test('Should return an array of products when loadAll are called', async () => {
    const { sut } = makeSut()
    await FakeProductsDb.instance.addMultiples([{ name: 'CACHORRO', price: 100 }, { name: 'GATO', price: 50 }, { name: 'GALINHA', price: 25 }])
    const result = await sut.loadAll()
    expect(result).toEqual([{ name: 'CACHORRO', price: 100 }, { name: 'GATO', price: 50 }, { name: 'GALINHA', price: 25 }])
  })
})
