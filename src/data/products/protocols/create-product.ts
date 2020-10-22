import { TProduct, TProductParams } from '@domain/products/models/products'

export interface ICreateProductAdapter{
  add: (data: TProductParams) => Promise<TProduct|undefined>
}
