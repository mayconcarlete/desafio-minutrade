import { ILoadAllProducts } from '@data/products/protocols/load-all-products'
import { TProduct } from '@domain/products/models/products'
import { IGetAllProducts } from '@domain/products/usecases/get-all-products'

export class GetAllProducts implements IGetAllProducts {
  private readonly loadAllProducts: ILoadAllProducts
  constructor (loadAllProducts: ILoadAllProducts) {
    this.loadAllProducts = loadAllProducts
  }

  async get (): Promise<TProduct[] | []> {
    const loadProducts = await this.loadAllProducts.loadAll()
    return new Promise(resolve => resolve(loadProducts))
  }
}
