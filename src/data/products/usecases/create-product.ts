import { TProductParams,TProduct } from '@domain/products/models/products'
import { ICreateProduct } from '@domain/products/usecases/create-product'
import { ILoadProductByNameAdapter } from '../protocols/load-product-by-name'

export class CreateProduct implements ICreateProduct {
  private readonly loadProductByName: ILoadProductByNameAdapter
  constructor (loadProductByName: ILoadProductByNameAdapter) {
    this.loadProductByName = loadProductByName
  }

  async create (data: TProductParams): Promise<TProduct | undefined> {
    const loadProduct = await this.loadProductByName.load(data.name)
    return new Promise(resolve => resolve(loadProduct))
  }
}
