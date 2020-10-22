import { TProduct, TProductParams } from '../model/products'

export interface ICreateProduct {
  create: (data: TProductParams) => Promise<TProduct | undefined>
}
