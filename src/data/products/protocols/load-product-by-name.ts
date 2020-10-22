import { TProduct } from '@domain/products/models/products'

export interface ILoadProductByNameAdapter{
  loadByName: (name: string) => Promise<TProduct|undefined>
}
