import { TProductParams,TProduct } from '@domain/products/models/products'
import { ICreateProduct } from '@domain/products/usecases/create-product'
import { ICreateProductAdapter } from '../protocols/create-product'
import { ILoadProductByNameAdapter } from '../protocols/load-product-by-name'

export class CreateProduct implements ICreateProduct {
  private readonly loadProductByName: ILoadProductByNameAdapter
  private readonly createProduct: ICreateProductAdapter

  constructor (loadProductByName: ILoadProductByNameAdapter, createProduct: ICreateProductAdapter) {
    this.loadProductByName = loadProductByName
    this.createProduct = createProduct
  }

  async create (data: TProductParams): Promise<TProduct | undefined> {
    const loadProduct = await this.loadProductByName.load(data.name)
    if (!loadProduct) {
      const newProduct = await this.createProduct.add(data)
      if (newProduct) {
        return newProduct
      }
    }
    return undefined
  }
}
