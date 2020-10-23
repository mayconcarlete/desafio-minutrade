import { TProduct } from '@domain/products/models/products'
import { ICreateMultipleProducts } from '@domain/products/usecases/create-multiple-products'

export class CreateMultipleProducts implements ICreateMultipleProducts {
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
    return new Promise(resolve => resolve(removedEqualElements))
  }
}
