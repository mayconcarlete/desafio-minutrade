import { TProduct } from '@domain/products/models/products'

export interface ILoadAllProducts{
  loadAll: () => Promise<TProduct[]|[]>
}
