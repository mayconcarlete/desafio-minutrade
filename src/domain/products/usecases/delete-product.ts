import { TProduct } from '../models/products'

export interface IDeleteProduct{
  deleteProduct: (name: string) => Promise<TProduct| undefined>
}
