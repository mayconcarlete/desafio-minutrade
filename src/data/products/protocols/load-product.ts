import { TProduct } from '@domain/products/models/products'

export interface IUpdateAdapter{
  updateProduct: (product: TProduct) => Promise<TProduct| undefined>
}
