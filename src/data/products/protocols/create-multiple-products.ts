import { TProduct } from '@domain/products/models/products'

export interface ICreateMultipleProductsAdapter{
  addMultiples: (data: TProduct[]) => Promise<TProduct[]|[]>
}
