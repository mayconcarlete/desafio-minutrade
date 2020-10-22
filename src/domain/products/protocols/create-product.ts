import { TProduct, TProductParams } from '../model/products'

export interface ICreateProduct {
  createProduct: (data: TProductParams) => Promise<TProduct | undefined>
}
