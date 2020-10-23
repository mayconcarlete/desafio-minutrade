import { ICreateMultipleProductsAdapter } from '@data/products/protocols/create-multiple-products'
import { TProduct } from '@domain/products/models/products'
import { ICreateMultipleProducts } from '@domain/products/usecases/create-multiple-products'

export class CreateMultipleProducts implements ICreateMultipleProducts {
  private readonly createMultiplesAdapter: ICreateMultipleProductsAdapter

  constructor (createMultiplesAdapter: ICreateMultipleProductsAdapter) {
    this.createMultiplesAdapter = createMultiplesAdapter
  }

  async createMultiples (productsList: TProduct[]): Promise<TProduct[]|[]> {
    const removeSpaces = productsList.map(product => ({ name: product.name.trim(), price: product.price }))
    const passAllNamesToUpper = removeSpaces.map(product => ({ name: product.name.toUpperCase(), price: product.price }))

    const removedEqualElements: TProduct[] = []
    const arrayOfEqualsNames: string[] = []
    for (const product of passAllNamesToUpper) {
      if (!arrayOfEqualsNames.includes(product.name)) {
        arrayOfEqualsNames.push(product.name)
        removedEqualElements.push(product)
      }
    }
    const productsCreated = await this.createMultiplesAdapter.addMultiples(removedEqualElements)
    return new Promise(resolve => resolve(productsCreated))
  }
}
