import { CreateProductController } from '@presentation/controllers/products/create-product'
import { CreateProduct } from 'src/data/products/usecases/create-product'
import { FakeProductsDb } from 'src/infra/fake-db/products/products'
import { makeCreateProductValidator } from './make-create-product-validators'

export const makeCreateProduct = (): CreateProductController => {
  const validator = makeCreateProductValidator()
  const fakeDBAdapter = new FakeProductsDb()
  const createProductData = new CreateProduct(fakeDBAdapter, fakeDBAdapter)

  return new CreateProductController(validator, createProductData)
}
