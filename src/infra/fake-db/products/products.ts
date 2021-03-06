import { ICreateMultipleProductsAdapter } from '@data/products/protocols/create-multiple-products'
import { IDeleteByNameAdapter } from '@data/products/protocols/delete-product-by-name'
import { ILoadAllProducts } from '@data/products/protocols/load-all-products'
import { ILoadProductsByNameAdapter } from '@data/products/protocols/load-all-products-by-name'
import { IUpdateAdapter } from '@data/products/protocols/load-product'
import { TProduct } from '@domain/products/models/products'
import { ICreateProductAdapter } from 'src/data/products/protocols/create-product'
import { ILoadProductByNameAdapter } from 'src/data/products/protocols/load-product-by-name'

export class FakeProductsDb implements
  ILoadProductByNameAdapter,
  ICreateProductAdapter,
  ILoadProductsByNameAdapter,
  IDeleteByNameAdapter,
  ICreateMultipleProductsAdapter,
  ILoadAllProducts,
  IUpdateAdapter {
  private static _instance: FakeProductsDb
  products: TProduct[] = []

  private constructor () { }

  static get instance (): FakeProductsDb {
    if (!FakeProductsDb._instance) {
      FakeProductsDb._instance = new FakeProductsDb()
    }
    return FakeProductsDb._instance
  }

  async loadByName (name: string): Promise<TProduct | undefined> {
    const product = this.products.find((product) => product.name === name ? product : null)
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
    let duplicated = false
    for (const product of data) {
      duplicated = false
      for (const productDB of this.products) {
        if (product.name === productDB.name) {
          duplicated = true
        }
      }
      if (!duplicated) {
        this.products.push(product)
      }
    }
    return new Promise(resolve => resolve(this.products))
  }

  async loadAll (): Promise<TProduct[]|[]> {
    return new Promise(resolve => resolve(this.products))
  }

  async updateProduct (product: TProduct): Promise<TProduct| undefined> {
    const index = this.products.findIndex(productArr => productArr.name === product.name)
    if (index > -1) {
      this.products[index].price = product.price
      return new Promise(resolve => resolve(this.products[index]))
    }
    return new Promise(resolve => resolve(undefined))
  }
}
