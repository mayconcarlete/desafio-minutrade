import { TProduct } from '@domain/products/models/products'

export interface IDeleteByNameAdapter{
  deleteByName: (name: string) => Promise<TProduct | undefined>
}
