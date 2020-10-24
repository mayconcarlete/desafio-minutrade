import { CreateProduct } from '@data/products/usecases/create-product/create-product'
import { FakeProductsDb } from '@infra/fake-db/products/products'
import { CreateProductController } from '@presentation/controllers/products/create-product/create-product'
import { makeCreateProductValidator } from './make-create-product-validators'

export const makeCreateProduct = (): CreateProductController => {
  const validator = makeCreateProductValidator()
  const fakeDBAdapter = FakeProductsDb.instance
  const createProductData = new CreateProduct(fakeDBAdapter, fakeDBAdapter)

  return new CreateProductController(validator, createProductData)
}
