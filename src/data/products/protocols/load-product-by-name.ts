import { TProduct } from '@domain/products/models/products'

export interface ILoadProductByNameAdapter{
  load: (name: string) => Promise<TProduct|undefined>
}
