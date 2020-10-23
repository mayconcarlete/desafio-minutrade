import { TProduct } from '@domain/products/models/products'
import { CreateMultipleProducts } from './create-multiple-products'

const data: TProduct[] = [
  { name: ' any_name', price: 1 },
  { name: 'any_name ', price: 1 }
]

type SutTypes = {
  sut: CreateMultipleProducts
}

const makeSut = (): SutTypes => {
  const sut = new CreateMultipleProducts()
  return { sut }
}

describe('CreateMultipleProducts', () => {
  test('Should remove initial and final spaces of names', async () => {
    const { sut } = makeSut()
    const result = await sut.createMultiples(data)
    expect(result[0].name = 'any_name')
    expect(result[1].name = 'any_name')
  })
})
