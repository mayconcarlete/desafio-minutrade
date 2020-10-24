import { TProduct } from '../models/products'

export interface IUpdateProduct{
  update: (product: TProduct) => Promise<TProduct| undefined>
}
