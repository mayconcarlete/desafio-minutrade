import { ILoadProductsByNameAdapter } from '@data/products/protocols/load-all-products-by-name'
import { IGetAllNames } from '@domain/products/usecases/get-all-names'

export class GetAllNames implements IGetAllNames {
  private readonly loadNameProductsAdapter: ILoadProductsByNameAdapter

  constructor (loadNameProductsAdapter: ILoadProductsByNameAdapter) {
    this.loadNameProductsAdapter = loadNameProductsAdapter
  }

  async getAllNames (): Promise<string[] | []> {
    const products = await this.loadNameProductsAdapter.loadNames()
    return new Promise(resolve => resolve(products.sort()))
  }
}
