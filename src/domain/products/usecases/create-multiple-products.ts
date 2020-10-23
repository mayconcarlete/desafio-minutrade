import { TProduct } from '../models/products'

export interface ICreateMultipleProducts{
  createMultiples: (productsList: TProduct[]) => Promise<TProduct[]|[]>
}
