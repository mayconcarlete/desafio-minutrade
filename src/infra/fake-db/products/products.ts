import { ICreateMultipleProductsAdapter } from '@data/products/protocols/create-multiple-products'
import { IDeleteByNameAdapter } from '@data/products/protocols/delete-product-by-name'
import { ILoadProductsByNameAdapter } from '@data/products/protocols/load-all-products-by-name'
import { TProduct } from '@domain/products/models/products'
import { ICreateProductAdapter } from 'src/data/products/protocols/create-product'
import { ILoadProductByNameAdapter } from 'src/data/products/protocols/load-product-by-name'

export class FakeProductsDb implements
  ILoadProductByNameAdapter,
  ICreateProductAdapter,
  ILoadProductsByNameAdapter,
  IDeleteByNameAdapter,
  ICreateMultipleProductsAdapter {
  products: TProduct[]
  constructor () {
    this.products = [
      { name: 'CACHORRO', price: 100 },
      { name: 'GATO', price: 50 },
      { name: 'GALINHA', price: 25 }
    ]
  }

  async loadByName (name: string): Promise<TProduct | undefined> {
    const product = this.products.find((product, index) => product.name === name ? product : null)
    if (product) {
      return new Promise(resolve => resolve(product))
    }
    return new Promise(resolve => resolve(undefined))
  }

  async add (data: TProduct): Promise<TProduct | undefined> {
    this.products.push(data)
    return new Promise(resolve => resolve(data))
  }

  async loadNames (): Promise<string[] | []> {
    const arrayNames = this.products.map(product => product.name)
    return new Promise(resolve => resolve(arrayNames))
  }

  async deleteByName (name: string): Promise<TProduct | undefined> {
    const index = this.products.findIndex(product => product.name === name)
    if (index > -1) {
      const productDeleted = this.products[index]
      this.products.splice(index,1)
      return productDeleted
    }
    return undefined
  }

  async addMultiples (data: TProduct[]): Promise<TProduct[]|[]> {
    return new Promise(resolve => resolve(data))
  }
}
