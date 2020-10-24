import { IUpdateAdapter } from '@data/products/protocols/load-product'
import { TProduct } from '@domain/products/models/products'
import { UpdateProduct } from './update-product'

const updatedProduct: TProduct = { name: 'UPDATED_PRODUCT',price: 88 }
class MockUpdateAdapter implements IUpdateAdapter {
  async updateProduct (product: TProduct): Promise<TProduct | undefined> {
    return new Promise(resolve => resolve(updatedProduct))
  }
}
type SutTypes = {
  updateProductAdapter: MockUpdateAdapter
  sut: UpdateProduct
}
const makeSut = (): SutTypes => {
  const updateProductAdapter = new MockUpdateAdapter()
  const sut = new UpdateProduct(updateProductAdapter)
  return { sut, updateProductAdapter }
}

describe('UpdateProduct', () => {
  test('Should call updateProduct with correct params', async () => {
    const { sut, updateProductAdapter } = makeSut()
    const updateProductSpy = jest.spyOn(updateProductAdapter, 'updateProduct')
    const data: TProduct = { name: 'ANY_NAME', price: 100 }
    await sut.update(data)
    expect(updateProductSpy).toHaveBeenCalledWith(data)
  })
  test('Should throw if updateProduct throw', async () => {
    const { sut, updateProductAdapter } = makeSut()
    jest.spyOn(updateProductAdapter, 'updateProduct').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error()
      })
    })
    const data: TProduct = { name: 'ANY_NAME', price: 100 }
    await expect(sut.update(data)).rejects.toThrow()
  })
  test('Should return undefined if update fails', async () => {
    const { sut, updateProductAdapter } = makeSut()
    jest.spyOn(updateProductAdapter, 'updateProduct').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))
    const data: TProduct = { name: 'INVALID_NAME', price: 100 }
    const result = await sut.update(data)
    expect(result).toBeFalsy()
  })
  test('Should return an updated account', async () => {
    const { sut } = makeSut()
    const data: TProduct = { name: 'VALID_NAME', price: 100 }
    const result = await sut.update(data)
    expect(result).toEqual(updatedProduct)
  })
})
