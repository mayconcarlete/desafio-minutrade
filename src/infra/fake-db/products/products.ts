import { ILoadProductsByNameAdapter } from '@data/products/protocols/load-all-products-by-name'
import { TProduct } from '@domain/products/models/products'
import { ICreateProductAdapter } from 'src/data/products/protocols/create-product'
import { ILoadProductByNameAdapter } from 'src/data/products/protocols/load-product-by-name'

export class FakeProductsDb implements
  ILoadProductByNameAdapter,
  ICreateProductAdapter,
  ILoadProductsByNameAdapter {
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
}
