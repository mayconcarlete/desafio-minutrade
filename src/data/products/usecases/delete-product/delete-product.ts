import { IDeleteByNameAdapter } from '@data/products/protocols/delete-product-by-name'
import { TProduct } from '@domain/products/models/products'
import { IDeleteProduct } from '@domain/products/usecases/delete-product'

export class DeleteProduct implements IDeleteProduct {
  private readonly deleteByNameAdapter: IDeleteByNameAdapter

  constructor (deleteByNameAdapter: IDeleteByNameAdapter) {
    this.deleteByNameAdapter = deleteByNameAdapter
  }

  async deleteProduct (name: string): Promise<TProduct| undefined> {
    const nameUpper = name.toUpperCase()
    const result = this.deleteByNameAdapter.deleteByName(nameUpper)
    return new Promise(resolve => resolve(result))
  }
}
