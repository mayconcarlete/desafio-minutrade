import { IUpdateAdapter } from '@data/products/protocols/load-product'
import { TProduct } from '@domain/products/models/products'
import { IUpdateProduct } from '@domain/products/usecases/update-product'

export class UpdateProduct implements IUpdateProduct {
  private readonly updateProductAdapter: IUpdateAdapter
  constructor (updateProductAdapter: IUpdateAdapter) {
    this.updateProductAdapter = updateProductAdapter
  }

  async update (product: TProduct): Promise<TProduct| undefined> {
    if (typeof (product.price) !== 'number') return undefined
    product.name = product.name.trim().toUpperCase()
    const updatedProduct = await this.updateProductAdapter.updateProduct(product)
    if (updatedProduct) {
      return new Promise(resolve => resolve(updatedProduct))
    } else return new Promise(resolve => resolve(undefined))
  }
}
