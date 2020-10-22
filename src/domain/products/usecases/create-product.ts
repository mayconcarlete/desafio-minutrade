import { TProduct, TProductParams } from '../models/products'

export interface ICreateProduct {
  create: (data: TProductParams) => Promise<TProduct | undefined>
}
