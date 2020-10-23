import { IDeleteByNameAdapter } from '@data/products/protocols/delete-product-by-name'
import { TProduct } from '@domain/products/models/products'
import { DeleteProduct } from './delete-product'

class MockDeleteAdapter implements IDeleteByNameAdapter {
  products: TProduct[]
  constructor () {
    this.products = [
      { name: 'CACHORRO', price: 100 },
      { name: 'GATO', price: 50 },
      { name: 'GALINHA', price: 25 }
    ]
  }

  async deleteByName (name: string): Promise<TProduct | undefined> {
    const index = this.products.findIndex(product => product.name === name)
    if (index > -1) {
      const productDeleted = this.products[index]
      this.products.splice(index,1)
      return productDeleted
    }
    return undefined
  }
}

type SutTypes = {
  deleteByNameAdapter: MockDeleteAdapter
  sut: DeleteProduct
}

const makeSut = (): SutTypes => {
  const deleteByNameAdapter = new MockDeleteAdapter()
  const sut = new DeleteProduct(deleteByNameAdapter)
  return { sut, deleteByNameAdapter }
}

describe('DeleteProduct', () => {
  test('Should call deleteByName with correct params', async () => {
    const { sut, deleteByNameAdapter } = makeSut()
    const deleteByNameSpy = jest.spyOn(deleteByNameAdapter, 'deleteByName')
    await sut.deleteProduct('any_name')
    expect(deleteByNameSpy).toHaveBeenCalledWith('ANY_NAME')
  })
})
