import { TProduct } from '../models/products'

export interface IGetAllProducts{
  get: () => Promise<TProduct[]|[]>
}
